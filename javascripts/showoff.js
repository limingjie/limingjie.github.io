document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    var data = {
        image : "http://limingjie.github.io/images/showoff.png",
        link  : "http://limingjie.github.io/showoff.html",
        desc  : "我与神经猫大战三天三夜, 终于用十万步围住了神经猫!",
        title : "我与神经猫苦战三天三夜, 终于用十万步围住了神经猫!"
    };
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "appid"      : "",
            "img_url"    : data.image,
            "img_width"  : "80",
            "img_height" : "80",
            "link"       : data.link,
            "desc"       : data.desc,
            "title"      : data.title
        }, function (res) {
        });
    });
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url"    : data.image,
            "img_width"  : "80",
            "img_height" : "80",
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
