$(document).ready(function() {
	megaWaveTweenIn();
	var deleteLog = false;
	$('#pagepiling').pagepiling({
		menu: '#sideNavigation',
		anchors: ['megaWave', 'poolParty', 'flyBoard', 'wildRiver', 'kiddyVillage', 'megaMenu', 'megaBbq'],
		sectionsColor: ['#fff', '#4781ec', '#61dfac', '#ff8d57', '#e4ffb8', '#fff', '#fff'],
		navigation: false,
		afterLoad: function(anchorLink, index) {
			if (anchorLink == 'megaWave') {
				contentTweenOut();
				megaWaveTweenIn();
				ChangeURL();
			}
			if (anchorLink == 'poolParty') {
				$(".lineupSlide").slick('setPosition');
				$(".lineupSlide2").slick('setPosition');
				megaWaveTweenOut();
				contentTweenOut();
				poolPartyTweenIn();
				ChangeURL();
				if($('.lineupSlide2 .lineupWrap.narae').is(".slick-active")) {
					poolPartyNaraeTweenIn();
				}
				naraeTag();
			}
			if (anchorLink == 'flyBoard') {
				$(".flyBoardSlide").slick('setPosition');
				megaWaveTweenOut();
				contentTweenOut();
				flyBoardTweenIn();
				ChangeURL();
			}
			if (anchorLink == 'wildRiver') {
				$(".wildRiverSlide").slick('setPosition');
				megaWaveTweenOut();
				contentTweenOut();
				wildRiverTweenIn();
				ChangeURL();
			}
			if (anchorLink == 'kiddyVillage') {
				megaWaveTweenOut();
				contentTweenOut();
				kiddyVillageTweenIn();
				ChangeURL();
			}
			if (anchorLink == 'megaMenu') {
				$(".specialSlide").slick('setPosition');
				$(".snackSlide").slick('setPosition');
				megaWaveTweenOut();
				contentTweenOut();
				megaMenuTweenIn();
				ChangeURL();
			}
			if (anchorLink == 'megaBbq') {
				$(".bbqSlide").slick('setPosition');
				megaWaveTweenOut();
				contentTweenOut();
				megaBbqTweenIn();
				ChangeURL();
			}
			deleteLog = true;
		}
	});
	// Change URL
	function ChangeURL() {
		if (typeof(history.pushState) == 'function') {
			history.pushState('', '', 'index.html');
		}
	}
	// megaWave
	function megaWaveTweenIn() {
		TweenMax.to($('.megaWave .titleBg'), 0, {delay: 0.6, opacity: 0});
		TweenMax.to($('.megaWave .titleBg'), 1.2, {delay: 1, opacity: 1});
		TweenMax.to($('.megaWave .title1'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .title1'), 0.3, {delay: 0.4, scaleX: 1, scaleY: 1, opacity: 1, ease: 'easeOutBack'});
		TweenMax.to($('.megaWave .title2'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .title2'), 0.3, {delay: 0.6, scaleX: 1, scaleY: 1, opacity: 1, ease: 'easeOutBack'});
		TweenMax.to($('.megaWave .title3'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .title3'), 0.3, {delay: 0.8, scaleX: 1, scaleY: 1, opacity: 1, ease: 'easeOutBack'});
		TweenMax.to($('.megaWave .title4'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .title4'), 0.3, {delay: 1, scaleX: 1, scaleY: 1, opacity: 1, ease: 'easeOutBack'});
		TweenMax.to($('.megaWave .bigWave'), 4, {delay: 0, marginBottom: -40, repeat:-1, yoyo:true, ease: 'easeOutElastic'});
	}
	function megaWaveTweenOut() {
		TweenMax.to($('.megaWave .titleBg'), 0, {delay: 0, opacity: 0});
		TweenMax.to($('.megaWave .title1'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .title2'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .title3'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .title4'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.megaWave .bigWave'), 0, {delay: 0, marginBottom: 0});
	}
	// poolParty
	function poolPartyTweenIn() {
		TweenMax.to($('.poolParty .conTitle'), 0, {delay: 0, marginTop: 240, opacity: 0});
		TweenMax.to($('.poolParty .conTitle'), 1.6, {delay: 0, marginTop: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.poolParty .contents'), 0, {delay: 0, marginTop: 49, opacity: 0});
		TweenMax.to($('.poolParty .contents'), 1.2, {delay: 0.3, marginTop: 31, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.poolParty .conTag'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.poolParty .conTag'), 0.3, {delay: 0.7, scaleX: 1, scaleY: 1, opacity: 1, ease: 'easeOutBack'});
	}
	// poolParty
	function poolPartyNaraeTweenIn() {
		TweenMax.to($('.poolParty .naraeTag'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.poolParty .naraeTag'), 0.3, {delay: 0.7, scaleX: 1, scaleY: 1, opacity: 1, ease: 'easeOutBack'});
	}
	// flyBoard
	function flyBoardTweenIn() {
		TweenMax.to($('.flyBoard .conTitle'), 0, {delay: 0, marginTop: 240, opacity: 0});
		TweenMax.to($('.flyBoard .conTitle'), 1.6, {delay: 0, marginTop: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.flyBoard .contents'), 0, {delay: 0, marginTop: 58, opacity: 0});
		TweenMax.to($('.flyBoard .contents'), 1.2, {delay: 0.3, marginTop: 40, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.flyBoard .conTag'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.flyBoard .conTag'), 0.3, {delay: 0.7, scaleX: 1, scaleY: 1, opacity: 1, ease: 'easeOutBack'});
	}
	// wildRiver
	function wildRiverTweenIn() {
		TweenMax.to($('.wildRiver .conTitle'), 0, {delay: 0, marginTop: 240, opacity: 0});
		TweenMax.to($('.wildRiver .conTitle'), 1.6, {delay: 0, marginTop: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.wildRiver .contents'), 0, {delay: 0, marginTop: 45, opacity: 0});
		TweenMax.to($('.wildRiver .contents'), 1.2, {delay: 0.3, marginTop: 27, opacity: 1, ease: 'easeOutExpo'});
	}
	// kiddyVillage
	function kiddyVillageTweenIn() {
		TweenMax.to($('.kiddyVillage .conTitle'), 0, {delay: 0, marginTop: 240, opacity: 0});
		TweenMax.to($('.kiddyVillage .conTitle'), 1.6, {delay: 0, marginTop: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.kiddyVillage .contents'), 0, {delay: 0, marginTop: 62, opacity: 0});
		TweenMax.to($('.kiddyVillage .contents'), 1.2, {delay: 0.3, marginTop: 44, opacity: 1, ease: 'easeOutExpo'});
	}
	// megaMenu
	function megaMenuTweenIn() {
		TweenMax.to($('.megaMenu .top .conTitle'), 0, {delay: 0, marginTop: 0, marginLeft: 80, opacity: 0});
		TweenMax.to($('.megaMenu .top .conTitle'), 1.2, {delay: 0, marginTop: 0, marginLeft: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.megaMenu .bottom .conTitle'), 0, {delay: 0, marginTop: 0, marginRight: 80, opacity: 0});
		TweenMax.to($('.megaMenu .bottom .conTitle'), 1.2, {delay: 0, marginTop: 0, marginRight: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.megaMenu .top .contents'), 0, {delay: 0, marginTop: 0, marginRight: 40, opacity: 0});
		TweenMax.to($('.megaMenu .top .contents'), 0.9, {delay: 0.3, marginTop: 0, marginRight: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.megaMenu .bottom .contents'), 0, {delay: 0, marginTop: 0, marginLeft: 40, opacity: 0});
		TweenMax.to($('.megaMenu .bottom .contents'), 0.9, {delay: 0.3, marginTop: 0, marginLeft: 0, opacity: 1, ease: 'easeOutExpo'});
	}
	// megaBbq
	function megaBbqTweenIn() {
		TweenMax.to($('.megaBbq .top .conTitle'), 0, {delay: 0, marginTop: 240, opacity: 0});
		TweenMax.to($('.megaBbq .top .conTitle'), 1.6, {delay: 0, marginTop: 0, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.megaBbq .top .contents'), 0, {delay: 0, marginTop: 23, opacity: 0});
		TweenMax.to($('.megaBbq .top .contents'), 1.2, {delay: 0.3, marginTop: 5, opacity: 1, ease: 'easeOutExpo'});
		TweenMax.to($('.megaBbq .bottom .contents'), 0, {delay: 0, marginTop: 0, marginLeft: 40, opacity: 0});
		TweenMax.to($('.megaBbq .bottom .contents'), 0.9, {delay: 0.3, marginTop: 0, marginLeft: 0, opacity: 1, ease: 'easeOutExpo'});
	}
	// content Tween Out
	function contentTweenOut() {
		TweenMax.to($('.conTitle'), 0, {delay: 0, marginTop: 240, opacity: 0});
		TweenMax.to($('.poolParty .contents'), 0, {delay: 0, marginTop: 49, opacity: 0});
		TweenMax.to($('.poolParty .conTag'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.poolParty .naraeTag'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.flyBoard .contents'), 0, {delay: 0, marginTop: 58, opacity: 0});
		TweenMax.to($('.flyBoard .conTag'), 0, {delay: 0, scaleX: 3, scaleY: 3, opacity: 0});
		TweenMax.to($('.wildRiver .contents'), 0, {delay: 0, marginTop: 45, opacity: 0});
		TweenMax.to($('.kiddyVillage .contents'), 0, {delay: 0, marginTop: 62, opacity: 0});
		TweenMax.to($('.megaMenu .top .conTitle'), 0, {delay: 0, marginTop: 0, marginLeft: 80, opacity: 0});
		TweenMax.to($('.megaMenu .bottom .conTitle'), 0, {delay: 0, marginTop: 0, marginRight: 80, opacity: 0});
		TweenMax.to($('.megaMenu .top .contents'), 0, {delay: 0, marginTop: 0, marginRight: 40, opacity: 0});
		TweenMax.to($('.megaMenu .bottom .contents'), 0, {delay: 0, marginTop: 0, marginLeft: 40, opacity: 0});
		TweenMax.to($('.megaBbq .top .conTitle'), 0, {delay: 0, marginTop: 240, opacity: 0});
		TweenMax.to($('.megaBbq .top .contents'), 0, {delay: 0, marginTop: 23, opacity: 0});
		TweenMax.to($('.megaBbq .bottom .contents'), 0, {delay: 0, marginTop: 0, marginLeft: 40, opacity: 0});
	}
	// slick
	$(".flyBoardSlide").slick({
		autoplay: true,
		dots: true,
		fade: true,
		arrows: false,
		slidesToShow: 1,
		speed: 800
	});
	$(".wildRiverSlide").slick({
		autoplay: true,
		dots: true,
		fade: true,
		arrows: false,
		slidesToShow: 1,
		speed: 800
	});
	$(".lineupSlide").slick({
		centerMode: true,
		centerPadding: "26%",
		infinite: false,
		slidesToShow: 1,
		speed: 600,
		responsive: [{
			breakpoint: 1600,
			settings: {centerPadding: "22%"}
		}, {
			breakpoint: 1440,
			settings: {centerPadding: "19%"}
		}, {
			breakpoint: 1280,
			settings: {centerPadding: "15%"}
		}, {
			breakpoint: 1024,
			settings: {centerPadding: "7%"}
		}]
	});
	$(".lineupSlide2").slick({
		centerMode: true,
		centerPadding: "26%",
		infinite: true,
		slidesToShow: 1,
		speed: 600,
		responsive: [{
			breakpoint: 1600,
			settings: {centerPadding: "22%"}
		}, {
			breakpoint: 1440,
			settings: {centerPadding: "19%"}
		}, {
			breakpoint: 1280,
			settings: {centerPadding: "15%"}
		}, {
			breakpoint: 1024,
			settings: {centerPadding: "7%"}
		}]
	});
	$(".specialSlide").slick({
		infinite: true,
		arrows: true,
		slidesToShow: 1,
		speed: 600
	});
	$(".snackSlide").slick({
		centerMode: true,
		centerPadding: "0",
		infinite: true,
		arrows: true,
		slidesToShow: 3,
		speed: 600
	});
	$(".bbqSlide").slick({
		centerMode: true,
		centerPadding: "0",
		infinite: true,
		arrows: true,
		slidesToShow: 4,
		speed: 600
	});
	function naraeTag() {
		if($('.tabMonth li:nth-child(1)').is(".isActive")) {
			if($('.lineupSlide2 .lineupWrap.narae').is(".slick-active")) {
				$('.poolParty .conTag').hide();
				$('.poolParty .naraeTag').show();
			} else {
				$('.poolParty .naraeTag').hide();
				$('.poolParty .conTag').show();
			}
		} else {
			$('.poolParty .naraeTag').hide();
			$('.poolParty .conTag').show();
		}
	}
	$('.tabMonth li a').on('click', function() {
		var tlIdx = $(this).parent().index() + 7;
		$('.tabMonth li').removeClass('isActive');
		$(this).parent().addClass('isActive');
		$('.monthWrap').hide();
		$('.monthWrap.month' + tlIdx).show();
		$(".lineupSlide").slick('setPosition');
		$(".lineupSlide2").slick('setPosition');
		naraeTag();
	});
	$('.lineupSlide2').on('swipe', function(){
		naraeTag();
	});
	$('.slick-arrow').on('click', function(){
		naraeTag();
	});
	$('.tabDate > li a').on('click', function() {
		var tdIdx = $(this).parent().index() + 1;
		$(this).parents('.tabDate').find('li').removeClass('isActive');
		$(this).parent().addClass('isActive');
		$(this).parent().parent().next().find('p').hide();
		$(this).parent().parent().next().find('p:nth-child('+tdIdx+')').show();
	});
	$(window).on('load resize', function() {
		var conBoxW = $(window).width()/2;
		var conBoxH = $(window).height();
		var monthWrapH = $('.monthWrap').height();
		var monthWrapMargin = ((conBoxH-monthWrapH)-60)/2;
		$('.conBox.left').css({"width": conBoxW, "height": conBoxH});
		$('.conBox.right').css({"width": conBoxW, "height": conBoxH});
		$('.flyBoardSlide').css({"width": conBoxW, "height": conBoxH});
		$('.flyBoardSlide .slideItem').css({"height": conBoxH});
		$('.wildRiverSlide').css({"width": conBoxW, "height": conBoxH});
		$('.wildRiverSlide .slideItem').css({"height": conBoxH});
		$('.monthWrap').css({"marginTop": monthWrapMargin});
		$('.poolParty .conTag').css({"top": monthWrapMargin+110});
		$('.poolParty .naraeTag').css({"top": monthWrapMargin+110});
	});
});