$(function() {

	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				var $svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: "xml",
					success: function (data) {
						var $svg = $(data).find('svg');
		
						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}
		
						$svg = $svg.removeAttr('xmlns:a');
		
						if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
						}
		
						imgSvgArray[imgURL] = $svg[0].outerHTML;
		
						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main-mobile').on("DOMNodeInserted", function() {
		imgSvg();
	});

	var fragmentBody =
	'<header class="header-mobile js-header">' +
		'<a href="#">' +
			'<img src="img/grechka-logo.svg" class="header-mobile__logo">' +
		'</a>' +
		'<a href="tel:+7(978)8846766">' +
			'<img src="img/phone.svg" class="header-mobile__call">' +
		'</a>' +
	'</header>' +

	'<main class="main-mobile">' +

		'<section class="main-mobile__block main-mobile-block">' +
			'<div class="main-mobile-block__title">' +
				'<div class="main-mobile-block__wrap">' +
					'<h2 class="main-mobile-block__title-part main-mobile-block__title-part_first js-part-first">Разрабатываем</h2>' +
				'</div>' +
				'<div class="main-mobile-block__wrap">' +
					'<h2 class="main-mobile-block__title-part main-mobile-block__title-part_second js-part-second">digital-решения</h2>' +
				'</div>' +
				'<div class="main-mobile-block__wrap">' +
					'<h2 class="main-mobile-block__title-part main-mobile-block__title-part_third js-part-third">для бизнеса</h2>' +
				'</div>' +
			'</div>' +
			'<div class="main-mobile-block__subtitle">' +
				'<div class="main-mobile-block__wrap main-mobile-block__wrap_subtitle">' +
					'<h4 class="main-mobile-block__subtitle-part js-subtitle">Cоздаем сайты, программируем сложный функционал, продумываем дизайн, проектируем интерфейсы.</h4>' +
				'</div>' +
			'</div>' +
			'<div class="main-mobile-block__container-wrap">' +
				'<a href="https://drive.google.com/file/d/1FaNth5hlsdvzcHuLKj9c6amVe6n0EM9l/view" class="main-mobile-block__link js-presentation" target="_blank">' +
					'<span class="main-mobile-block__shadow"></span>' +
					'<div class="main-mobile-block__download">' +
						'<img src="img/download.svg" alt="">' +
						'<span>Скачать презентацию (PDF)</span>' +
					'</div>' +
				'</a>' +
			'</div>' +
		'</section>' +

		'<div class="aside-mobile">' +
			'<div class="aside-mobile__container">' +
				'<div class="aside-mobile__circle js-circle"></div>' +
				'<div class="aside-mobile__phone aside-mobile__phone_sakropol js-phone">' +
					'<div class="aside-mobile__wrap">' +
						'<img src="img/phone/smartphone.png" alt="">' +
						'<img src="img/phone/sakropol.png" alt="">' +
					'</div>' +
				'</div>' +
				'<div class="aside-mobile__phone aside-mobile__phone_akkond js-phone">' +
					'<div class="aside-mobile__wrap">' +
						'<img src="img/phone/smartphone.png" alt="">' +
						'<img src="img/phone/akkond.png" alt="">' +
					'</div>' +
				'</div>' +
				'<div class="aside-mobile__phone aside-mobile__phone_smu js-phone">' +
					'<div class="aside-mobile__wrap">' +
						'<img src="img/phone/smartphone.png" alt="">' +
					'	<img src="img/phone/smu.png" alt="">' +
					'</div>' +
				'</div>' +
				'<div class="aside-mobile__phone aside-mobile__phone_monolit js-phone">' +
					'<div class="aside-mobile__wrap">' +
						'<img src="img/phone/smartphone.png" alt="">' +
						'<img src="img/phone/monolit.png" alt="">' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>' +

	'</main>' +

	'<footer class="footer-mobile js-footer">' +
		'<a href="https://www.behance.net/grechka-digital" target="_blank" class="footer-mobile__behance-logo behance-logo-mobile">' +
			'<img src="img/target-blank.svg" alt="" class="behance-logo-mobile__target img-svg">' +
			'<img src="img/behance-logo.svg" alt="" class="behance-logo-mobile__logo img-svg">' +
		'</a>' +
		'<div class="footer-mobile__contcts">' +
			'<a href="tel:+7(978)8846766" class="footer-mobile__phone">+7 (978) 884 67 66</a>' +
			'<a href="mailto:hello@grechka.digital" class="footer-mobile__email">hello@grechka.digital</a>' +
		'</div>' +
	'</footer>'

	$(window).on('load', function() {
		if ($(window).width() < 768) {
			$('body').removeClass('body').empty();
			$('body').html(fragmentBody);
		}
	});

	//Поворт обмылков
	$('.aside__phone').on({
		mousemove: function(e) {
			var $container = $(this).children('.aside__wrap');
			var $x = e.offsetX;
			var	$y = e.offsetY;
			var $middleW = $container.outerWidth(true) / 2;
			var $middleH = $container.outerHeight(true) / 2;
			var $rotateX = -($x - $middleW) / 2000000;
			var $rotateY = -($y - $middleH) / 8000000;
			$container.css('transform', 'matrix3d(1, 0, 0, ' + $rotateX + ', 0, 1, 0, ' + $rotateY + ', 0, 0, 1, 0, 0, 0, 0, 1)');
		},
		mouseleave: function() {
			var $container = $(this).children('.aside__wrap');
			$container.css('transform', 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)');
		}
	});

	// Появление блоков
	$(document).ready(function() {
		setTimeout(function() {
			var arrOfTranslate = [
				'.js-phone',
				'.js-header',
				'.js-footer',
				'.js-circle',
				'.js-behance-logo',
				'.js-part-first',
				'.js-part-second',
				'.js-part-third',
				'.js-subtitle',
				'.js-presentation',
			];
			var arrayOfTimeTranslate = [0, 250, 250, 250, 250, 600, 800, 900, 1100, 1200];
			var arrayOfTimeVisible = [250, 450, 450, 450, 450, 750, 900, 1100, 1200, 1300];
			for(var i = 0; i < arrOfTranslate.length; i++) {
				timer(i);
			}
			function timer(j) {
				setTimeout(function() {
					$("" + arrOfTranslate[j]).addClass('translate');
				}, arrayOfTimeTranslate[j]);
				setTimeout(function() {
					$("" + arrOfTranslate[j]).addClass('visible');
				}, arrayOfTimeVisible[j]);
			}
		}, 100);
	});

});
