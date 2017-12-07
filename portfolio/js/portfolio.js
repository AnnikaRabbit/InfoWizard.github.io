$(document).ready(function(){

  //CONTENT NAVIGATION ANIMATIONS
  var medium_delay = 500;
  var short_delay = 150;
  $("#index_icon").hover(
    function() {
      // $(this).addClass("transition_delay_short");
      // $("#page_navigation ul").addClass("transition_delay_medium");

      $(this).addClass("hover_shrink_effect");
      setTimeout(function(){$("#page_navigation ul").addClass("hover_enlarge_effect");}, short_delay);

      // $(this).removeClass("transition_delay_short");
      //
      // $("#page_navigation ul").removeClass("transition_delay_medium");

    }, function() {
      //$( this ).removeClass( "hover" );
    }
  );
  
  $("#close_navigation").click(function(){
    $("#page_navigation ul").removeClass( "hover_enlarge_effect" );
    $("#index_icon").removeClass("hover_shrink_effect");

  })

  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });


});


//PRE LOAD SCREEN
$(window).on("load", function(){

  $("#page_wrapper").fadeIn(1000);
  $('#preload_screen').fadeOut(2100,function(){
    $(this).remove();
  });

 });
