/*
 * Utils
 */
window.utils = {};

window.utils.variation = function (num, variation) {
	return Math.random() * ((num + variation) - (num - variation)) + (num - variation);
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

function Ball (x, y) {
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
	context.arc(0, 0, radius, 0, (Math.PI * 2), true);
	context.closePath();
	context.fill();

	context.restore();
}

Ball.prototype.update = function () {
	this.vx = utils.variation(this.x, this.variation);
	this.vy = utils.variation(this.y, this.variation);
	this.draw(Math.random() * this.radius);
}

function createBalls () {
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

function linkBalls () {
	context.beginPath();
	context.moveTo(balls[0].vx, balls[0].vy);
	context.lineTo(balls[1].vx, balls[1].vy);
	context.lineTo(balls[2].vx, balls[2].vy);
	context.lineTo(balls[0].vx, balls[0].vy);
	context.lineWidth = Math.random() * 0.5;
	context.strokeStyle = '#ffffff';
	context.stroke();
}

function blink () {
	context.save();

	context.translate(width / 2, (height / 2) - 20);
	context.rotate(utils.variation(Math.PI * 0.01, Math.PI * (- 0.01)));
	context.font = '1.5em sans-serif';
	context.textAlign = 'center';
	context.fillStyle = 'rgba(255, 255, 255, ' + Math.random() * 0.25 + ')';
	context.fillText('Loading...', utils.variation(0, 1), utils.variation(0, 1));

	context.restore();
}

function animate () {
	context.clearRect(0, 0, width, height);
	canvas.dispatchEvent(updateFrameEvent);
	window.requestAnimationFrame(animate);
}

function init () {
	createBalls();
	animate();
}

init();
