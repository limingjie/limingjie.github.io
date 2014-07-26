var image = "http://limingjie.github.io/images/showoff.png";
var link  = "http://limingjie.github.io/showoff.html";
var desc  = "我与神经猫大战三天三夜, 终于用十万步围住了神经猫!";
var title = "我与神经猫大战三天三夜, 终于用十万步围住了神经猫!";

function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid"      : "",
        "img_url"    : image,
        "img_width"  : "80",
        "img_height" : "80",
        "link"       : link,
        "desc"       : desc,
        "title"      : title
    }, function (res) {
    });
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url"    : image,
        "img_width"  : "80",
        "img_height" : "80",
        "link"       : link,
        "desc"       : desc,
        "title"      : title
    }, function (res) {
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content" : desc,
        "url"     : link
    }, function (res) {
    });
}

// Weixin browser will invoke WeixinJSBridgeReady after initialized.
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // share with friend
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        shareFriend();
    });
    // share on moment
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        shareTimeline();
    });
    // share to weibo
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
        shareWeibo();
    });
}, false);

function getUrlParameters(parameter) {
    var url = window.location.search,
        arr = url.split("?")[1].split("&"),
        l = arr.length,
        i;

    for (i = 0; i < l; ++i) {
        param = arr[i].split("=");
        if (param[0] === parameter) {
            return decodeURIComponent(param[1]);
        }
    }

    return "";
}
