$(document).ready(function() {

	// fullpage.js
	$('#fullpage').fullpage({
		anchors: ['main', 'photospot', 'fireworks', 'performance', 'product'],
		menu: '#menu',
		slidesNavigation: true,
		slidesNavPosition: 'bottom',
		controlArrows: false,
		// onLeave: function(index, nextIndex, direction) {
		//	if (index == index) {
		//		fpSlideDefault();
		//	}
		// },
	});


//////////////////////// function //////////////////////
	// function fpSlideDefault() {
	//	$('.fp-slidesContainer').css({'transform':'translate3d(0px, 0px, 0px)'});
	//	$('.fp-slidesNav').find('a').removeClass('active');
	//	$('.fp-slidesNav li:first-child').find('a').addClass('active');
	// }
	function navShow() {
		TweenMax.to($('#menu'), 0.4, {right:"0%", ease:Power2.easeOut});
	}
	function navHide() {
		TweenMax.to($('#menu'), 0.4, {right:"-100%", ease:Power2.easeIn});
	}

	//////////////////////// menu //////////////////////
	$('#menu a').click( function() {
		var inDepth2 = $('.inDepth2'),
				depth2Wrap = $('.depth2Wrap'),
				depth2WrapCurrent = $(this).parent().find('.depth2Wrap');

			if ($(this).is(".inDepth2")) {
				inDepth2.removeClass("open");
				$(this).toggleClass("open");
				depth2Wrap.removeClass("isActive");
				depth2WrapCurrent.addClass("isActive");
			} else {
				navHide();
				depth2Wrap.removeClass("isActive");
			}
	});

	////////////////////// GNB Open/Close //////////////////////
	$('.gnbOpen').click( function() {
		navShow();
	});
	$('.gnbClose').click( function() {
		navHide();
	});

	////////////////////// BGM Control //////////////////////
	$('.bgmControl').on('click', function() {
		var bgm = document.getElementById("bgm");
		$(this).toggleClass('isPlay');
		if ($(this).is(".isPlay")) {
			bgm.play();
			$(this).attr("title", "배경음악 끄기");
			var imgSrc = $(this).find('img').attr("src").replace('_on', '_off');
		} else {
			bgm.pause();
			$(this).attr("title", "배경음악 켜기");
			var imgSrc = $(this).find('img').attr("src").replace('_off', '_on');
		}
		$(this).find('img').attr("src", imgSrc);
	});

	////////////////////// Slick Slide //////////////////////
	$(".photoSlide").slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		speed: 600
	});
	$(".productSlide").slick({
		centerMode: true,
		//centerPadding: '13.33%',
		centerPadding: '20%',
		slidesToShow: 1,
		speed: 600
	});

//////////////////////// Modal layer popup //////////////////////
	$("#webzineWrap").append("<div class='modalOverlay'></div>");
	$(".btnView").click(function () {
		var getPopupID = $(this).attr("name");
		$('#'+getPopupID).show().animate({opacity:"1"}, 600);
		$('.modalOverlay').show().animate({opacity:"0.75"}, 600);
		$(".photoSlide").slick('setPosition');
	});
	$('.popupClose, .modalOverlay').click(function() {
		$('.popupWrap').hide().css("opacity", "0");
		$('.modalOverlay').hide().css("opacity", "0");
	});


});