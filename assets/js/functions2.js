$(document).ready(function($){
var $el = {};
var pixiCache = {};
var dataCache = {};
var cache = {};
$el.win = $(window);
$el.wrapper = $('.wrapper');
$el.main = $('#main');
var stats;

dataCache.viewSize = {
    width: 640,
    height: 960
};

$el.wrapper.on('touchmove', function (e) {
    e.preventDefault();
});

pixiCache.renderer = new PIXI.autoDetectRenderer(
    dataCache.viewSize.width,
    dataCache.viewSize.height, {
        view: $el.main.get(0),
        transparent: true
    });

pixiCache.stage = new PIXI.Container();
pixiCache.page1 = new PIXI.Container();
pixiCache.page2 = new PIXI.Container();
pixiCache.page3 = new PIXI.Container();

pixiCache.graphics1 = new PIXI.Graphics();
pixiCache.graphics2 = new PIXI.Graphics();
pixiCache.graphics3 = new PIXI.Graphics();

pixiCache.graphics1.beginFill(0xFF0000);
pixiCache.graphics1.lineStyle(1, 0xFF0000);
pixiCache.graphics1.drawRect(0, 0, dataCache.viewSize.width, dataCache.viewSize.height);
pixiCache.graphics1.endFill();

pixiCache.title = new PIXI.Text('请左右滑动屏幕!');
pixiCache.title.x = 200;
pixiCache.title.y = 30;
pixiCache.page1.addChild(pixiCache.graphics1);
pixiCache.page1.addChild(pixiCache.title);

pixiCache.graphics2.beginFill(0x00FF00);
pixiCache.graphics2.lineStyle(1, 0x00FF00, 1);
pixiCache.graphics2.drawRect(0, 0, dataCache.viewSize.width, dataCache.viewSize.height);
pixiCache.graphics2.endFill();

pixiCache.page2.addChild(pixiCache.graphics2);

pixiCache.graphics3.beginFill(0x0000FF);
pixiCache.graphics3.lineStyle(1, 0x0000FF, 1);
pixiCache.graphics3.drawRect(0, 0, dataCache.viewSize.width, dataCache.viewSize.height);
pixiCache.graphics3.endFill();

pixiCache.page3.addChild(pixiCache.graphics3);

pixiCache.page2.position.x = -dataCache.viewSize.width;
pixiCache.page3.position.x = -dataCache.viewSize.width;
pixiCache.stage.addChild(pixiCache.page3);
pixiCache.stage.addChild(pixiCache.page2);
pixiCache.stage.addChild(pixiCache.page1);

var animate = function animateFn(time) {
    TWEEN.update();
    requestAnimationFrame(animate);
    pixiCache.renderer.render(pixiCache.stage);
    stats.update();
};

var zoomOutRight = function (page, runTime) {
    var animationTime = runTime;
    var run0 = {
        alpha: 1,
        scale: 1,
        positionX: 0
    };
    var run40 = {
        alpha: 1,
        scale: 0.475,
        positionX: -42
    };
    var run100 = {
        alpha: 0,
        scale: 0.1,
        positionX: 2000
    };
    var tween40, tween100;
    var update = function () {
        page.alpha = run0.alpha;
        page.scale.x = run0.scale;
        page.scale.y = run0.scale;
        page.position.x = (1 - run0.scale) * page.width + run0.positionX;
        page.position.y = (1 - run0.scale) * page.height;
    };
    cache.lock = true;
    tween40 = new TWEEN.Tween(run0)
        .to(run40, animationTime * 0.4)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween100 = new TWEEN.Tween(run0)
        .to(run100, animationTime * 0.6)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween40.chain(tween100);
    tween40.start();
};
var zoomOutLeft = function (page, runTime) {
    var animationTime = runTime;
    var run0 = {
        alpha: 1,
        scale: 1,
        positionX: 0
    };
    var run40 = {
        alpha: 1,
        scale: 0.475,
        positionX: 42
    };
    var run100 = {
        alpha: 0,
        scale: 0.1,
        positionX: -2000
    };
    var tween40, tween100;
    var update = function () {
        page.alpha = run0.alpha;
        page.scale.x = run0.scale;
        page.scale.y = run0.scale;
        page.position.x = (1 - run0.scale) * page.width + run0.positionX;
        page.position.y = (1 - run0.scale) * page.height;
    };
    cache.lock = true;
    tween40 = new TWEEN.Tween(run0)
        .to(run40, animationTime * 0.4)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween100 = new TWEEN.Tween(run0)
        .to(run100, animationTime * 0.6)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween40.chain(tween100);
    tween40.start();
};
var zoomInRight = function (page, runTime) {
    var animationTime = runTime;
    var run100 = {
        alpha: 1,
        scale: 1,
        positionX: 0
    };
    var run60 = {
        alpha: 1,
        scale: 0.475,
        positionX: -10
    };
    var run0 = {
        alpha: 0,
        scale: 0.1,
        positionX: 1000
    };
    var tween40, tween100;
    var update = function () {
        page.alpha = run0.alpha;
        page.scale.x = run0.scale;
        page.scale.y = run0.scale;
        page.position.x = (1 - run0.scale) * page.width + run0.positionX;
        page.position.y = (1 - run0.scale) * page.height;
    };
    cache.lock = true;
    tween40 = new TWEEN.Tween(run0)
        .to(run60, animationTime * 0.6)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween100 = new TWEEN.Tween(run0)
        .to(run100, animationTime * 0.4)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween40.chain(tween100);
    setTimeout(function(){
        tween40.start();
    }, 100);
};
var zoomInLeft = function (page, runTime) {
    var animationTime = runTime;
    var run100 = {
        alpha: 1,
        scale: 1,
        positionX: 0
    };
    var run60 = {
        alpha: 1,
        scale: 0.475,
        positionX: 10
    };
    var run0 = {
        alpha: 0,
        scale: 0.1,
        positionX: -1000
    };
    var tween60, tween100;
    var update = function () {
        page.alpha = run0.alpha;
        page.scale.x = run0.scale;
        page.scale.y = run0.scale;
        page.position.x = (1 - run0.scale) * page.width + run0.positionX;
        page.position.y = (1 - run0.scale) * page.height;
    };
    cache.lock = true;
    tween60 = new TWEEN.Tween(run0)
        .to(run60, animationTime * 0.6)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween100 = new TWEEN.Tween(run0)
        .to(run100, animationTime * 0.4)
        .easing(TWEEN.Easing.Quadratic.In)
        .onUpdate(update);
    tween60.chain(tween100);
    setTimeout(function(){
        tween60.start();
    }, 100);
};
cache.lock = false;
cache.pageMax = 3;
cache.nowPage = 1;
var nextPage = function () {
    var outPage, inPage;
    outPage = "page" + cache.nowPage;
    if (cache.nowPage === cache.pageMax) {
        cache.nowPage = 0;
    }
    inPage = "page" + (cache.nowPage + 1);
    pixiCache[inPage].position.x = -dataCache.viewSize.width;
    pixiCache.stage.addChild(pixiCache.page2);
    zoomOutRight(pixiCache[outPage], 1000);
    zoomInLeft(pixiCache[inPage], 1200);
    cache.nowPage += 1;
};
var prevPage = function () {
    var outPage, inPage;
    outPage = "page" + cache.nowPage;
    if (cache.nowPage === 1) {
        cache.nowPage = cache.pageMax + 1;
    }
    inPage = "page" + (cache.nowPage - 1);
    pixiCache[inPage].position.x = dataCache.viewSize.width;
    pixiCache.stage.addChild(pixiCache.page2);
    zoomOutLeft(pixiCache[outPage], 1000);
    zoomInRight(pixiCache[inPage], 1200);
    cache.nowPage -= 1;
};
interact($el.main.get(0))
    .draggable({
        onmove: function (event) {
            if (event.dx > 50 && !cache.lock) {
                nextPage();
                cache.lock = true;
            } else if (event.dx < -50 && !cache.lock) {
                prevPage();
                cache.lock = true;
            }
        },
        onend: function (evnet) {
            cache.lock = false;
        }
    });

    requestAnimationFrame(animate);
    stats = new Stats();
    var sds = stats.domElement.style;
    sds.position = 'absolute';
    sds.right = '0px';
    sds.top = '0px';
    sds.margin = '4em 3em';
    document.body.appendChild(stats.domElement);
});