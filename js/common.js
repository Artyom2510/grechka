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
				'.aside__phone',
				'.header',
				'.footer',
				'.aside__circle',
				'.main__behance-logo',
				'.main-block__title-part_first',
				'.main-block__title-part_second',
				'.main-block__title-part_third',
				'.main-block__subtitle-part',
				'.main-block__link',
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
		}, 300);
	});

});
