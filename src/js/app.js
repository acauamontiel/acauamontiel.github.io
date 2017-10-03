console.time('Initialize');
window.jQuery = Zepto;
import App from './app/index';
import Loader from './modules/loader';
import Constellation from './modules/constellation';

const app = new App();

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
			length: (window.innerWidth / 6),
			radius: (window.innerWidth / 10)
		});
	}

	$(window).on('load', function () {
		$('body').removeClass('loading');
		console.timeEnd('Initialize');
	});

});
