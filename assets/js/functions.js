$(document).ready(function ($) {

    var $el = {};
    var cache = {};
    $el.win = $(window);
    $el.wrapper = $('.wrapper');
    $el.main = $('#main');
    cache.imgUrl = './assets/images/mybsd.png';
    var stats;


    $el.wrapper.on('touchmove', function (e) {
        e.preventDefault();
    });

    PIXI.utils._saidHello = true;
    var renderer = new PIXI.autoDetectRenderer(640, 960, {
        view: $el.main.get(0),
        transparent: true
    });

    var stage = new PIXI.Container();

    var animate = function animateFn() {
        requestAnimationFrame(animate);
        renderer.render(stage);
        stats.update();
    };

    var mybsd = new PIXI.Sprite.fromImage(cache.imgUrl);
    mybsd.position.set(640 / 2, 960 / 2);
    mybsd.anchor.set(0.5);

    var title = new PIXI.Text('单指移动, 双指缩放, 旋转!');
    title.x = 160;
    title.y = 30;

    stage.addChild(mybsd);
    stage.addChild(title);

    cache.rotation = 0;
    cache.scale = 1;
    cache.position = {
        x: mybsd.position.x,
        y: mybsd.position.y
    };

    var mc = new Hammer.Manager($el.main.get(0));
    var rotate = new Hammer.Rotate();
    var pan = new Hammer.Pan();

    rotate.recognizeWith(pan);

    mc.add([rotate, pan]);

    mc.on('rotatemove', function (e) {
        var rotation = (e.rotation * (Math.PI / 180));
        var scale = (cache.scale * e.scale).toFixed(2);
        mybsd.rotation = cache.rotation + rotation;
        mybsd.scale.set(scale);
    });
    mc.on('rotateend', function (e) {
        cache.rotation = mybsd.rotation;
        cache.scale = mybsd.scale.x;
    });

    mc.on('panmove', function (e) {
        mybsd.position.x = cache.position.x + e.deltaX;
        mybsd.position.y = cache.position.y + e.deltaY;
    });
    mc.on('panend', function (e) {
        cache.position.x = mybsd.position.x;
        cache.position.y = mybsd.position.y;
    });

    stats = new Stats();
    var sds = stats.domElement.style;
    sds.position = 'absolute';
    sds.right = '0px';
    sds.top = '0px';
    sds.margin = '4em 3em';
    document.body.appendChild(stats.domElement);

    requestAnimationFrame(animate);

});