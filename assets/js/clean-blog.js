// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function($) {
    var MQL = 1170;

    //primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $('.navbar-custom').height();
        $(window).on('scroll', {
                previousTop: 0
            },
            function() {
                var currentTop = $(window).scrollTop();
                //check if user is scrolling up
                if (currentTop < this.previousTop) {
                    //if scrolling up...
                    if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                        $('.navbar-custom').addClass('is-visible');
                    } else {
                        $('.navbar-custom').removeClass('is-visible is-fixed');
                    }
                } else if (currentTop > this.previousTop) {
                    //if scrolling down...
                    $('.navbar-custom').removeClass('is-visible');
                    if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                }
                this.previousTop = currentTop;
            });
    }
});
//Function to load plotly.js on demand and show a visualization
$(function(){
    $('.btn-hidden-viz').on('click', function() {
    var thebutton = $(this)
    var plotlyuid = $(this).data('plotlyUid');
    var plotlysrc = $(this).data('plotlySrc');
    var spinnerid = plotlyuid.concat('-spinner');
    var height = $(this).data('height');
    var width = $(this).data('width');
    $('<div id="'.concat(plotlyuid,'" class="plotly-graph-div"></div>')).insertBefore(thebutton);
    window.PlotlyConfig = {MathJaxConfig: 'local'};
    $.ajax({
      timeout: 10000,
      url: 'https://cdn.plot.ly/plotly-latest.min.js',
      dataType: 'script',
      cache: true, // or get new, fresh copy on every page load
      beforeSend: function () {
          console.log('here');
          thebutton.html('<span id=\"'.concat(spinnerid,'\"></span> Loading'));
          $('#'.concat(spinnerid)).attr("class","glyphicon glyphicon-refresh glyphicon-refresh-animate");
        },
      success: function() {
        // Callback
        window.PLOTLYENV=window.PLOTLYENV || {};
        $.ajax({
          url: plotlysrc,
          dataType: 'script',
          timeout: 5000,
          cache: true, // or get new, fresh copy on every page load
          success: function() {
            // Callback
            $("#".concat(plotlyuid)).attr("style","height:".concat(height,"; width:",width,";"));
            thebutton.remove();
          },
          error: function() {
              thebutton.html("error loading visualization");
          }
        });
      },
      error: function() {
         thebutton.html("error loading visualization");
      }
    });
    });})