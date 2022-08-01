$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });
  // scroll body to 0px on click
  $("#back-to-top").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      400
    );
    return false;
  });
});

new WOW().init();

// $('#homeSlider').owlCarousel({
// 	loop:true,
// 	dots:false,
// 	nav:false,
// 	autoplay:true,
// 	autoplayTimeout:4500,
//     smartSpeed: 500,
// 	autoplayHoverPause: false,
// 	responsive:{
// 		0:{
// 			items:1
// 		},
// 		600:{
// 			items:1
// 		},
// 		1000:{
// 			items:1
// 		}
// 	}
// })

$("#testimonialSlider").owlCarousel({
  loop: true,
  dots: true,
  nav: false,
  autoplay: false,
  autoplayTimeout: 3000,
  autoplayHoverPause: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
    1000: {
      items: 1,
    },
  },
});
