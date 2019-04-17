$(document).ready(function() {
	function popupPosition() {
		var winW = $(window).width(),
				winH = $(window).height(),
				_popupWrap = $(".popupWrap"),
				_popupWrapPos = (winH-(910/2))/2;
		_popupWrap.css("top", _popupWrapPos);
	};
	popupPosition();
	$('#main, #tulip').addClass('fixedHeight');

	//////////////////////// Swiper //////////////////////
	var menuText = ['메인', '포시즌스 가든', '아트 스튜디오', 'TULIP', '페어리 인 아트', '브렌시아 존', '할로! 홀란드', '퍼레이드&amp;공연', 'F&amp;B', 'MD'];
	var mySwiper = new Swiper('.swiper-container', {
		hashnav: true,
		hashnavWatchState: true,
		pagination: '.gnb',
		paginationClickable : true,
		paginationBulletRender: function (index, className) {
		return '<li class="' + className + ' menu' + index + '"><span>' + (menuText[index]) + '</span></li>';
		},
		slidesPerView: 1,
		spaceBetween: 0,
		speed: 600,
	});

	function matchPortrait() {
		var winH = $(window).height();
		if(window.matchMedia("(orientation: portrait)").matches){
			if($('.swiper-slide-active section').is(".fixedHeight")){
				$('.swiper-container').css({'height':winH});
				$('#main, #tulip').css({'height':winH-57});
			}
		}
	};

	matchPortrait();

	$(window).scroll(function(){
		var startHeight = $('.swiper-slide-active section').height()+57;
		$('.swiper-container').css({'height':startHeight});
		matchPortrait();
	});

	mySwiper.on('SlideChangeStart', function() {
		var currentHeight = $('.swiper-slide-active section').height()+57;
		$('body, html').animate({scrollTop:0}, 0);
		$('.swiper-container').css({'height':currentHeight});
		matchPortrait();
		menuMoving();
		fnbSlideBtnPos();
	});

	//////////////////////// menu //////////////////////
	function menuMoving() {
		TweenMax.to($('#menu'), 0.4, {right:"-100%", ease:Power2.easeIn});
		$('.gnbToggle').removeClass('close').attr({"title":"메뉴보기"});
	};
	function menuClickEv() {
		$('#menu li').on('click', function() {
			menuMoving();
		});
	};
	menuClickEv();

	////////////////////// GNB Toggle //////////////////////
	$('.gnbToggle').on('click', function() {
		$('.gnbToggle').toggleClass('close');
		if($(this).is(".close")) {
			TweenMax.to($('#menu'), 0.4, {right:"0%", ease:Power2.easeOut});
			$(this).attr({"title":"메뉴닫기"});
		} else {
			TweenMax.to($('#menu'), 0.4, {right:"-100%", ease:Power2.easeIn});
			$(this).attr({"title":"메뉴보기"});
		}
	});
	$('.gnbClose').click( function() {
		TweenMax.to($('#menu'), 0.4, {right:"-100%", ease:Power2.easeIn});
	});

	////////////////////// parade Tab //////////////////////
	$('.paradeTab').on('click', function(e) {
		$('.paradeTab').removeClass('isActive');
		$(this).addClass('isActive');
		e.preventDefault();
	});

	////////////////////// Slick Slide //////////////////////
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
	});
	$(".food .photoSlide").slick({
		dots: false,
		arrows: true,
		slidesToShow: 1,
		speed: 600,
		fade: true,
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
	function fnbSlideBtnPos() {
		var foodImgH = $(".food").find('img').height(),
				foodSlideBtnPos = (foodImgH-43)/2;
		var beverageImgH = $(".beverage").find('img').height(),
				beverageSlideBtnPos = (beverageImgH-43)/2;
		$(".food").find('.slick-prev, .slick-next').css({'top':foodSlideBtnPos});
		$(".beverage").find('.slick-prev, .slick-next').css({'top':beverageSlideBtnPos});
	}
	fnbSlideBtnPos();

	//////////////////////// Modal layer popup //////////////////////
	$("#webzineWrap").append("<div class='modalOverlay'></div>");
	$(".btnView").click(function() {
		var getPopupID = $(this).attr("name");
		$('#'+getPopupID).show().animate({opacity:"1"}, 600);
		$('.modalOverlay').show().animate({opacity:"0.65"}, 600);
		$(".photoSlide").slick('setPosition');
	});
	$('.popupClose, .modalOverlay').click(function() {
		$('.popupWrap').hide().css("opacity", "0");
		$('.modalOverlay').hide().css("opacity", "0");
	});

	//////////////////////// 가로세로모드체크 //////////////////////
	$(window).on("orientationchange", function(event){
		setTimeout(function() {
			var currentHeight = $('.swiper-slide-active section').height()+57;
			$('.swiper-container').css({'height':currentHeight});
			matchPortrait();
			mySwiper.on('SlideChangeStart', function() {
				var currentHeight = $('.swiper-slide-active section').height()+57;
				$('body, html').animate({scrollTop:0}, 0);
				$('.swiper-container').css({'height':currentHeight});
				matchPortrait();
				menuMoving();
				fnbSlideBtnPos();
			});
			$(".photoSlide").slick('setPosition');
			menuClickEv();
			fnbSlideBtnPos();
			popupPosition();
		}, 100);
	});
});