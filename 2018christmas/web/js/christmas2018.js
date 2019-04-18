$(document).ready(function() {

	// fullpage.js
	$('#fullpage').fullpage({
		anchors: ['main', 'photospot', 'fireworks', 'performance', 'product'],
		menu: '#menu',
		slidesNavigation: true,
		slidesNavPosition: 'bottom',
		afterLoad: function(anchorLink, index) {
			if (index == index) {
				objMenuLineDefault();
				// init(anchorLink)
				// animate()
			}
		},
		// afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
		//	if (slideIndex == slideIndex) {
		//		init(slideAnchor)
		//		animate()
		//	}
		// },
		// onLeave: function(index, nextIndex, direction) {
		//	if (index == index) {
		//		$('.particleWrap > canvas').remove()
		//	}
		// },
		// onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {
		//	if (slideIndex == slideIndex) {
		//		$('.particleWrap > canvas').remove()
		//	}
		// },
	});

	// parallax.js 
	$('.scene').each( function() {
		var sceneId = $(this).attr('id');
		var scene = $('#'+sceneId).get(0);
		var parallaxInstance = new Parallax(scene);
	});

	// fp slide Default
	// function fpSlideDefault() {
	//	$('.fp-slidesContainer').css({'transform':'translate3d(0px, 0px, 0px)'});
	//	$('.fp-slidesNav').find('a').removeClass('active');
	//	$('.fp-slidesNav li:first-child').find('a').addClass('active');
	// }

	// GNB line Default
	function objMenuLineDefault() {
		var xPosActive = $('.depth1>li.active').find('span').position().left,
				lineWidActive = $('.depth1>li.active').find('span').width();
		$('#menuLine').css({'left':xPosActive+'px', 'width':lineWidActive+'px'});
	}

	// navigation
	objMenuLineDefault();
	$('#header').delegate('.topWrap', 'mouseenter mouseleave', function (event) {
		var $this = $(this);
		switch (event.type) {
			// 메뉴 펼침
			case 'mouseenter' :
				$this.clearQueue().animate({height:'330px'},200);
			break;
			// 메뉴 닫힘
			case 'mouseleave' :
				$this.animate({height:'87px'},200);
				objMenuLineDefault();
			break;
		}
	});
	$('.depth1 li').delegate('>a', 'mouseenter mouseleave', function (event) {
		var xPos = $(this).find('>span').position().left,
				lineWid = $(this).find('>span').width();
		switch (event.type) {
			case 'mouseenter' :
				$('#menuLine').css({'left':xPos+'px', 'width':lineWid+'px', 'background-color':'#ffdf1d'});
			break;
			case 'mouseleave' :
				$('#menuLine').css({'background-color':'#e1e6ea'});
			break;
		}
	});
	$('.depth2').delegate('li', 'mouseenter', function (event) {
		var xPos = $(this).parent().parent().find('>a>span').position().left,
				lineWid = $(this).parent().parent().find('>a>span').width();
		switch (event.type) {
			case 'mouseenter' :
				$('#menuLine').css({'left':xPos+'px', 'width':lineWid+'px', 'background-color':'#e1e6ea'});
			break;
		}
	});

	// Modal layer popup
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
	})

	// Slick Slide
	$(".photoSlide").slick({
		dots: true,
		arrows: false,
		slidesToShow: 1,
		speed: 600
	});
	
	// bgmControl
	$('.bgmControl button').on('click', function() {
		var bgm = document.getElementById("bgm");
		$(this).toggleClass('isPlay');
		if ($(this).is(".isPlay")) {
			bgm.play();
			$('.bgmOn').show();
			$('.bgmOff').hide();
			$(this).find('span.hidden').html('배경음악 끄기');
		} else {
			bgm.pause();
			$('.bgmOn').hide();
			$('.bgmOff').show();
			$(this).find('span.hidden').html('배경음악 켜기');
		}
	});

	// bgmEqualizer
	var bgmBar1Heights = [2.5, 5.625, 7.125, 10, 8, 4, 8.25, 5.625, 8, 2.875, 8.25, 1.625, 8, 7, 4.25, 4.25, 0.25, 2.875, 9.5, 9.875, 2.5];
	var bgmBar1Timeline = new TimelineMax({ repeat: -1 });
	var bgmBar2Heights = [10, 6.875, 4.125, 0.625, 9.375, 2.875, 9.125, 4.125, 1.5, 1.75, 7.5, 10];
	var bgmBar2Timeline = new TimelineMax({ repeat: -1 });
	var bgmBar3Heights = [6.25, 4.25, 9.75, 2.875, 7, 2.875, 4.25, 9.5, 10, 6.75, 2.625, 6.25];
	var bgmBar3Timeline = new TimelineMax({ repeat: -1 });
	var bgmBar4Heights = [3.75, 5.625, 1.625, 10, 7, 9, 5.625, 9.5, 4.25, 2.875, 8.375, 3.75];
	var bgmBar4Timeline = new TimelineMax({ repeat: -1 });
	function tlArrayStep(element, timeline, duration, array) {
		for (var i = 0, length = array.length; i < length; i++) {
			timeline.to(element, duration, { height: array[i] });
		}
	}
	tlArrayStep('.bgmOn i:nth-child(1)', bgmBar1Timeline, 4.3 / bgmBar1Heights.length, bgmBar1Heights);
	tlArrayStep('.bgmOn i:nth-child(2)', bgmBar2Timeline, 2 / bgmBar2Heights.length, bgmBar2Heights);
	tlArrayStep('.bgmOn i:nth-child(3)', bgmBar3Timeline, 1.4 / bgmBar3Heights.length, bgmBar3Heights);
	tlArrayStep('.bgmOn i:nth-child(4)', bgmBar4Timeline, 2 / bgmBar4Heights.length, bgmBar4Heights);

	// main light
	TweenMax.to($('.mainLight'), 1.6, {opacity:0.2, ease:Elastic.ease, repeat:-1, repeatDelay:0, yoyo:true});

});