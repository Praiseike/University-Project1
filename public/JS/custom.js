
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', '../../../../www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-120909275-1', 'auto');
ga('send', 'pageview');

$("body").on("contextmenu", function (e) {
  return false;
});
$(document).keydown(function (e) {
  if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {
    return false;
  }
  if (e.which === 123) {
    return false;
  }
  if (e.metaKey) {
    return false;
  }
  //document.onkeydown = function(e) {
  // "I" key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
    return false;
  }
  // "J" key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
    return false;
  }
  // "S" key + macOS
  if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    return false;
  }
  if (e.keyCode == 224 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
    return false;
  }
  // "U" key
  if (e.ctrlKey && e.keyCode == 85) {
    return false;
  }
  // "F12" key
  if (event.keyCode == 123) {
    return false;
  }
});
(function ($) {
  "use strict"; // Start of use strict

  // Toggle the side navigation
  $(document).on('click', '#sidebarToggle', function (e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function (e) {
    if ($window.width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Category Owl Carousel
  const objowlcarousel = $('.owl-carousel-category');
  if (objowlcarousel.length > 0) {
    objowlcarousel.owlCarousel({
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 3,
          nav: false
        },
        1000: {
          items: 4,
        },
        1200: {
          items: 8,
        },
      },
      loop: true,
      lazyLoad: true,
      autoplay: true,
      autoplaySpeed: 1000,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
      nav: true,
      navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    });
  }

  // Login Owl Carousel
  const mainslider = $('.owl-carousel-login');
  if (mainslider.length > 0) {
    mainslider.owlCarousel({
      items: 1,
      lazyLoad: true,
      loop: true,
      autoplay: true,
      autoplaySpeed: 1000,
      autoplayTimeout: 2000,
      autoplayHoverPause: true,
    });
  }


  // Tooltip
  $('[data-toggle="tooltip"]').tooltip()

  // Scroll to top button appear
  $(document).on('scroll', function () {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

})(jQuery); // End of use strict
