(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _index = require('./app/index');

var _index2 = _interopRequireDefault(_index);

var _loader = require('./modules/loader');

var _loader2 = _interopRequireDefault(_loader);

var _constellation = require('./modules/constellation');

var _constellation2 = _interopRequireDefault(_constellation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.time('Initialize');
window.jQuery = Zepto;


var app = new _index2.default();

app.init(function () {
	console.log('%cMantis Starter', 'color: #338656; font: 50px sans-serif;');
	console.table(this);

	$('.profile__title').lettering();
	$('.profile__tagline').lettering('words');

	if (window.devicePixelRatio === 1) {
		$('.personality__constellation').constellation({
			star: {
				width: 3
			},
			line: {
				color: 'rgba(255, 255, 255, .5)'
			},
			length: window.innerWidth / 6,
			radius: window.innerWidth / 10
		});
	}

	$(window).on('load', function () {
		$('body').removeClass('loading');
		console.timeEnd('Initialize');
	});
});

},{"./app/index":2,"./modules/constellation":3,"./modules/loader":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _init2 = require('../modules/init');

var _init3 = _interopRequireDefault(_init2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App() {
		_classCallCheck(this, App);

		this.id = Date.now();
	}

	_createClass(App, [{
		key: 'init',
		value: function init(callback) {
			_init3.default.call(this, callback);
		}
	}]);

	return App;
}();

exports.default = App;

},{"../modules/init":4}],3:[function(require,module,exports){
'use strict';

/*!
 * Mantis.js / jQuery / Zepto.js plugin for Constellation
 * @version 1.2.2
 * @author Acauã Montiel <contato@acauamontiel.com.br>
 * @license http://acaua.mit-license.org/
 */
(function ($, window) {
	var $window = $(window);
	/**
  * Makes a nice constellation on canvas
  * @constructor Constellation
  */
	function Constellation(canvas, options) {
		var $canvas = $(canvas),
		    context = canvas.getContext('2d'),
		    defaults = {
			star: {
				color: 'rgba(255, 255, 255, .5)',
				width: 1,
				randomWidth: true
			},
			line: {
				color: 'rgba(255, 255, 255, .5)',
				width: 0.2
			},
			position: {
				x: 0,
				y: 0
			},
			width: window.innerWidth,
			height: window.innerHeight,
			velocity: 0.1,
			length: 100,
			distance: 120,
			radius: 150,
			stars: []
		},
		    config = $.extend(true, {}, defaults, options);

		function Star() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;

			this.vx = config.velocity - Math.random() * 0.5;
			this.vy = config.velocity - Math.random() * 0.5;

			this.radius = config.star.randomWidth ? Math.random() * config.star.width : config.star.width;
		}

		Star.prototype = {
			create: function create() {
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
				context.fill();
			},

			animate: function animate() {
				var i;
				for (i = 0; i < config.length; i++) {

					var star = config.stars[i];

					if (star.y < 0 || star.y > canvas.height) {
						star.vx = star.vx;
						star.vy = -star.vy;
					} else if (star.x < 0 || star.x > canvas.width) {
						star.vx = -star.vx;
						star.vy = star.vy;
					}

					star.x += star.vx;
					star.y += star.vy;
				}
			},

			line: function line() {
				var length = config.length,
				    iStar,
				    jStar,
				    i,
				    j;

				for (i = 0; i < length; i++) {
					for (j = 0; j < length; j++) {
						iStar = config.stars[i];
						jStar = config.stars[j];

						if (iStar.x - jStar.x < config.distance && iStar.y - jStar.y < config.distance && iStar.x - jStar.x > -config.distance && iStar.y - jStar.y > -config.distance) {
							if (iStar.x - config.position.x < config.radius && iStar.y - config.position.y < config.radius && iStar.x - config.position.x > -config.radius && iStar.y - config.position.y > -config.radius) {
								context.beginPath();
								context.moveTo(iStar.x, iStar.y);
								context.lineTo(jStar.x, jStar.y);
								context.stroke();
								context.closePath();
							}
						}
					}
				}
			}
		};

		this.createStars = function () {
			var length = config.length,
			    star,
			    i;

			context.clearRect(0, 0, canvas.width, canvas.height);

			for (i = 0; i < length; i++) {
				config.stars.push(new Star());
				star = config.stars[i];

				star.create();
			}

			star.line();
			star.animate();
		};

		this.setCanvas = function () {
			canvas.width = config.width;
			canvas.height = config.height;
		};

		this.setContext = function () {
			context.fillStyle = config.star.color;
			context.strokeStyle = config.line.color;
			context.lineWidth = config.line.width;
		};

		this.setInitialPosition = function () {
			if (!options || !options.hasOwnProperty('position')) {
				config.position = {
					x: canvas.width * 0.5,
					y: canvas.height * 0.5
				};
			}
		};

		this.loop = function (callback) {
			callback();

			this.rAF = window.requestAnimationFrame(function () {
				this.loop(callback);
			}.bind(this));
		};

		this.handlers = {
			window: {
				mousemove: function mousemove(e) {
					config.position.x = e.pageX - $canvas.offset().left;
					config.position.y = e.pageY - $canvas.offset().top;
				},
				resize: function resize() {
					window.cancelAnimationFrame(this.rAF);
				}
			}
		};

		this.bind = function () {
			$window.on('mousemove', this.handlers.window.mousemove).on('resize', this.handlers.window.resize.bind(this));
		};

		this.unbind = function () {
			$window.off('mousemove', this.handlers.window.mousemove).off('resize', this.handlers.window.resize);
		};

		this.init = function () {
			this.setCanvas();
			this.setContext();
			this.setInitialPosition();
			this.loop(this.createStars);
			this.bind();
		};
	}

	function instantiate(element, options) {
		var c = new Constellation(element, options);
		c.init();
	}

	$.fn.constellation = function (options) {
		return this.each(function () {
			var _this = this;

			$window.on('resize', function () {
				instantiate(_this, options);
			});

			instantiate(this, options);
		});
	};
})($, window);

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (callback) {
	if (document.readyState === 'complete') {
		callback.bind(this);
		return;
	}

	document.addEventListener('DOMContentLoaded', callback.bind(this), false);
};

},{}],5:[function(require,module,exports){
'use strict';

/*
 * Utils
 */
window.utils = {};

window.utils.variation = function (num, variation) {
	return Math.random() * (num + variation - (num - variation)) + (num - variation);
};

/*
 * Loader
 * @author Acauã Montiel
 */
var canvas = document.querySelector('.loader__canvas'),
    context = canvas.getContext('2d'),
    width = canvas.width,
    height = canvas.height,
    updateFrameEvent = new Event('updateFrame'),
    balls = [];

function Ball(x, y) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.radius = 5;
	this.variation = 10;
	this.color = '#ffffff';
}

Ball.prototype.draw = function (radius) {
	context.save();

	context.translate(this.vx, this.vy);
	context.fillStyle = this.color;
	context.beginPath();
	context.arc(0, 0, radius, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();

	context.restore();
};

Ball.prototype.update = function () {
	this.vx = utils.variation(this.x, this.variation);
	this.vy = utils.variation(this.y, this.variation);
	this.draw(Math.random() * this.radius);
};

function createBalls() {
	balls.push(new Ball(25, 40));
	balls.push(new Ball(285, 50));
	balls.push(new Ball(150, 270));

	canvas.addEventListener('updateFrame', function () {
		for (var i = 0; i < balls.length; i++) {
			balls[i].update();
			linkBalls();
			blink();
		}
	}, false);
}

function linkBalls() {
	context.beginPath();
	context.moveTo(balls[0].vx, balls[0].vy);
	context.lineTo(balls[1].vx, balls[1].vy);
	context.lineTo(balls[2].vx, balls[2].vy);
	context.lineTo(balls[0].vx, balls[0].vy);
	context.lineWidth = Math.random() * 0.5;
	context.strokeStyle = '#ffffff';
	context.stroke();
}

function blink() {
	context.save();

	context.translate(width / 2, height / 2 - 20);
	context.rotate(utils.variation(Math.PI * 0.01, Math.PI * -0.01));
	context.font = '1.5em sans-serif';
	context.textAlign = 'center';
	context.fillStyle = 'rgba(255, 255, 255, ' + Math.random() * 0.25 + ')';
	context.fillText('Loading...', utils.variation(0, 1), utils.variation(0, 1));

	context.restore();
}

function animate() {
	context.clearRect(0, 0, width, height);
	canvas.dispatchEvent(updateFrameEvent);
	window.requestAnimationFrame(animate);
}

function init() {
	createBalls();
	animate();
}

init();

},{}]},{},[1])

//# sourceMappingURL=app.js.map
