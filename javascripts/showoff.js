window.onload = function () {
    if (typeof WeixinJSBridge !== "undefined") {
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            WeixinJSBridge.invoke('sendAppMessage',{ 
                "appid"     : "",
                "img_url"   : "image/showoff.png",
                "img_width" : "80",
                "img_height": "80",
                "link"      : "showoff.html",
                "desc"      : "我与神经猫大战三天三夜, 用了一百万步围住了神经猫.",
                "title"     : "神经猫"
            }, function (res) {
            });
        });
    } else {
        //alert("only works in weixin");
    }
}
