/*==========

Template Name: Beauty & Salon

==========*/

/*====================
----- JS INDEX -----
1.Whole Script Strict Mode Syntax
2.WOW Js 
3.SscrollToTop Js
4.Headewr Sticky Js
5.Toogle Menu Mobile Js
6.Start Clock Script Js
7.pagescroll Js
====================*/
jQuery(document).ready(function($) {
    // Whole Script Strict Mode Syntax
    "use strict";
    var window_size = jQuery(window).width();
    // WOW Js Start
    new WOW().init();
    // WOW Js End

    // SscrollToTop Start
    jQuery(window).on('scroll', function() {
        if (jQuery(this).scrollTop() > 100) {
            jQuery('#scrollToTop').fadeIn();
        } else {
            jQuery('#scrollToTop').fadeOut();
        }
    });


    jQuery('#scrollToTop').on('click', function() {
        jQuery("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    // ScrollToTop End

    // Headewr  Sticky Start
    jQuery(window).scroll(function() {
        var height = jQuery(window).scrollTop();
        if (height > 100) {
            jQuery(".site-header").addClass("sticky-header");
        } else {
            jQuery(".site-header").removeClass("sticky-header");
        }
    });
    // Headewr  Sticky End

    // Toogle Menu Mobile JS Start
    $(".menu-toggle").on('click', function() {
        $(".main-navigation").toggleClass("toggled");
    });

    if (window_size <= 991) {
        jQuery('.menu-item').on('click', function() {
            jQuery('#site-navigation').removeClass('toggled');
        });

        jQuery('#menu_quote').on('click', function() {
            jQuery('#site-navigation').removeClass('toggled');
        });
    }
    // Toogle Menu Mobile JS End

});

// Time
// START CLOCK SCRIPT

Number.prototype.pad = function(n) {
    for (var r = this.toString(); r.length < n; r = 0 + r);
    return r;
};

function updateClock() {
    var now = new Date();
    var milli = now.getMilliseconds(),
        sec = now.getSeconds(),
        min = now.getMinutes(),
        hou = now.getHours(),
        mo = now.getMonth(),
        dy = now.getDate(),
        yr = now.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var tags = ["mon", "d", "y", "h", "m", "s", "mi"],
        corr = [months[mo], dy, yr, hou.pad(2), min.pad(2), sec.pad(2), milli];
    for (var i = 0; i < tags.length; i++)
        document.getElementById(tags[i]).firstChild.nodeValue = corr[i];
}

function initClock() {
    updateClock();
    window.setInterval("updateClock()", 1);
}

// END CLOCK SCRIPT

// pagescroll

$(".menu.nav-menu li a").on('click', function(e) {
    e.preventDefault();
    var position = $($(this).attr("href")).offset().top;
    $("body, html").animate({
        scrollTop: position
    }, 1500);
});
$('[data-fancybox="preview"]').fancybox({
    thumbs: {
        autoStart: true
    }
});