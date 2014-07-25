var appid       = "";
var imgUrl      = "http://limingjie.github.io/images/showoff.png";
var lineLink    = "http://limingjie.github.io/showoff.html";
var descContent = "我与神经猫大战三天三夜, 终于用十万步围住了神经猫!";
var shareTitle  = "我与神经猫大战三天三夜, 终于用十万步围住了神经猫!";
 
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid"      : appid,
        "img_url"    : imgUrl,
        "img_width"  : "80",
        "img_height" : "80",
        "link"       : lineLink,
        "desc"       : descContent,
        "title"      : shareTitle
    }, function(res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url"    : imgUrl,
        "img_width"  : "80",
        "img_height" : "80",
        "link"       : lineLink,
        "desc"       : descContent,
        "title"      : shareTitle
    }, function(res) {
        //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content" : descContent,
        "url"     : lineLink,
    }, function(res) {
        //_report('weibo', res.err_msg);
    });
}

// Weixin browser will invoke WeixinJSBridgeReady after initialized.
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // share with friend
    WeixinJSBridge.on('menu:share:appmessage', function(argv){
        shareFriend();
    });
    // share on moment
    WeixinJSBridge.on('menu:share:timeline', function(argv){
        shareTimeline();
    });
    // share to weibo
    WeixinJSBridge.on('menu:share:weibo', function(argv){
        shareWeibo();
    });
}, false);
