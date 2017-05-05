
$(document).ready(function(){

  var parallax = document.querySelectorAll(".parallax"),
      speed = .15;

  window.onscroll = function(){
    [].slice.call(parallax).forEach(function(el,i){

      var windowYOffset = window.pageYOffset,
          elBackgrounPos = (-1 * windowYOffset * speed) + "px";

      el.style.top = elBackgrounPos;

    });
  };



  //Load the content into html Form
  function LoadContainer (items) {

    for(var i = 0; i < items.length; i++){

      //APPEND EACH ARTICLE IN ARRAY INTO CONTAINER
      if(items[i].getFeatured() == true){
        //$("#featuredContainer").append('<a href="'+ items[i].getLink() +'" target="_blank"><div class="linkArticle tranBox '+ items[i].getSection() +'" data-tags="'+items[i].getTags().join(" ")+'"><p class="tags">'+ items[i].getTags().join(" ") +'</p><h6>'+ (i+1) +'</h6><h4>'+ items[i].getSection().substring(0,2) +'</h4><h5>'+ items[i].getTitle() +'</h5></div></a>');
        $("#featuredContainer").append('<section name="'+ items[i].getTitle() +'" class="projectBanner"><div class="projectContent"><div class="projectText"><h4>'+ items[i].getTitle() +'</h4><p>'+ items[i].getContent() +'</p></div><a href="'+ items[i].getLink() +'" target="_blank"><img class="projectImage" src="'+ items[i].getImage() + '" alt="" /></a></div></section>');

        //GET SECTIONS NAMES FOR BUILDING SECTION DROPDOWN MENU
        // if( !($.inArray(items[i].getSection(), sectionNames) > -1) )
        // {
        //   sectionNames.push(items[i].getSection());
        // }

        //GET TAG NAMES FOR BUILDING TAGS DROPDOWN MENU
        // for(var j = 0; j < items[i].getTags().length; j++){
        //   if( !($.inArray(items[i].getTags()[j], tagNames) > -1) )
        //   {
        //     tagNames.push(items[i].getTags()[j]);
        //   }
        // }

      }
      else{//mini project container

        $("#miniContainer").append('<section name="'+ items[i].getTitle() +'" class="miniProject"><a href="'+ items[i].getLink() +'" target="_blank"><img class="miniImage" src="'+ items[i].getImage() +'" alt="" /></a><h4>'+ items[i].getTitle() +'</h4></section>');

      }

    }
  }

  LoadContainer(projectItems);



});
