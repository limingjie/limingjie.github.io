var c = 0;
var arr = [];
var cr = ["red", "orange", "yellow", "green", "blue", "purple"];
var b = false;
var time = 10;
var r = 0;
var msg, countEl;

if (window.addEventListener) {
    window.addEventListener("load", onload, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", onload);
} else {
    window.onload = onload;
}

function onload() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    msg = document.getElementById("msg");
    countEl = document.getElementById("count");
    document.getElementById("touch").style.height = (y - 100) + "px";
    arr = document.getElementsByClassName("block");
    colorize();
}

function colorize() {
    arr[r].onclick = null;
    arr[r].style["background-color"] = "white";
    r = random();
    arr[r].onclick = yes;
    arr[r].style["background-color"] = cr[r];
}

function random() {
    var n = Math.floor(Math.random() * 100 % 6);
    while (n === r) {
        n = Math.floor(Math.random() * 100 % 6);
    }
    return n;
}

function yes() {
    if (!b) {
        b = true;
        countdown(time, stop);
    }
    
    c++;
    countEl.innerHTML = c;
    colorize();
}

function stop() {
    arr[r].onclick = null;
    var i, l = arr.length;
    for (var i = 0; i < l; ++i) {
        arr[i].style["background-color"] = cr[i];
    }
    msg.innerHTML = "你的反应速度是" + (time / c).toPrecision(3) + "s";
}

function countdown(seconds, stop)
{
    var time = seconds * 1000,
        interval = 100, // ms
        s, ms;
        
    function update() {
        if (time < interval) {
            msg.innerHTML = "0.0s";
            if (typeof(stop) !== "undefined") stop();
        } else {
            s = Math.floor(time  / 1000);
            ms = time % 1000;
            msg.innerHTML = s + '.' + ms / 100 + 's';
            time -= interval;
            setTimeout(update, interval);
        }
    }
    
    update();
}
