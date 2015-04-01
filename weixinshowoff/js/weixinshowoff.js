var baseurl = "http://limingjie.github.io/weixinshowoff.html";

var data = {
    image   : "http://limingjie.github.io/images/weixin.png",
    title   : "微信臭显摆 WeChat Showoff",
    desc    : "微信臭显摆 WeChat Showoff",
    showoff : "微信臭显摆 WeChat Showoff",
    link    : window.location.href
};

var show, title, showoff, image, ptitle, pimage, gallery;

function onload() {
    show    = document.getElementById("show");
    title   = document.getElementById("title");
    showoff = document.getElementById("showoff");
    image   = document.getElementById("image");
    ptitle  = document.getElementById("ptext");
    pimage  = document.getElementById("picon");
    gallery = document.getElementById("gallery");

    var value = getUrlParameters("image");
    if (value.length > 0) {
        data.image = value;
    }
    image.value = data.image;
    pimage.src  = data.image;

    value = getUrlParameters("title");
    if (value.length > 0) {
        data.title = value;
        data.desc  = value;
    }
    title.value      = data.title;
    document.title   = data.title;
    ptitle.innerHTML = data.title;

    value = getUrlParameters("showoff");
    if (value.length > 0) {
        data.showoff = value;
    }
    showoff.value  = data.showoff;
    show.innerHTML = data.showoff;

    var nextButtons = document.getElementsByClassName("next");
    for (var i = 0; i < nextButtons.length; i++) {
        nextButtons[i].onclick = onNextClick;
    }
    
    buildGallery();

    var images = document.getElementsByClassName("image");
    for (var i = 0; i < images.length; i++) {
        images[i].onclick = onImageClick;
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

function updateData() {
    data.title     = title.value;
    data.desc      = title.value;
    data.showoff   = showoff.value;
    data.image     = image.value;
    data.link = baseurl +
        "?title=" + encodeURIComponent(data.title) +
        "&showoff=" + encodeURIComponent(data.showoff) +
        "&image=" + encodeURIComponent(data.image);

    document.title   = data.title;
    show.innerHTML   = data.showoff;
    ptitle.innerHTML = data.title;
    pimage.src       = data.image;
}

function onNextClick(event) {
    var pages       = document.getElementsByClassName("page"),
        currentPage = document.getElementsByClassName("show")[0],
        nextPage,
        length      = pages.length;

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

    updateData();
    
    return false;
}

function onImageClick(event) {
    var el = (event.target === "undefined") ? event.srcElement : event.target;
    image.value = el.src;
    
    updateData();
    
    return false;
}

function buildGallery() {
    addImage("http://limingjie.github.io/images/games/monster.jpg");
    addImage("http://limingjie.github.io/images/games/monster2.png");
    addImage("http://limingjie.github.io/images/finance/liberty.jpg");
    addImage("http://limingjie.github.io/images/finance/lincoln.jpg");
    addImage("http://limingjie.github.io/images/finance/stock.jpg");
    addImage("http://limingjie.github.io/images/presidents/mao.jpg");
    addImage("http://limingjie.github.io/images/presidents/obama.jpg");
    addImage("http://limingjie.github.io/images/presidents/putin.jpg");
    addImage("http://limingjie.github.io/images/brands/mcd.jpg");
    addImage("http://limingjie.github.io/images/brands/kfc.jpg");
    addImage("http://limingjie.github.io/images/brands/starbucks.jpg");
    addImage("http://limingjie.github.io/images/brands/audi.jpg");
    addImage("http://limingjie.github.io/images/brands/benz.jpg");
    addImage("http://limingjie.github.io/images/brands/vw.jpg");
    addImage("http://limingjie.github.io/images/ali/1.gif");
    addImage("http://limingjie.github.io/images/ali/2.gif");
    addImage("http://limingjie.github.io/images/ali/3.gif");
    addImage("http://limingjie.github.io/images/ali/4.gif");
    addImage("http://limingjie.github.io/images/ali/5.gif");
    addImage("http://limingjie.github.io/images/ali/6.gif");
}

function addImage(src) {
    gallery.innerHTML += '<div class="image"><a href="#"><img src="' +
        src + '"></img></a></div>';
}
