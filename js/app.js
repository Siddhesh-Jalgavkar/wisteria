$(document).ready(function(){
		var d = new Date();
		$('.copyrightYear').html(d.getFullYear());

		var winHT = $(window).height();
		var winWD = $(window).width();
		var navHt = $("header").outerHeight();
		// var bannerHt = winHT - navHt;
		var bannerHt = winHT;
		isFloorplan = 0;
		isBrochure = 0;

		$('.banner_ht').css('height', bannerHt);
		// $('.section-first').css('margin-top', navHt)

		$(".goto-home").on("click", function(){
			$("html,body").animate({
				scrollTop : 0
			}, 1000);
		});

		$(".scroll-next").click(function() {
			var cls = $(this).closest("section").next().offset().top - 50;
			$("html, body").animate({scrollTop: cls}, 1000);
		});

		

		if (winWD > 992) {
			$(".enq_click, .frmclose").click(function() {
				if ($(".form-container").is(':visible')) {
					$(".form-container").slideUp();
				} else {
					$(".form-container").slideToggle();
				}
				$(".form-container, .frmclose").toggleClass("show");
			});

		}

		$(".menu-icon-mobile").on("click", function(){
			$(".nav-links").slideToggle();
			$(".menu-icon-mobile").toggleClass("active");
		});
		
		if(winWD <= 992){
			$(".nav-links a").on("click", function(){
				$(".menu-icon-mobile").trigger("click");
			})

			$(".mob_enq_click, .frmclose").on("click" , function(){
				isBrochure = 0;
				isFloorplan = 0;
				$(".form-container").toggleClass("show");
			});
		}


		var childrenSelector = $(".nav-links a");
		var aChildren = $(".nav-links a"); // find the a children of the list items
		if(winWD <= 700)
			var gap = 55;// $(".header-wrapper").outerHeight(); //Navigation height
		else
			var gap = 100;
		var aArray = []; // create the empty aArray
		for (var i=0; i < childrenSelector.length; i++) {    
			var aChild = aChildren[i];
			if (!$(aChild).hasClass('extLink')) {
				if ($(aChild).attr('rel')) {
					var ahref = $(aChild).attr('rel');
					aArray.push(ahref);
				}
			}
		}
		
		//On Scroll - Add class active to active tab
		$(window).scroll(function(){
			var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
			var windowHeight = $(window).height(); // get the height of the window
			var docHeight = $(document).height();
			for(i=0;i<aArray.length;i++){
				var theID = aArray[i];
				var divPos = $("#"+theID).offset().top; // get the offset of the div from the top of page
				var divHeight = $("#"+theID).outerHeight(); // get the height of the div in question
				if (windowPos >= (divPos - gap) && windowPos < ((divPos - gap) + divHeight)) {
					if (!$("a[rel='" + theID + "']").hasClass("active"))
					{
           	// ga('set', 'page', '/'+theID);
           	// ga('send', 'pageview');
           	$("a[rel='" + theID + "']").addClass("active"); 
          }
	      } 
	      else 
	      {
	       	$("a[rel='" + theID + "']").removeClass("active");
	      }
	   	}	

			//If document has scrolled to the end. Add active class to the last navigation menu
			if(windowPos + windowHeight == docHeight) {
				if (!$(".nav-links a:not(.extLink):last-child").hasClass("active")) {
					var navActiveCurrent = $(".active").attr("rel");
					$("a[rel='" + navActiveCurrent + "']").removeClass("active");
					$(".nav-links a:not(.extLink):last-child").addClass("active");
				}
			}
		});
		
		//On Click
		$('.nav-links a').on("click", function(){
			if(!$(this).hasClass('extLink')) {
				var href = $(this).attr("rel");
				if(winWD <= 700)
					var gap = 45; // $(".header-wrapper").outerHeight(); //Navigation height
				else
					var gap = 96;
				
				$('html,body').animate({
					scrollTop: $("#"+href).offset().top - gap
				}, 1000);
			}
		});

		// -------------sliders--------------------
		$('.spec-slider').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: ".spec-slider2",
			// speed: 1000,
			autoplayspeed: 1000,
		  });

		$('.spec-slider2').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			asNavFor: ".spec-slider",
			// speed: 1000,
			prevArrow: '.prev-arrow',
			nextArrow: '.next-arrow',
			arrows: true,
			autoplay: true,
			autoplayspeed: 1000,
		  });

		  var $statusGal71 = $('.spec-slide-no');
			var $slickElement71 = $('.spec-slider2');
			$slickElement71.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    		var j = (currentSlide ? currentSlide : 0) + 1;
   			$statusGal71.html(j + '<span></span>' + slick.slideCount);
			});

		  $('.amenities-slider').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			prevArrow: '.amn-prev-arrow',
			nextArrow: '.amn-next-arrow',
			centerPadding: '160px',
			centerMode: true,
			// speed:900,
			autoplay: true,
			autoplaySpeed: 1000,
			centerPadding: '40px',
			responsive: [
				// {
				//   breakpoint: 1024,
				//   settings: {
				// 	slidesToShow: 3,
				// 	slidesToScroll: 3,
				// 	infinite: true,
				// 	dots: true
				//   }
				// },
				{
				  breakpoint: 992,
				  settings: {
					slidesToShow: 3,
					// slidesToScroll: 2
				  }
				},
				{
				  breakpoint: 640,
				  settings: {
					slidesToShow: 1,
					// slidesToScroll: 1
				  }
				}
				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			  ]
		  });

		  $('.amenities-slider')
		  .on('afterChange init', function(event, slick, direction){
    		// remove all prev/next
    		slick.$slides.removeClass('prevdiv').removeClass('nextdiv');
 
    		// find current slide
    		for (var i = 0; i < slick.$slides.length; i++)
    		{
        	var $slide = $(slick.$slides[i]);
        	if ($slide.hasClass('slick-current')) {
            // update DOM siblings
            $slide.prev().addClass('prevdiv');
            $slide.next().addClass('nextdiv');
            break;
        }
    }
  }
)
.on('beforeChange', function(event, slick) {
    // optional, but cleaner maybe
    // remove all prev/next
    slick.$slides.removeClass('prevdiv').removeClass('nextdiv');
})

		  var $statusGal72 = $('.amn-spec-slide-no');
			var $slickElement72 = $('.amenities-slider');
			$slickElement72.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
    		var j = (currentSlide ? currentSlide : 0) + 1;
   			$statusGal72.html(j + '<span></span>' + slick.slideCount);
			});

			// -------------------------------locations-slider-------------------------------

			$('.locations-slider').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed:1000,
				prevArrow: '.loc-prev-arrow',
				nextArrow: '.loc-next-arrow',
			  });

			// --------------------------------spec-list-slider--------------------------------

			$('.spec-list-slider').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed:1000,
				prevArrow: '.spec-prev-arrow',
				nextArrow: '.spec-next-arrow',
				arrows: true,
				asNavFor: ".spec-list-slider2",
			  });

			// --------------------------------spec-list-slider2--------------------------------

			$('.spec-list-slider2').slick({
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				autoplay: true,
				autoplaySpeed:1000,
				asNavFor: ".spec-list-slider",
			  });

			// --------------progress bar-----------------

			$(document).ready(function() {
				var $slider = $('.spec-list-slider');
				var $progressBar = $('.progress');
				var $progressBarLabel = $( '.slider__label' );
				
				$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
				  var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;
				  
				  $progressBar
					.css('background-size', calc + '% 100%')
					.attr('aria-valuenow', calc );
				});

		  	
	});

	$(window).scroll(function(){
		$(".lazy").each(function(){
			if($(this).attr("data-src")){
				(this.tagName == "IMG" || this.tagName == "IFRAME") ? $(this).attr("src", $(this).data("src")) : $(this).css("background-image", "url("+$(this).data("src")+")");
				$(this).removeAttr("data-src");
			}
		});
		var windscroll = $(window).scrollTop();
		if (windscroll >= 50) {
			$("header").addClass("active");
		}
		else{
			$("header").removeClass("active");
		}

		// TOP NAV ANIMATION ----------------------------------------s------------
	if (windscroll >= 50) {

		$("header").addClass("active");
		$("#comp-logo .brand-logo").addClass("compress-logo")
		$(".nav-links").removeClass("set-transform");

	}
	else{
		$("header").removeClass("active");
		$("#comp-logo .brand-logo").removeClass("compress-logo")
		$(".nav-links").addClass("set-transform");
	}

	
	})
})