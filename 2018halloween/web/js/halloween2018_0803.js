$(document).ready(function() {

	// dom Create
	$(".VideoFrame").append("<div class='vfHandLeft'></div><div class='vfHandTop'></div><div class='fTop'></div><div class='fRight'></div><div class='fBottom'></div><div class='fLeft'></div>");
	$(".entertainSlideWrap").append("<div class='cfTop'></div><div class='cfRight'></div><div class='cfBottom'></div><div class='cfLeft'></div>");
	$(".popupWrap.popupPhoto").append("<div class='pfHandLeft'></div><div class='pfHandRight'></div><div class='fTop'></div><div class='fRight'></div><div class='fBottom'></div><div class='fLeft'></div>");

	// Glitch Effect
	$(".glitchText, .glitchImg").each(function() {
		if($(this).is(".glitchText")) {
			var glitchText = $(this).text(),
					glitchBefore = $('<i />', {
						class: 'glitchBefore', 
						text: glitchText
					}),
					glitchAfter = $('<i />', {
						class: 'glitchAfter', 
						text: glitchText
					});
			$(this).prepend(glitchBefore.clone());
			$(this).append(glitchAfter.clone());
		} else {
			var glitchImg = $(this).find('img'),
					glitchSrc = glitchImg.attr("src"),
					glitchAlt = glitchImg.attr("alt"),
					glitchBlueSrc = glitchSrc.replace('.png', '_blue.png'),
					glitchRedSrc = glitchSrc.replace('.png', '_red.png'),
					glitchBlue = $('<img />', {
						class: 'glitchBefore', 
						src: glitchBlueSrc, 
						alt: glitchAlt
					}),
					glitchRed = $('<img />', {
						class: 'glitchAfter', 
						src: glitchRedSrc, 
						alt: glitchAlt
					});
			$(this).prepend(glitchBlue.clone());
			$(this).append(glitchRed.clone());
		}
		$(this).hover(
			function() {
				$(this)
					.animate({opacity:"0.4"}, 50)
					.animate({opacity:"0.8"}, 50)
					.animate({opacity:"0.6"}, 50)
					.animate({opacity:"1"}, 50);
				$(this).find(".glitchBefore")
					.animate({marginLeft:"0", marginTop:"0", opacity:"0"}, 100, "linear")
					.animate({marginLeft:"-1px", marginTop:"1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"-1px", marginTop:"-1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"1px", marginTop:"1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"1px", marginTop:"-1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"0", marginTop:"0", opacity:"0"}, 100, "linear");
				$(this).find(".glitchAfter")
					.animate({marginLeft:"0", marginTop:"0", opacity:"0"}, 100, "linear")
					.animate({marginLeft:"1px", marginTop:"-1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"1px", marginTop:"1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"-1px", marginTop:"-1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"-1px", marginTop:"1px", opacity:".8"}, 100, "swing")
					.animate({marginLeft:"0", marginTop:"0", opacity:"0"}, 100, "linear");
			}, function() {
				$(this).find(".glitchBefore")
					.animate({marginLeft:"0", marginTop:"0", opacity:"0"}, 0);
				$(this).find(".glitchAfter")
					.animate({marginLeft:"0", marginTop:"0", opacity:"0"}, 0);
			}
		);
	});

	// photo hover effect
	$(".photoThumb").each(function() {
		var thumbImg = $(this).find('img'),
				thumbSrc = thumbImg.attr("src"),
				thumbAlt = thumbImg.attr("alt"),
				thumbCoverSrc = thumbSrc.replace('.jpg', '_cover.jpg'),
				thumbCover = $('<img />', {
					class: 'thumbCover', 
					src: thumbCoverSrc, 
					alt: thumbAlt
				});
		$(this).prepend(thumbCover.clone());
		$(this).hover(
			function() {
				TweenMax.to($(this).find(".thumbCover"), 1, {opacity:0, ease:RoughEase.ease});
			}, function() {
				TweenMax.to($(this).find(".thumbCover"), 1, {opacity:1, ease:RoughEase.ease});
			}
		);
	});

	// Modal layer popup
	$(".btnView").click(function () {
		var getPopupID = $(this).attr("name");
		$('#'+getPopupID).show().animate({opacity:"1"}, 600);
		$('.modalOverlay').show().animate({opacity:"0.7"}, 600);
		$('body,html').css("overflowY", "hidden");
		$(".photoSlide").slick('setPosition');
	});
	$('.popupClose, .modalOverlay').click(function() {
		$('.popupWrap').hide().css("opacity", "0");
		$('.modalOverlay').hide().css("opacity", "0");
		$('body,html').css("overflowY", "visible");
	})

	// Slick Slide
	$(".photoSlide").slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		speed: 600
	});
	$(".entertainSlide").slick({
		dots: true,
		slidesToShow: 1,
		speed: 600
	});



	////////////////////// Common Motion Tween //////////////////////
	//////// scroll
	var $body = $('body,html'),
			$header = $('#header'),
			$scrollLink = $('#nav a'),
			$scrollTop = $('.scrollTop');
	// Go top
	$scrollTop.hover(function(){
		TweenMax.to($scrollTop, 0, {opacity:0.5})
		TweenMax.to($scrollTop, 1, {opacity:1, ease:RoughEase.ease, repeat:-1, repeatDelay:0.6, yoyo:true});
	}, function() {
		TweenMax.to($scrollTop, 0, {opacity:1});
	});
	// Smooth scrolling
	$scrollLink.click(function(e) {
		e.preventDefault();
		$body.animate({$scrollTop: $(this.hash).offset().top -80}, 600);
	});
	$scrollTop.click(function(e) {
		e.preventDefault();
		$body.animate({$scrollTop: 0}, 600);
	});
	// Active link switching
	$(window).scroll(function() {
		var scrollbarLocation = $(this).scrollTop();
		// Scroll Link
		$scrollLink.each(function() {
			var sectionOffset = $(this.hash).offset().top - 120;
			if ( sectionOffset <= scrollbarLocation ) {
				$(this).parent().addClass('active');
				$(this).parent().siblings().removeClass('active');
			}
		});
		// Scroll Top
		if(scrollbarLocation > 0){
			$header.addClass('fixed');
			TweenMax.to($scrollTop, 0.5, {opacity:1, ease:Bounce.easeOut});
		} else {
			$header.removeClass('fixed');
			TweenMax.to($scrollTop, 0.5, {opacity:0, ease:Bounce.easeOut});
		};
	});
	//////// screen fade in
	var $webzineWrap = $('#webzineWrap');
	var tween = TweenMax.to($webzineWrap, 10, {opacity:1, ease:Expo.easeOut});



	////////////////////// Intro Motion Tween //////////////////////
	//////// intro
	var $introTitleWrap = $('.introTitleWrap'),
			$introBg = $('.introBg'),
			$introBgLeft = $('.introBgLeft'),
			$introBgRight = $('.introBgRight'),
			$titleSpark = $('.introTitleWrap .titleSpark'),
			$titleA = $('.titleA'),
			$titleG = $('.titleG'),
			$introText = $('.introText'),
			$introBtn = $('.introBtn');

	//////// function
	function fadePage() {
		TweenMax.to($introTitleWrap, 0.8, {delay:1, top:0, opacity:1, ease:Elastic.easeOut});
		TweenMax.to($introBgLeft, 1, {opacity:1, ease:Elastic.easeOut});
		TweenMax.to($introBgRight, 1, {opacity:1, ease:Elastic.easeOut});
	}
	function introTitle() {
		new TimelineMax({repeat:-1, repeatDelay:1.5, yoyo:true})
				.to($titleSpark, 0, {opacity:0})
				.to($titleSpark, 0.2, {opacity:1, ease:RoughEase.ease})
				.to($titleSpark, 0.6, {opacity:0, ease:RoughEase.ease});
		new TimelineMax({repeat:-1, repeatDelay:2.9, yoyo:true})
				.to($titleA, 0, {opacity:0})
				.to($titleA, 0.3, {opacity:1, ease:RoughEase.ease})
				.to($titleA, 0.7, {opacity:0, ease:RoughEase.ease});
		new TimelineMax({repeat:-1, repeatDelay:2.8, yoyo:true})
				.to($titleG, 0, {opacity:0})
				.to($titleG, 0.4, {opacity:1, ease:RoughEase.ease})
				.to($titleG, 0.6, {opacity:0, ease:RoughEase.ease});
		TweenMax.to($introText, 1, {delay:1, marginTop:0, opacity:1, ease:RoughEase.ease});
		TweenMax.to($introBtn, 1, {delay:1.5, marginTop:0, opacity:1, ease:RoughEase.ease});
	}
	function introDoor() {
		TweenMax.to($introBgLeft, 0.8, {right:3, ease:RoughEase.ease, repeat:-1, repeatDelay:1, yoyo:true});
		TweenMax.to($introBgRight, 1.6, {right:-3, ease:RoughEase.ease, repeat:-1, repeatDelay:2, yoyo:true});
	}
	function introDoorIn() {
		TweenMax.to($introBtn, 0, {opacity:0.5})
		TweenMax.to($introBtn, 1, {opacity:1, ease:RoughEase.ease, repeat:-1, repeatDelay:0.6, yoyo:true});
		new TimelineMax()
				.to($introBgLeft, 0.5, {right:3, ease:RoughEase.ease})
				.to($introBgLeft, 0.2, {right:12, ease:RoughEase.ease, repeat:-1, yoyo:true});
		new TimelineMax()
				.to($introBgRight, 0.3, {right:-3, ease:RoughEase.ease})
				.to($introBgRight, 0.4, {right:-9, ease:RoughEase.ease, repeat:-1, yoyo:true});
	}
	function introDoorOut() {
		TweenMax.to($introBtn, 0, {opacity:1});
		new TimelineMax()
				.to($introBgLeft, 0.1, {right:0, ease:RoughEase.ease})
				.to($introBgLeft, 0.8, {right:3, ease:RoughEase.ease, repeat:-1, repeatDelay:1, yoyo:true});
		new TimelineMax()
				.to($introBgRight, 0.2, {right:0, ease:RoughEase.ease})
				.to($introBgRight, 1.2, {right:-3, ease:RoughEase.ease, repeat:-1, repeatDelay:2, yoyo:true});
	}
	function introDoorOpen() {
		TweenMax.to($introTitleWrap, 1.6, {top:-400, opacity:0, ease:Expo.easeOut});
		TweenMax.to($introText, 1.6, {opacity:0, ease:Expo.easeOut});
		TweenMax.to($introBtn, 1.6, {opacity:0, ease:Expo.easeOut});
		TweenMax.to($introBgLeft, 1.6, {delay:0.5, right:2000, opacity:0, ease:Bounce.easeIn});
		TweenMax.to($introBgRight, 1.6, {delay:0.5, right:-1000, opacity:0, ease:Bounce.easeIn});
		TweenMax.to($introBg, 0, {delay:0, scale:0.6, opacity:0.5});
		TweenMax.to($introBg, 1.6, {delay:0.5, scale:3, opacity:1, ease:Bounce.easeIn});
	}

	////////  Base Practice
	fadePage();
	introTitle();
	introDoor();

	////////  Go index
	var $goIndex = $('.introBtn');
	function goMain() {
		location.href = 'index.html';
	}
	$goIndex.delegate('a', 'mouseenter focusin mouseleave focusout click', function (event) {
		switch (event.type) {
			// over
			case 'mouseenter' :
			case 'focusin' :
				introDoorIn();
			break;
			// out
			case 'mouseleave' :
			case 'focusout' :
				introDoorOut();
			break;
			// click
			case 'click' :
				introDoorOpen();
				setTimeout(function(){
					goMain();
				}, 1800);
			break;
		}
	});



	////////////////////// Main Motion Tween (ScrollMagic + GSAP) //////////////////////
	//////// init controller
	var controller = new ScrollMagic.Controller();

	//////// main
	// spark
	var tween = new TimelineMax({repeat: -1, repeatDelay: 1.5, yoyo: true})
							.to($('.mainTitleWrap .titleSpark'), 0, {opacity: 0})
							.to($('.mainTitleWrap .titleSpark'), 0.2, {opacity: 1, ease: RoughEase.ease})
							.to($('.mainTitleWrap .titleSpark'), 0.6, {opacity: 0, ease: RoughEase.ease});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							.addIndicators({name: "loop"})
							.addTo(controller);
	// smoke
	TweenMax.set(".mainSmoke", {opacity: 0.7});
	var tween = TweenMax
							.to($('.mainSmoke'), 3, {opacity: 1, ease: Power2.easeOut, repeat: -1, yoyo: true});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							.addIndicators({name: "loop"})
							.addTo(controller);
	// Zombie (back left)
	var tween = TweenMax
							.to($('.mainZombieLeft'), 0.8, {marginBottom: 5, ease: RoughEase.ease, repeat: -1, repeatDelay: 1.2, yoyo: true});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							.addIndicators({name: "loop"})
							.addTo(controller);
	// Zombie (back right)
	var tween = TweenMax
							.to($('.mainZombieRight'), 1.2, {marginBottom: 4, ease: RoughEase.ease, repeat: -1, repeatDelay: 1.8, yoyo: true});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							.addIndicators({name: "loop"})
							.addTo(controller);
	// Zombie (center left)
	var tween = new TimelineMax({repeat: -1, repeatDelay: 0, yoyo: true})
							.to($('.mainZombieCenter2'), 0, {marginLeft: -150, ease: RoughEase.ease})
							.to($('.mainZombieCenter2'), 0.4, {marginLeft: -145, ease: RoughEase.ease})
							.to($('.mainZombieCenter2'), 0.5, {marginLeft: -150, ease: RoughEase.ease})
							.to($('.mainZombieCenter2'), 0.7, {marginLeft: -155, ease: RoughEase.ease})
							.to($('.mainZombieCenter2'), 0.2, {marginLeft: -150, ease: RoughEase.ease});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							.addIndicators({name: "loop"})
							.addTo(controller);
	// Zombie (center right)
	var tween = new TimelineMax({repeat: -1, repeatDelay: 0.2, yoyo: true})
							.to($('.mainZombieCenter1'), 0, {marginLeft: 220, ease: RoughEase.ease})
							.to($('.mainZombieCenter1'), 0.5, {marginLeft: 230, ease: RoughEase.ease})
							.to($('.mainZombieCenter1'), 0.6, {marginLeft: 220, ease: RoughEase.ease})
							.to($('.mainZombieCenter1'), 0.9, {marginLeft: 210, ease: RoughEase.ease})
							.to($('.mainZombieCenter1'), 0.3, {marginLeft: 220, ease: RoughEase.ease});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							.addIndicators({name: "loop"})
							.addTo(controller);
	// Prolog
	TweenMax.set(".prologWrap .paragraph", {marginTop: -5, opacity: 0});
	var tween = new TimelineMax()
							.to($('.prologWrap .paragraph:nth-child(1)'), 1.2, {delay: 0, marginTop: 0, opacity: 1, ease: RoughEase.ease})
							.to($('.prologWrap .paragraph:nth-child(2)'), 1.2, {delay: -0.8, marginTop: 0, opacity: 1, ease: RoughEase.ease})
							.to($('.prologWrap .paragraph:nth-child(3)'), 1.2, {delay: -0.4, marginTop: 0, opacity: 1, ease: RoughEase.ease});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", offset: 800})
							.setTween(tween)
							.addIndicators({name: "timeline"})
							.addTo(controller);

	//////// halloweenZone

	//////// horrorRride

	//////// entertainment

	//////// costumePlay

	//////// foodGood

	//////// infomation






});