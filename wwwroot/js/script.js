$(window).on("load", function() {
    "use strict";

    //  ============= ADD TOOLTIP =============

    $('[data-toggle="tooltip"]').tooltip();
    // $('#signup-username').tooltip('disable');
    // $('#signup-email').tooltip('disable');
    // $('#signup-phone').tooltip('disable');


    //  ============= POST PROJECT POPUP FUNCTION =========

    $(".post_project").on("click", function(){
        $(".post-popup.pst-pj").addClass("active");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".post-project > a").on("click", function(){
        $(".post-popup.pst-pj").removeClass("active");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= POST JOB POPUP FUNCTION =========

    $(".post-jb").on("click", function(){
        $(".post-popup.job_post").addClass("active");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".post-project > a").on("click", function(){
        $(".post-popup.job_post").removeClass("active");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= SIGNIN CONTROL FUNCTION =========

    $('.sign-control li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.sign-control li').removeClass('current');
        $('.sign_in_sec').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });

    //  ============= SIGNIN TAB FUNCTIONALITY =========

    $('.signup-tab ul li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.signup-tab ul li').removeClass('current');
        $('.dff-tab').removeClass('current');
        $(this).addClass('current animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });

    //  ============= SIGNIN SWITCH TAB FUNCTIONALITY =========

    $('.tab-feed ul li').on("click", function(){
        var tab_id = $(this).attr('data-tab');
        $('.tab-feed ul li').removeClass('active');
        $('.product-feed-tab').removeClass('current');
        $(this).addClass('active animated fadeIn');
        $("#"+tab_id).addClass('current animated fadeIn');
        return false;
    });

    //  ============= COVER GAP FUNCTION =========

    var gap = $(".container").offset().left;
    $(".cover-sec > a, .chatbox-list").css({
        "right": gap
    });

    //  ============= OVERVIEW EDIT FUNCTION =========

    $(".overview-open").on("click", function(){
        $("#overview-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#overview-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= EXPERIENCE EDIT FUNCTION =========

    $(".exp-bx-open").on("click", function(){
        $("#experience-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#experience-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= EDUCATION EDIT FUNCTION =========

    $(".ed-box-open").on("click", function(){
        $("#education-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#education-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= LOCATION EDIT FUNCTION =========

    $(".lct-box-open").on("click", function(){
        $("#location-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#location-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= SKILLS EDIT FUNCTION =========

    $(".skills-open").on("click", function(){
        $("#skills-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#skills-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= ESTABLISH EDIT FUNCTION =========

    $(".esp-bx-open").on("click", function(){
        $("#establish-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#establish-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= CREATE PORTFOLIO FUNCTION =========

    $(".portfolio-btn > a").on("click", function(){
        $("#create-portfolio").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#create-portfolio").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  ============= EMPLOYEE EDIT FUNCTION =========

    $(".emp-open").on("click", function(){
        $("#total-employes").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#total-employes").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });

    //  =============== Ask a Question Popup ============

    $(".ask-question").on("click", function(){
        $("#question-box").addClass("open");
        $(".wrapper").addClass("overlay");
        return false;
    });
    $(".close-box").on("click", function(){
        $("#question-box").removeClass("open");
        $(".wrapper").removeClass("overlay");
        return false;
    });


    //  ============== ChatBox ============== 


    $(".chat-mg").on("click", function(){
        $(this).next(".conversation-box").toggleClass("active");
        return false;
    });
    $(".close-chat").on("click", function(){
        $(".conversation-box").removeClass("active");
        return false;
    });

    //  ================== Edit Options Function =================


    $(".ed-opts-open").on("click", function(){
        $(this).next(".ed-options").toggleClass("active");
        return false;
    });


    // ============== Menu Script =============

    $(".menu-btn > a").on("click", function(){
        $("nav").toggleClass("active");
        return false;
    });


    //  ============ Notifications Open =============

    $(".not-box-open").on("click", function(){$("#message").hide();
        $(".user-account-settingss").hide();
        $(this).next("#notification").toggle();
    });

     //  ============ Messages Open =============

    $(".not-box-openm").on("click", function(){$("#notification").hide();
        $(".user-account-settingss").hide();
        $(this).next("#message").toggle();
    });


    // ============= User Account Setting Open ===========
	/*
$(".user-info").on("click", function(){$("#users").hide();
        $(".user-account-settingss").hide();
        $(this).next("#notification").toggle();
    });
    
	*/
	$( ".user-info" ).click(function() {
  $( ".user-account-settingss" ).slideToggle( "fast");
	  $("#message").not($(this).next("#message")).slideUp();
	  $("#notification").not($(this).next("#notification")).slideUp();
    // Animation complete.
  });
 

    //  ============= FORUM LINKS MOBILE MENU FUNCTION =========

    $(".forum-links-btn > a").on("click", function(){
        $(".forum-links").toggleClass("active");
        return false;
    });
    $("html").on("click", function(){
        $(".forum-links").removeClass("active");
    });
    $(".forum-links-btn > a, .forum-links").on("click", function(){
        e.stopPropagation();
    });

    //  ============= PORTFOLIO SLIDER FUNCTION =========

    $('.profiles-slider').slick({
        slidesToShow: 3,
        slck:true,
        slidesToScroll: 1,
        prevArrow:'<span class="slick-previous"></span>',
        nextArrow:'<span class="slick-nexti"></span>',
        autoplay: true,
        dots: false,
        autoplaySpeed: 2000,
        responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]


    });

    
    //  ============= JS CHECK IF THE TWO PASSWORD FIELD MATCH =========

    $("#signup-password, #signup-repeat-password").on("input", function() {
        var pass1 = $("#signup-password").val();
        var pass2 = $("#signup-repeat-password").val();

        // check
        if (pass1 == pass2) {
            // normal border
            $("#signup-password, #signup-repeat-password").css({
                "border": "1px solid #e5e5e5"
            });
       
        } else {
            $("#signup-password, #signup-repeat-password").css({
                "border": "1px solid red"
            });
        }

    });

    //  ============= JS CHECK IF PHONE STARTS WITH ZERO AND CHANGE TO ETHIOPIAN COUNTRY CODE =========
    //  ============= FOR THE FUTURE WILL CHANGE BASED ON THEIR LOCATION  =============

    $("#signup-phone").on("input", function() {
        var phone = $("#signup-phone").val();

        // if the first number is 0
        if (phone.startsWith('0')) {
            $("#signup-phone").val(
                "+251" + phone.substring(1)
            );
        }


    });

     //  ============= JS CHECK IF USERNAME EXISTS =============

     $("#signup-username").on("input", function() {

        var username = $("#signup-username").val();

        $.ajax({
            url: "/api/Signup/checkUsername/" + username,
            type: "GET",
            success: function(res) {

                // if username is not avalible
                if (res) {
                    $("#signup-username").css({
                        "border": "1px solid red"
                    });

                    $("#signup-username").tooltip('hide')
                                        .attr('data-original-title', 'Username not avalible')
                                        .tooltip('show');
                } else { // if username is avalible
                    $("#signup-username").css({
                        "border": "1px solid #e5e5e5"
                    });

                    $("#signup-username").tooltip('hide')
                                        .attr('data-original-title', 'Username avalible')
                                        .tooltip('show');
                }
            }
        });

     });

    
     //  ============= JS CHECK IF EMAIL EXISTS =============

     $("#signup-email").on("input", function() {

        var email = $("#signup-email").val();

        $.ajax({
            url: "/api/Signup/checkEmail/" + email,
            type: "GET",
            success: function(res) {

                // if email is not avalible
                if (res) {
                    $("#signup-email").css({
                        "border": "1px solid red"
                    });

                    $("#signup-email").tooltip('hide')
                                        .attr('data-original-title', 'Email not avalible')
                                        .tooltip('show');
                } else { // if email is avalible
                    $("#signup-email").css({
                        "border": "1px solid #e5e5e5"
                    });

                    $("#signup-email").tooltip('hide')
                                        .attr('data-original-title', 'Email avalible')
                                        .tooltip('show');
                }
            }
        });
        
     });


     //  ============= JS CHECK IF PHONE EXISTS =============

     $("#signup-phone").on("input", function() {

        var phone = $("#signup-phone").val();

        $.ajax({
            url: "/api/Signup/checkPhone/" + phone,
            type: "GET",
            success: function(res) {

                // if phone is not avalible
                if (res) {
                    $("#signup-phone").css({
                        "border": "1px solid red"
                    });

                    $("#signup-phone").tooltip('hide')
                                        .attr('data-original-title', 'Phone not avalible')
                                        .tooltip('show');

                } else { // if phone is avalible
                    $("#signup-phone").css({
                        "border": "1px solid #e5e5e5"
                    });

                    $("#signup-phone").tooltip('hide')
                                        .attr('data-original-title', 'Phone avalible')
                                        .tooltip('show');
                }
            }
        });

     })
});




