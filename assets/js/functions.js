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

var renderer = new PIXI.autoDetectRenderer(640, 960, {
    view: $el.main.get(0),
    transparent: true
});

var stage = new PIXI.Container();

var animate = function animateFn() {
    requestAnimationFrame(animate);
    if (cache.needRender) {
        renderer.render(stage);
        cache.needRender = false;
    }
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

cache.needRender = false;


var img = document.createElement('img');
img.onload = function () {
    cache.needRender = true;
};
img.src = cache.imgUrl;


cache.angle = null;
cache.scale = 1;
cache.position = {
    x: mybsd.position.x,
    y: mybsd.position.y
};
cache.isMove = false;
interact($el.main.get(0))
    .gesturable({
        onmove: function (event) {
            if (Math.abs(event.da) > 0.5) {
                cache.anglen = +(event.da / Math.PI).toFixed(2);
                mybsd.rotation += cache.anglen / 10;
                cache.needRender = true;
            }
            if (Math.abs(event.ds) > 0.01) {
                cache.scale += event.ds;
                mybsd.scale.set(1 + cache.scale);
                cache.needRender = true;
            }
        }
    })
    .draggable({
        onmove: function (event) {
            if (!cache.isMove) {
                if (Math.abs(event.dx) > 8 || Math.abs(event.dy) > 8) {
                    cache.isMove = true;
                }
            } else {
                cache.position.x += event.dx;
                cache.position.y += event.dy;
                mybsd.position.set(cache.position.x, cache.position.y);
                cache.needRender = true;
            }
        },
        onend: function (evnet) {
            cache.isMove = false;
        }
    });

stats = new Stats();
var sds = stats.domElement.style;
sds.position = 'absolute';
sds.right = '0px';
sds.top = '0px';
sds.margin = '4em 3em';
document.body.appendChild(stats.domElement);

requestAnimationFrame(animate);