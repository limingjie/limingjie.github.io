var data = {
    image   : "http://limingjie.github.io/images/weixin.png",
    title   : "微信显摆 Weixin Showoff",
    desc    : "微信显摆 Weixin Showoff",
    showoff : "微信显摆 Weixin Showoff",
    link    : window.location.href
};

function onload() {
    var value = getUrlParameters("image");
    if (value.length > 0) {
        data.image = value;
    }

    value = getUrlParameters("title");
    if (value.length > 0) {
        document.title = value;
        data.title = value;
        data.desc = value;
    }

    value = getUrlParameters("showoff");
    if (value.length > 0) {
        document.getElementById("showoff").innerHTML = value;
        data.showoff = value;
    }

    document.getElementById("next").onclick = function() {
        var pages = document.getElementsByClassName("page"),
            currentPage = document.getElementsByClassName("show")[0],
            nextPage,
            length = pages.length;

        for (var i = 0; i < length; i++) {
            if (currentPage === pages[i]) {
                nextPage = pages[(i + 1) % length];
                break;
            }
        }
        
        currentPage.style.display = "none";
        currentPage.className = "page";
        nextPage.style.display = "block";
        nextPage.className = "page show";
    }
}

if (window.addEventListener) {
    window.addEventListener("load", onload, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", onload);
} else {
    window.onload = onload;
}

document.addEventListener('WeixinJSBridgeReady', function () {
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
