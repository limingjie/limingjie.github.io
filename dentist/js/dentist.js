var $title, $image, $text;

var data = {
    image   : "http://limingjie.github.io/dentist/img/dentist.small.png",
    title   : "",
    desc    : "",
    link    : window.location.href
};

$(document).ready(function () {
    $.rdbHostConfig({
        userName : 'p0000001396',
        errback  : function (errcode, errmsg) {
            alert(errcode.toString() + ' ' + errmsg);
        }
    });
    
    var id = getUrlParameters("artid");
    if (id.length <= 0) id = 0;
    
    $title = $("#title");
    $image = $("#image");
    $text  = $("#text");

    $.postData({
        kw       : 'GetAdvice', // preauth
        args     : [ id ],
        callback : function (r) {
            var row = r.records.rows[0];
            
            $title.val(row.title);
            $image.attr("src", row.image);
            $text.val(row.text);
            
            data.title = row.title;
            data.desc = row.text;
        }
    });
});

document.addEventListener('WeixinJSBridgeReady', function () {
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "appid"      : "",
            "img_url"    : data.image,
            "img_width"  : "120",
            "img_height" : "120",
            "link"       : data.link,
            "desc"       : data.desc,
            "title"      : data.title
        }, function (res) {
        });
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url"    : data.image,
            "img_width"  : "120",
            "img_height" : "120",
            "link"       : data.link,
            "desc"       : data.desc,
            "title"      : data.title
        }, function (res) {
        });
    });
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
        WeixinJSBridge.invoke('shareWeibo', {
            "content" : data.desc,
            "url"     : data.link
        }, function (res) {
        });
    });
}, false);

function getUrlParameters(parameter) {
    var url = window.location.search, arr, param, l, i;

    if (url.length > 0) {
        arr = url.split("?")[1].split("&");
        for (i = 0, l = arr.length; i < l; ++i) {
            param = arr[i].split("=");
            if (param[0] === parameter) {
                return decodeURIComponent(param[1]);
            }
        }
    }

    return "";
}