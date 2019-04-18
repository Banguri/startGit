$(document).ready(function() {

////////////////////// function //////////////////////
	function bodyScrollYes() {
		$('body,html').css("overflowY", "visible");
	}
	function bodyScrollNo() {
		$('body,html').css("overflowY", "hidden");
	}
	function navShow() {
		TweenMax.to($('#nav'), 0.4, {right:"0%", ease:Power2.easeOut});
	}
	function navHide() {
		TweenMax.to($('#nav'), 0.4, {right:"-100%", ease:Power2.easeIn});
	}

	////////////////////// scroll //////////////////////
	$('.nav a').click(function(e) {
		e.preventDefault();
		navHide();
		bodyScrollYes();
		$('body,html').delay(400).animate({scrollTop: $(this.hash).offset().top -20}, 600);
	});
	$(window).scroll(function() {
		var scrollbarLocation = $(this).scrollTop();
		$('.nav a').each(function() {
			var sectionOffset = $(this.hash).offset().top - 120;
			if ( sectionOffset <= scrollbarLocation ) {
				$(this).parent().addClass('active');
				$(this).parent().siblings().removeClass('active');
			}
		});
	});

	////////////////////// GNB Open/Close //////////////////////
	$('.gnbOpen').click(function () {
		navShow();
		bodyScrollNo();
	});
	$('.gnbClose').click(function () {
		navHide();
		bodyScrollYes();
	});

	////////////////////// Main Motion Tween (ScrollMagic + GSAP) //////////////////////
	//////// init controller
	var controller = new ScrollMagic.Controller();

	//////// main
	// spark
	var tween = new TimelineMax({repeat: -1, repeatDelay: 1.5, yoyo: true})
							.to($('#main .titleSpark'), 0, {opacity: 0})
							.to($('#main .titleSpark'), 0.2, {opacity: 1, ease: RoughEase.ease})
							.to($('#main .titleSpark'), 0.6, {opacity: 0, ease: RoughEase.ease});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							//.addIndicators({name: "loop"})
							.addTo(controller);
	// neon
	var tween = new TimelineMax({repeat: -1, repeatDelay: 1.2, yoyo: true})
							.to($('#main .titleI'), 0, {opacity: 1})
							.to($('#main .titleI'), 0.8, {opacity: 0, ease: RoughEase.ease})
							.to($('#main .titleI'), 0.2, {opacity: 1, ease: RoughEase.ease});
	var scene = new ScrollMagic
							.Scene({triggerElement: "#main", duration: 1100, offset: 0})
							.setTween(tween)
							//.addIndicators({name: "loop"})
							.addTo(controller);

	//////// sub common tween
	function scrollTween() {
		TweenMax.set(".contentWrap, .scrollTween", {opacity: 0});
		$(".contentWrap, .scrollTween").each(function() {
			var offsetPos = $(this).position().top - 100;
			var triggerID = $(this).parents('section').attr("id");
			var tween = new TimelineMax()
									.to($(this), 1.3, {delay: 0, opacity: 1, ease: RoughEase.ease});
			var scene = new ScrollMagic
									.Scene({triggerElement: "#"+triggerID , offset: offsetPos})
									.setTween(tween)
									//.addIndicators({name: "timeline"})
									.addTo(controller);
		});
	};
	scrollTween();

	////////////////////// image resizing //////////////////////
	$(window).on('load resize', function() {
		var windowW = $(window).width();
		$('#main .titleSpark, #main .titleI').css({"width": windowW});
	});

	////////////////////// Slick Slide //////////////////////
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

	////////////////////// Modal layer popup //////////////////////
	// dom Create
	$("#webzineWrap").append("<div class='modalOverlay'></div>");
	// Modal layer popup
	$(".btnView").click(function () {
		var getPopupID = $(this).attr("name");
		$('#'+getPopupID).show().animate({opacity:"1"}, 600);
		$('.modalOverlay').show().animate({opacity:"0.7"}, 600);
		$(".photoSlide").slick('setPosition');
		bodyScrollNo();
	});
	$('.popupClose, .modalOverlay, .popupGuide img').click(function() {
		$('.popupWrap').hide().css("opacity", "0");
		$('.modalOverlay').hide().css("opacity", "0");
		bodyScrollYes();
	})

});