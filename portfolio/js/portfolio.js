$(document).ready(function(){

  var medium_delay = 150;
  var short_delay = 500;

  $("#index_icon").hover(
    function() {
      // $(this).addClass("transition_delay_short");
      // $("#page_navigation ul").addClass("transition_delay_medium");

      $(this).addClass("hover_shrink_effect");
      setTimeout(function(){$("#page_navigation ul").addClass("hover_enlarge_effect");}, medium_delay);

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

  // var topNode;
  //
  // window.onscroll=function() {
  //    var timer;
  //    (function(){
  //       clearTimeout(timer);
  //       timer= setTimeout(
  //                function() {
  //                  var testNode;
  //                  topNode= null;
  //                  for(var x = 0 ; x < document.body.offsetWidth ; x++) {
  //                    testNode= document.elementFromPoint(x,2);
  //                    try {
  //                      if(!topNode || testNode.offsetTop>topNode.offsetTop) {
  //                        topNode = testNode;
  //                      }
  //                    }
  //                    catch(TypeError){}
  //                  }
  //                },
  //                100
  //              )
  //     }
  //    )();
  //  }
  //
  //  window.onresize=function() {
  //    var timer;
  //    (function(){
  //       clearTimeout(timer);
  //       if(topNode) {
  //         timer= setTimeout(function(){topNode.scrollIntoView(true)},10);
  //       }
  //     }
  //    )();
  //  }

});
