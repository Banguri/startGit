$(document).ready(function() {
	window.addEventListener('load', function() {
		setTimeout(scrollTo, 0, 0, 1);
	}, false);
	var winWidth = $(window).width();
	var winHeight = $(window).height();
	if ($('#wrapcont').length > 0) {
		$('#wrapbox').css({"height": $(window).height() + "px"});
	}
	$(window).resize(function() {
		if ($('#wrapcont').length > 0) {
			$('#wrapbox').css({"height": $(window).height() + "px"});
		}
	});
	//Menu
	$('.topbox .menu').click(function() {
		$('.menubox').animate({"height": "100%"}, 300, 'easeOutQuad');
		$('.menumask').fadeIn(300);
	});
	$('.menubox .close').click(function() {
		$('.menubox').animate({"height": "0"}, 0, 'easeInOutCubic');
		$('.menumask').hide();
	});
	$('.menubox li a').on('click', function() {
		var mnIdx = $(this).parent().index() + 1;
		if (mnIdx == "2") {
			$(".lineupSlide").slick('setPosition');
			$(".lineupSlide2").slick('setPosition');
		}
		if (mnIdx == "3") {
			$(".flyBoardSlide").slick('setPosition');
		}
		if (mnIdx == "4") {
			$(".wildRiverSlide").slick('setPosition');
		}
	});
	$('.topbox ul li a').click(function(e) {
		e.preventDefault();
		var pass = $('#slidebox .slidesjs-pagination li');
		var nowNum = $(this).parent().index();
		setTimeout(function() {
			$(pass[nowNum]).find('a').click();
		}, 15);
		setTimeout(function() {
			$('.menubox').stop().animate({"height": "0"}, 0, 'easeInOutCubic');
		}, 0);
		$('.menumask').hide();
		$('.popbox').hide();
	});

	var myScroll;
	function loaded() { 
		myScroll = new iScroll('.zone', { mouseWheel: true }); 
	}

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

	//zoneCall
	var url = window.location;
	var param = String(url).split("?")[1];
	var category = String(param).split("=")[1];
	var callNum = Number(category);
	var startNum;
	if (callNum >= 1) {
		startNum = callNum + 1;
	} else {
		startNum = 1;
	}
	if ($('#wrapcont').length > 0) {
		$('#wrapcont #slidebox').slidesjs({
			start: startNum,
			callback: {
				loaded: function(number) {},
				start: function(number) {
					if (startNum == "1") {
						$(".flyBoardSlide").slick('setPosition');
						$(".wildRiverSlide").slick('setPosition');
						$(".lineupSlide").slick('setPosition');
						$(".lineupSlide2").slick('setPosition');
					}
				},
				complete: function(number) {
					if (startNum == "1") {
						myScroll1 = new iScroll('.zone', { mouseWheel: true });
					}
				}
			}
		});
	}
	// slick
	$(".flyBoardSlide").slick({
		autoplay: true,
		dots: true,
		fade: true,
		arrows: false,
		slidesToShow: 1,
		speed: 800,
	});
	$(".wildRiverSlide").slick({
		autoplay: true,
		dots: true,
		fade: true,
		arrows: false,
		slidesToShow: 1,
		speed: 800,
	});
	$(".lineupSlide").slick({
		centerMode: true,
		centerPadding: "0",
		infinite: false,
		slidesToShow: 1,
		speed: 800,
	});
	$(".lineupSlide2").slick({
		centerMode: true,
		centerPadding: "0",
		infinite: true,
		slidesToShow: 1,
		speed: 800,
	});
	$('.tab li a').on('click', function() {
		var tlIdx = $(this).parent().index() + 7;
		$('.tab li').removeClass('isActive');
		$(this).parent().addClass('isActive');
		$(this).parent().parent().parent().removeClass();
		$(this).parent().parent().parent().addClass('tabbox' + tlIdx);
		$('.monthWrap').hide();
		$('.monthWrap.month' + tlIdx).show();
		$(".lineupSlide").slick('setPosition');
		$(".lineupSlide2").slick('setPosition');
	});
});