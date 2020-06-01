/*
 *----------------------------------------------------------------------
 * Functions
 *----------------------------------------------------------------------
 */

/**
 * [removeModal to remove the Modal View]
 */
function removeModal () {
  "use strict";
  $('.rex-modal').removeClass('rex-show').remove();
  $('.rex-overlay').remove();
}

/**
 * Default Sticky Header
 */
function rexSticky () {
  "use strict";

  // Activate Sticky Header
  $("#rex-sticky").sticky({
    topSpacing: 0,
    responsiveWidth: true,
    wrapperClassName: 'rex-sticky-wrapper'
  });
  // Animate and change style after Sticky start
  $('#rex-sticky').on('sticky-start', function() {

    var logo = $(this).find('.rex-brand-logo img');
    //check the images data attribute, if exist then change the logo for stiky header.
    if ( logo.data('sticky-img') !== undefined && logo.data('sticky-img') !== "" ) {
      logo.attr('src', logo.data('sticky-img'));
    }

    $(this)
      .hide()
      .css({
        'width': '100%',
        'margin-top': '0'
      });
      if ($('div#rex-navbar').hasClass('open')) {
        $(this).show();
      }else{
        $(this).slideDown();
      }

  });
  // Back to Previous State after sticky end.
  $('#rex-sticky').on('sticky-end', function() {
    $(this).find('img').attr('src', 'images/logo.png');
    $(this).css('margin-top', '30px');
  });
  // Return to preserve the Chain
  return $('#rex-sticky');
}
/**
 * Only Sticky Header
 */
function rexOnlySticky () {
  "use strict";
  $('header#rex-home').css('position', 'relative');
  var $stickyDiv = $('div.sticky-header');
  var logo = $stickyDiv.find('.rex-brand-logo img');
  //check the images data attribute, if exist then change the logo for stiky header.
  if ( logo.data('sticky-img') !== undefined && logo.data('sticky-img') !== "" ) {
    logo.attr('src', logo.data('sticky-img'));
  }
  $stickyDiv.wrap( "<div class='rex-sticky-wrapper is-sticky'></div>" );
}

/**
 * Function for re arranging Heading for the featured portfolio.
 * @param  {[jquery object]} obj [description]
 */
function moveH (obj) {
  "use strict";
  var h3 = obj.find('h3.rex-portfolio-name');
  var h4 = obj.find('h4.rex-portfolio-category');
  var hr = h3.next('hr');

  h3.insertAfter(hr);
  h4.insertBefore(hr);

  return obj;
}

// jQuery Wrapper
(function($) {
  "use strict";

  // DOM Content Load Event Actions;
  $( window ).load(function() {
    $('div.loading').remove();
    $('body').removeClass('loading');
  });

  /*
   *----------------------------------------------------------------------
   * Document Ready
   *----------------------------------------------------------------------
   */
  $(document).ready(function() {

    /**
     * Off Canvas Navigation
     */
    // Trigger menu
    $('.trigger-nav').on('click', function() {
      $('div#rex-navbar').toggleClass('open');
    });
    // Close Menu
    $('.overlay-close').on('click', function() {
      $('div#rex-navbar').removeClass('open');
    });

    /**
     * Sticky Header
     */   
    var $header = $('header');

    if ( $header.hasClass('rex-only-sticky') || $( window ).width() < 768 ) {
      rexOnlySticky();
    }else if( $('section.slider').hasClass('rex-show-parallax-image')  && ! $header.hasClass('rex-only-sticky') ){

      $("#rex-sticky").css('visibility', 'hidden');

      var stickyPoint = new Waypoint({
        element : $('section.slider'),
        handler : function ( direction ) {
          if ( direction == 'down') {
            rexSticky().css('visibility', 'visible');
          }else{
            $("#rex-sticky").unstick().css('visibility', 'hidden');
          }
        },
        offset: -1000
      });

    }else if ( ! $header.hasClass('rex-no-sticky') ) {
      rexSticky();
    } // end if

    // Adjust Sticky header on resize
    $( window ).on( 'resize', function() {
      if( $( window ).width() < 768 ){
        rexOnlySticky();
      }
    });

    /**
     * Parallax Background
     */

    var $parallaxDiv = $('.rex-parallax-image');

    if( $('section.slider').hasClass('rex-show-parallax-image') ){

      if ( $parallaxDiv.data('image-src') !== "" && $parallaxDiv.data('image-src') !== undefined ) {
         $parallaxDiv.css('background-image',  'url('+ $parallaxDiv.data('image-src') +')');
      }

      $parallaxDiv.stellar({
        // Enable parallax
        parallaxBackgrounds: true
      });
      
      // Adjust Parallax Background size on larger device
      if ( $(window).width() > 1900 ) {
        $parallaxDiv.css('background-size', 'cover');
      }

    }

    /**
     * Activate Bacground Video
     */
    if( $('section.slider').hasClass('rex-show-bg-video') ){
      $("#rex-bg-video").vide(
        "video/video", // Video Path
        {
          posterType: "jpg",
          loop: true,
          autoplay: true
        }
      );
    }

    /**
     * Activate ScroolUp
     */
    $.scrollUp({
      scrollName: 'rex-scrollUp',
      scrollDistance: 1000,
      scrollSpeed: 1500, // Speed back to top (ms)
      scrollText: '<i class="fa fa-chevron-up"></i>'
    });

    // if( $('body').hasClass('single') ){
    //   $('div.sticky-wrapper').css('height', '0');
    // }

    // Initialize WOW.Js only for large screen
    if ($( window ).width() >= 768) {
      var wow = new WOW();
      wow.init();
      wow.sync();
    }

    // Redirect to appropriate anchor on click at blog post container
    $("#rex-blog").on('click', 'div.rex-post', function() {
      window.location = $(this).find('a.rex-post-url').attr('href');
    });

    // Feature Carousel
    $("#rex-feature-carousel").owlCarousel({
      items : 3,
      navigation : true,
      itemsDesktop : [1199,3],
      itemsDesktopSmall : [980,2],
      itemsTablet: [768,1],
      itemsTabletSmall: false,
      itemsMobile : [479,1],
      autoPlay: true,
      navigationText : ["<i class=\"fa fa-chevron-left\"></i>","<i class=\"fa fa-chevron-right\"></i>"]
    });

    // Header Image Carousel
    $("#rex-slider").owlCarousel({
      singleItem: true,
      navigation: true,
      autoPlay: true,
      navigationText: ["", ""]
    });

    // Client Logo Carousel
    $("#rex-client-carousel").owlCarousel({
      items: 4,
      autoPlay: true
    });
    // Testimonial Carousel
    $("#rex-testimonial-container").owlCarousel({
      items: 1,
      singleItem: true,
      autoPlay: true
    });
    
    // Rearrange heading of Inro portfolio
    moveH($('#portfolio-intro'));

    // Activate Portfolio Filtering
    var portfolios      = $('#rex-portfolios');
    var figures         = portfolios.find('figure');
    var filters         = $('div.portfolio-filter');
    var first_portfolio = "";

    figures.find('figcaption').addClass('animated');
    filters.find('div').first().addClass('active');
    
    filters.on('click', 'div.filter', function() {
      // remove all animation properties
      figures.removeAttr('style data-wow-delay').removeClass('animated fadeIn fadeInUp');
      $('#portfolio-intro').removeAttr('style data-wow-delay').removeClass('animated fadeIn fadeInUp');

      filters.find('.active').removeClass('active');
      $(this).addClass('active');

      var currentFilter = $(this).data('filter');

      if (currentFilter == "all") {
        figures.hide();
        $('#portfolio-intro').show().addClass('animated fadeIn');
        $('.dom-featured').remove();
        figures.show().addClass('animated fadeInUp');
      }else{
        figures.hide();
        var i = 0;
        $('.dom-featured').remove();
        $('#portfolio-intro').hide();
        $.each(figures, function(index, val) {
          if ($(val).hasClass(currentFilter)) {
            if (i === 0) {
              first_portfolio = val;
              i++;
              return;
            }
            $(val).show().addClass('animated fadeInUp');
          }
        });
        
        //Show the first item as featured
        var restult = $(first_portfolio).clone();
        restult
          .removeClass('col-lg-4 col-sm-6 rex-portfolio-item animated fadeInUp')
          .addClass('row rex-featured-portfolio dom-featured animated fadeIn')
          .insertBefore( '#rex-portfolios' );

        moveH(restult)
          .show()
          .closest('figure.rex-featured-portfolio.dom-featured')
            .find('img')
            .addClass('col-md-6')
            .next('figcaption').removeClass('animated zoomIn').addClass('col-md-6').show();

      }
    }); // end click

    // Disable Portfolio Hover Effect for Touch Devices;
    if (Modernizr.touch){
      $.each($('#rex-portfolios figure'), function() {
        $(this).find('figcaption').hide();
        $(this).find('figcaption img').css('transform', 'none');
      });
      $('div.owl-buttons').hide();
    } 
    /**
     * Portfolio Modal
     */
    $("#rex-portfolios").on('click', 'figure.rex-portfolio-item', function(event) {
      event.preventDefault();

      var img = $(this).find('img').attr('src');
      var caption = $(this).find('figcaption').html();

      var modal = "";
      modal +='<figure class="rex-modal animated fadeIn rex-effect-1" id="modal-1">';
        modal +='<div class="rex-content">';

          modal += '<img class="img-responsive col-md-6" src="'+img+'">';
          modal += '<figcaption class="col-md-6 rex-modal-figcaption">'+caption+'</figcaption>';


          modal +='<button onclick="removeModal()" class="rex-close-modal"><i class="fa fa-times"></i></button>';
        modal +='</div>';
      modal +='</figure>';
      modal +='<div class="rex-overlay"></div>';

      // $('#rex-work').prepend(modal);
      $(modal).insertAfter('#portfolio-intro');
      $('.rex-modal').toggleClass('rex-show');
    });

    // Modal Hide on outside click.
    $('body').on( 'click', function() {

      // Hide the Portfolio Pop-UP on Outside click;
      $('div.rex-overlay').on('click', function() {
        if ($('figure.rex-modal').length) {
          $('.rex-modal').removeClass('rex-show').remove();
          $('.rex-overlay').remove();
        }
      });

    });

    /**
     * Modify navigation href on single pages
     */
    
    if( $('body').hasClass('single') ) {
      var $links = $("#rex-navbar nav li a");
      $links.each(function () {
        var currentHref = $(this).attr("href");
        $(this).attr("href", "./" + currentHref);
      });
    }

    /**
     * Smooth Scrooling Effect
     */
    $('a[href*=#]:not([href=#])').on('click', function() {
      // Return if it's a Tab Panel
      if ( $(this).closest('ul').hasClass('nav-tabs') ) {return;}
      // Add/Remove active class
      $(this).closest('ul').find('.active').removeClass('active');
      $(this).closest('li').addClass('active');

      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 1000);
          setTimeout(function(){
            $('div.rex-navbar').removeClass('open');
          }, 120);
          return false;
        }
      }
    });

    // Hover Effect for Team Section
    $('.rex-team figure').on({
      mouseenter: function() {
        $(this)
          .find('div.hover-card')
          .addClass('animated bounceInDown')
          .css({
            'top': '0',
            'display': 'block',
            'z-index': 99999999
          });
      },

      mouseleave: function() {
        $(this)
        .find('div.hover-card')
        .css({
          'display': 'none',
          'z-index': 1
        });
      }
    });

    // Activate Rex Service Tab
    $('.rex-service-tabs').tabslet({
      animation: true
    });
    // Change Image Based on Selected Tab.
    $('.rex-service-tabs').on("_after", function() {
      var seleced_tabid = $(this).find('li.active').find('a').attr('href').replace('#', '');
      // var tabpanel      = $(this).find('.tab-pane');
      var imgs          = $('.rex-service-image').find('img');

      // Show Appropriate Image for Seleted Tab.
      $.each(imgs, function(index, val) {
        if ( $(val).data('id') == seleced_tabid ) {
          $(val).show().addClass('animated fadeInLeft');
         }
      });
    });

    $('.rex-service-tabs').on("_before", function() {
      $('.rex-service-image').find('img').removeClass('animated fadeInLeft').fadeOut('slow');
    });

    $('.rex-service-image img:first-child').fadeIn();
    $('.rex-service-tabs').find('.tab-pane').attr('data-wow-duration', '2s').addClass('animated fadeInRight');

    // Hover/Focus Effect for Form
    $('input, textarea').on('focus', function() {
      $(this).closest('div.form-group').css('border-color', '#000');
      $(this).css('border-color', '#000');
    });
    $('input, textarea').on('blur', function() {
      $(this).closest('div.form-group').css('border-color', '#e0e0e0');
      $(this).css('border-color', '#e0e0e0');
    });

    // Waypoint Animation of Skills Section
    if ( $('#rex-skills').length !== false ) {
      var skillSection = new Waypoint({
        element: $('#rex-skills'),
        handler: function() {
          $(".rex-progress-container > .rex-progress").each(function() {
            $(this)
              .animate({
                width: $(this).parent('div').data("skill"), // or + "%" if fluid
              }, 1000);
          });
          this.destroy();
        },
        offset: 400
      });
    }

  });// DOM Ready
}(jQuery));