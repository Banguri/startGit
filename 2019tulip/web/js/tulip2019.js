$(document).ready(function(){

	function evResize() {
		var winW = $(window).width(),
				winH = $(window).height(),
				menuWrapH = $(".menuWrap").height(),
				menuH = $(".menuWrap ul").height(),
				menuPos = (menuWrapH-menuH)/2;
		$("#header .title").css("height", (winH-274));
		$("#nav .menuWrap ul").css("top", menuPos);
	};
	function gardenSlickResize() {
		var winW = $(window).width(),
				winH = $(window).height(),
				$garden = $("#garden");
		$garden.find(".slideItem img").css("height", winH);
	};
	function popupPosition() {
		var winW = $(window).width(),
				winH = $(window).height(),
				_popupWrap = $(".popupWrap"),
				_popupWrapPos = (winH-539)/2;
		_popupWrap.css("top", _popupWrapPos);
	};

	evResize();
	gardenSlickResize();
	popupPosition();

	$(window).on('load resize', function(){
		evResize();
		gardenSlickResize();
		popupPosition();
	});

	function navOpen() {
		TweenMax.to($('.hamburger .line1'), 0.3, {marginTop:0, rotation:45, ease:Power1.easeOut});
		TweenMax.to($('.hamburger .line2'), 0.3, {opacity:0, width:2, ease:Power1.easeOut});
		TweenMax.to($('.hamburger .line3'), 0.3, {marginTop:0, rotation:-45, ease:Power1.easeOut});
		TweenMax.to($('#nav'), 1, {left:90, ease:Power3.easeOut});
	};
	function navClose() {
		TweenMax.to($('.hamburger .line1'), 0.3, {marginTop:-8, rotation:0, ease:Power1.easeIn});
		TweenMax.to($('.hamburger .line2'), 0.3, {opacity:1, width:28, ease:Power1.easeIn});
		TweenMax.to($('.hamburger .line3'), 0.3, {marginTop:8, rotation:0, ease:Power1.easeIn});

		TweenMax.to($('#nav'), 1, {left:-289, ease:Power3.easeIn});
	};

	$('.navBtn').on('click', function(e) {
		$('.navBtn').toggleClass('close');
		if($(this).is(".close")){
			$(this).find('.hidden').html('메뉴닫기');
			navOpen();
		} else {
			$(this).find('.hidden').html('메뉴열기');
			navClose();
		}
		e.preventDefault();
	});

	$('.tabTitle a').on('click', function(e) {
		$('.tabTitle').removeClass('isActive');
		$(this).parent().addClass('isActive');
		e.preventDefault();
	});

	// Swiper
	var menuText = ['메인', '포시즌스 가든', '아트 스튜디오', 'TULIP', '페어리 인 아트', '브렌시아 존', '할로! 홀란드', '퍼레이드&amp;공연', 'F&amp;B', 'MD'];

	var mySwiper = new Swiper('.swiper-container', {
		hashnav: true,
		hashnavWatchState: true,
		pagination: '.gnb',
		paginationClickable : true,
		paginationBulletRender: function (index, className) {
		return '<li class="' + className + ' menu' + index + '"><span class="hidden">' + (menuText[index]) + '</span></li>';
		},
		nextButton: '.nextArrow',
		//prevButton: '.prevButton',
		slidesPerView: 1,
		spaceBetween: 0,
		mousewheelControl: true,
		parallax: true,
		speed: 1200,
		history: {
			replaceState: true,
		},
	});

	function animateProgressbar(){
		var currentSlide = mySwiper.activeIndex+1,
				totalSlide = mySwiper.slides.length,
				progressbarScaleX = currentSlide*(100/totalSlide);
		$(".progressbar").css("width",progressbarScaleX+"%");
	};

	animateProgressbar();

	mySwiper.on('slideChangeStart', function () {
		animateProgressbar();
		navClose();
		$('.navBtn').removeClass('close');
	});

	// Modal layer popup
	$("#webzineWrap").append("<div class='modalOverlay'></div>");
	$(".btnView").click(function () {
		var getPopupID = $(this).attr("name");
		$('#'+getPopupID).show().animate({opacity:"1"}, 400, 'swing');
		$('.modalOverlay').show().animate({opacity:"0.75"}, 400, 'swing');
		$(".photoSlide").slick('setPosition');
	});
	$('.popupClose, .modalOverlay').click(function() {
		TweenMax.to($('.popupWrap'), 0.4, {display:'none', opacity:0, ease:Power2.easeIn});
		TweenMax.to($('.modalOverlay'), 0.4, {display:'none', opacity:0, ease:Power2.easeIn});
	})

	// Slick Slide
	$(".popupPhoto .photoSlide").slick({
		dots: true,
		arrows: true,
		slidesToShow: 1,
		speed: 600,
	});

	$(".contentPhoto .photoSlide").slick({
		dots: false,
		arrows: true,
		slidesToShow: 1,
		speed: 600,
	});

	$(".contentPhotoFade .photoSlide").slick({
		dots: false,
		arrows: true,
		slidesToShow: 1,
		speed: 600,
		fade: true,
	});

	$(".food .photoSlide").slick({
		dots: false,
		arrows: true,
		slidesToShow: 1,
		speed: 600,
	});

	$(".beverage .photoSlide").slick({
		dots: false,
		arrows: true,
		centerMode: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		centerPadding: '0',
		speed: 600,
	});

});