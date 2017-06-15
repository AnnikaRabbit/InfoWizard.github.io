$(document).ready(function() {

    //GLOBAL VARIABLES: USED OF HTML GENERATION FROM DATABASE
    var sectionNames = [];
    var titleNames = [];
    var elementDictionary = {};
    var articleDictionary = {};
    var colorArray = ["#5B564B", //davy's grey
        "#7A414A", //tuscan red
        "#7C785B", //shadow
        "#1A5247", //english green
        "#4C775A", //hooker's green
        "#87847C", //old silver
        "#64363D", //catawba
        "#5B5843", //umber
        "#133C34", //msu green
        "#314C3A"
    ]; //rifle green

    //STATE CONTROL VARIABLES
    var libraryMenu = false;
    var bookmarkMenu = false;

    PreventScrollOnAnimation();

    GenerateToolkitMainView(articleItems);

    //RUN INTRO ANIMATION ON TOOLKIT MAIN VIEW
    setTimeout(function() {
        RevealMainView();
    }, 300);

    //GENERATE THE MAIN TOOLKIT HTML USING DATABASE
    // Global variables listed here for reference
    // var sectionNames = [];
    // var titleNames = [];
    // var elementDictionary = {};
    // var articleDictionary = {};
    // var colorArray = [];
    function GenerateToolkitMainView(items) {

        //Step through all articles: count them and generate html from the data fields
        for (var i = 0; i < items.length; i++) {

            //Get data fields of article i
            var sectionTemp = items[i].getSection();
            var sectionModified = sectionTemp.replace(/\s+/g, '-').toLowerCase();
            var titleTemp = items[i].getTitle();

            //A. check to see if section is already in the generated html toolkit main view
            if (!sectionNames.includes(sectionTemp)) {

                //record new section into temp array
                sectionNames.push(sectionTemp);
                elementDictionary[sectionModified.toString()] = [];

                //Generate html into toolkit-column-#
                var columnTemp = 1 + ((sectionNames.length - 1) % 4);

                $("#toolkit-column-" + columnTemp.toString()).append(
                    '<div class="content-category">' +
                    '<div id="' + sectionModified + '-main-view" data-section="' + sectionTemp + '" class="content-title toolkit-view">' +
                    '<p>' + sectionTemp + '</p>' +
                    '</div>' +
                    '</div>');
            }

            //Organize all articles into category arrays (used during transition from main toolkit view to section view)
            elementDictionary[sectionModified.toString()].push(items[i]);
            articleDictionary[titleTemp.toString()] = items[i];

            //add html for plain white box into designated section
            $('#' + sectionModified + '-main-view').after('<div class="content-box toolkit-view ' + sectionModified + '" data-section="' + sectionTemp + '"></div>');
            //$('#'+sectionTemp.replace(/\s+/g, '-').toLowerCase()+'-main-view').append('<section name="' + items[i].getTitle() + '" class="projectBanner"><div class="projectContent"><div class="projectText"><h4>' + items[i].getTitle() + '</h4><p>' + items[i].getContent() + '</p></div><a href="' + items[i].getLink() + '" target="_blank"><img class="projectImage" src="' + items[i].getImage() + '" alt="" /></a></div></section>');

        } //End of item array for loop

        //For each section in the toolkit, create hover CSS rules && B. add section name to library bar
        for (var i = 0; i < sectionNames.length; i++) {
            SetupLibraryMenu(sectionNames[i]);
            SetupHover(sectionNames[i].replace(/\s+/g, '-').toLowerCase(), i);
        }

    }

    //CREATE HOVER CONTROLS FOR MAINTOOLKIT VIEW (APPEND INTO CSS)
    function SetupHover(section, index) {
        //index is used for color selection

        $('.' + section).hover(function() {
            $('.' + section).each(function() {
                $(this).addClass(section + "-hover");
            });
        }, function() {
            $('.' + section).each(function() {
                $(this).removeClass(section + "-hover");
            });
        });

        var sheet = document.styleSheets[0];
        sheet.insertRule("." + section + "-hover" + '{background: ' + colorArray[index] + ';opacity: .8 !important;color: #ffffff;}', sheet.cssRules.length);
    }

    //GENERATE HTML FOR LIBRARY MENU
    function SetupLibraryMenu(section) {
        $('#library-categories').append('<div class="library-category toolkit-view ' + section.replace(/\s+/g, '-').toLowerCase() + '" data-section="' + section + '" data-library="true"><p>' + section + '</p></div>');
    }

    //LOADING IMAGE CONTROLLER
    function ImageLoaded(img) {
        var $img = $(img);
        $img.parent().addClass('loaded');
    };

    function LoadTargetImages(target) {
        //Added -img to target to prevent hover effects on classname. I.e., design-concepts hover on section view
        //Other reworks would be needed to clean up this tag fix.
        var $images = $('.' + target + '-img.lazy-load');
        //var $images = $('.lazy-load');

        $images.each(function() {
            var $img = $(this),
                src = $img.attr('data-src');
            //console.log($(this).data("src"));

            //First we bind the imgLoaded function to the load event. Then we change the source and trigger a load event
            $img
                .on('load', ImageLoaded($img[0]))
                .attr('src', src);
        });
    };

    // LIBRARY MENU ON HOVER ANIMATION
    var articleView = false;
    $("#library-menu").hover(function() {
        var $menu = $("#library-menu");
        var $content1 = $("#toolkit-wrapper");
        var $content2 = $("#toolkit-section-wrapper");
        //var $content3 = $(".toolkit-section-sidebar");
        //Something wrong, this does not find an object like # does. Does not move the element to the right.
        var $content4 = $("#toolkit-article-wrapper");

        //if (libraryMenu) {
        //libraryMenu = true;
        $menu.velocity({
                left: "1vw"
            },
            "easeInSine");

        $content1.velocity({
            left: "+=13vw"
        });
        if (articleView) {
            $content2.velocity("fadeOut", {
                duration: 0
            });
        } else {
            $content2.velocity({
                left: "+=13vw"
            });
        }
        $content4.velocity({
            left: "+=21vw"
        });
        document.getElementById("library-menu-flag").src = "assets/general/library-flag-close.png";
        //} else {

        //}

    }, function() {
        //libraryMenu = false;
        var $menu = $("#library-menu");
        var $content1 = $("#toolkit-wrapper");
        var $content2 = $("#toolkit-section-wrapper");
        //var $content3 = $(".toolkit-section-sidebar");
        //Something wrong, this does not find an object like # does. Does not move the element to the right.
        var $content4 = $("#toolkit-article-wrapper");
        $menu.velocity({
            left: "-100%"
        }, "easeInSine");

        $content1.velocity({
            left: "-=13vw"
        });
        if (articleView) {
            $content2.velocity("fadeIn", {
                duration: 0
            });
        } else {
            $content2.velocity({
                left: "-=13vw"
            });
        }
        $content4.velocity({
            left: "-=21vw"
        });

        document.getElementById("library-menu-flag").src = "assets/general/library-flag.png";
    });

    //BOOKMARK MENU ON HOVER ANIMATION
    $("#bookmark-menu").hover(function() {
        var $menu = $("#bookmark-menu");
        var $content1 = $("#toolkit-wrapper");
        var $content2 = $("#toolkit-section-wrapper");
        //var $content3 = document.getElementsByClassName("toolkit-section-sidebar")[0];
        var $content4 = $("#toolkit-article-wrapper");

        $menu.velocity({
                left: "1vw"
            },
            "easeInSine");
        $content1.velocity({
            left: "+=13vw"
        });
        if (articleView) {
            $content2.velocity("fadeOut", {
                duration: 0
            });
        } else {
            $content2.velocity({
                left: "+=13vw"
            });
        }
        $content4.velocity({
            left: "+=21vw"
        });
        document.getElementById("bookmark-menu-flag").src = "assets/general/bookmark-flag-close.png";
    }, function() {
        var $menu = $("#bookmark-menu");
        var $content1 = $("#toolkit-wrapper");
        var $content2 = $("#toolkit-section-wrapper");
        //var $content3 = document.getElementsByClassName("toolkit-section-sidebar")[0];
        var $content4 = $("#toolkit-article-wrapper");

        $menu.velocity({
                left: "-100%"
            },
            "easeInSine");
        $content1.velocity({
            left: "-=13vw"
        });
        if (articleView) {
            $content2.velocity("fadeIn", {
                duration: 0
            });
        } else {
            $content2.velocity({
                left: "-=13vw"
            });
        }
        $content4.velocity({
            left: "-=21vw"
        });
        document.getElementById("bookmark-menu-flag").src = "assets/general/bookmark-flag.png";
    });

    //TOOLKIT MAIN VIEW: HOVER SETUP
    $(".content-title").hover(function() {
        var contentType = $(this).data("section").replace(/\s+/g, '-').toLowerCase();
        $("." + contentType).each(function() {
            $(this).addClass(contentType + "-hover");
        });
    }, function() {
        var contentType = $(this).data("section").replace(/\s+/g, '-').toLowerCase();
        $("." + contentType).each(function() {
            $(this).removeClass(contentType + "-hover");
        });
    });

    //ANIMATION FUNCTIONS
    //ANIMATION: TOOLKIT MAIN VIEW --> SECTION
    $(".toolkit-view").bind("click", function() {
        TransitionToSection($(this));
    });
    //"LOAD" SECTION INFORMATION (CONCURRENT WITH ANIMATION)
    function TransitionToSection(element) {

        //Clean container before filling it
        $(".section-box").remove();

        var elementArray = elementDictionary[$(element).data("section").replace(/\s+/g, '-').toLowerCase()];
        var sectionLoading = elementArray[0].getSection();

        //Generate html for toolkit-section-wrapper
        for (var i = 0; i < elementArray.length; i++) {

            var title = elementArray[i].getTitle();
            var section = elementArray[i].getSection().replace(/\s+/g, '-').toLowerCase();
            var tileDescription = elementArray[i].getTileDescription();
            var tileImage = elementArray[i].getTileImage();

            //Add tile for each article in a section
            $("#section-title").after('<div class="section-box article-view" data-article="' + title + '"><h6>' + title + '</h6><p>' + tileDescription + '</p><div class="section-image-wrapper"><img class="' + section + '-img lazy-load" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-src="' + tileImage + '" alt="" /></div></div>');
        }
        //Setup the article transition class
        $(".article-view").bind("click", function() {
            TransitionToArticle($(this));
        });

        //Change header for section
        document.getElementById("section-title-text").innerHTML = sectionLoading;

        //Load tileImages for each article in a section
        LoadTargetImages(sectionLoading.replace(/\s+/g, '-').toLowerCase());

        //APPLY a BUTTON OR some CLICK FUNCTIONALITY

        //Transition the viewports
        HideMainView();
        RevealSectionView();
    }

    //ANIMATION: SECTION --> TOOLKIT MAIN VIEW
    $("#section-close").click(function() {
        RevealMainView();
        HideSectionView();
    });

    //ANIMATION: SECTION --> ARTICLE
    $(".section-box").click(function() {
        //HideSectionView();
        RevealScrollbarSectionView();
        RevealArticleView();
    });
    //"LOAD" ARTICLE INFORMATION (CONCURRENT WITH ANIMATION)
    function TransitionToArticle(article) {

        //Clean container before filling it
        $(".article-content").remove();

        var articleObject = articleDictionary[article.data("article").toString()];
        var title = articleObject.getTitle();
        var content = articleObject.getContent();
        var images = articleObject.getImages();
        var captions = articleObject.getCaptions();
        var youtube = articleObject.getYoutube();

        document.getElementById("article-title-text").innerHTML = title;
        $("#youtube-anchor").attr("href", youtube.toString());

        for (var i = 0; i < images.length; i++) {
            $("#article-title").after('<div class="article-image-wrapper article-content"><img class="article-img lazy-load" data-imageNumber="' + i.toString() + '" data-src="' + images[i] + '" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="'+captions[i].toString()+'"/><figcaption class="article-caption">'+captions[i].toString()+'</figcaption></div>');
        }
        for (var i = 0; i < content.length; i++) {
            $("#article-title").after('<p class="article-content">' + content[i].toString() + '</p>');
        }

        //Load images for article sections
        //Error in programming, needed to adjust for -img dependency in section generation section
        LoadTargetImages("article");

        //APPLY A BUTTON OR some CLICK FUNCTIONALITY

        //Transition the viewports
        RevealScrollbarSectionView();
        RevealArticleView();
    }

    //ANIMATION: ARTICLE --> SECTION
    $("#article-close").click(function() {
        HideArticleView();
        HideScrollbarSectionView();
        //RevealSectionView();
    });

    //ANIMATION FUNCTION VARIABLES
    var animationSpeed = 1000;
    var speedMod = 1.6; //increase timing of animation
    var baseSpeed = 400;
    var animationDelayIn = 700;
    var animationDelayOut = 200;
    var animationDelayWrapper = 1000;

    var easeInOut = [.07, .7, .94, .22];
    var originalValues = [0.91, -0.02, 1, 0.27];
    var jumpSlow = [.07, .7, .31, .12];
    var easing = easeInOut;

    //ANIMATION FUNCTIONS
    function PreventScrollOnAnimation() {
        $("#page-wrapper").addClass("animationHelper");
    }

    function AllowScroll() {
        $("#page-wrapper").removeClass("animationHelper");
    }

    function RevealMainView() {
        $("#page-background").removeClass("grayscale");

        $(".content-box").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            //fadeIn because display:none initially. This convention is used throughout the other animations
            $element.velocity("fadeIn", {
                duration: 0
            }).velocity({
                top: "0px"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayIn,
            }, easing);
        });

        $(".content-title").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity("fadeIn", {
                duration: 0
            }).velocity({
                top: "0px"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayIn
            }, easing);
        });

        //Controls the scrollability of the viewport
        $("#page-wrapper").velocity({
            opacity: 1
        }, {
            duration: 0,
            delay: baseSpeed + (speedMod * animationSpeed + animationDelayIn),
            complete: function() {
                AllowScroll();
            }
        });
    }

    function HideMainView() {

        PreventScrollOnAnimation();

        $(".content-box").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity({
                top: "150vh"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayOut
            }, easing).velocity("fadeOut", {
                duration: 0
            });
        });

        $(".content-title").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity({
                top: "150vh"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayOut
            }, easing).velocity("fadeOut", {
                duration: 0
            });
        });
    }

    function RevealSectionView() {

        $("#page-background").addClass("grayscale");

        $("#toolkit-section-wrapper").velocity("fadeIn", {
            duration: 0,
            delay: animationDelayIn
        });

        $("#section-title").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity("fadeIn", {
                duration: 0
            }).velocity({
                top: "0px"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayIn
            }, easing);
        });

        $(".section-box").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity("fadeIn", {
                duration: 0
            }).velocity({
                top: "0px"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayIn
            }, easing);
        });

        //Controls the scrollability of the viewport
        $("#page-wrapper").velocity({
            opacity: 1
        }, {
            duration: 0,
            delay: baseSpeed + (speedMod * animationSpeed + animationDelayIn),
            complete: function() {
                AllowScroll();
            }
        });
    }

    function HideSectionView() {

        PreventScrollOnAnimation();

        $("#section-title").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity({
                top: "150vh"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayOut
            }, easing).velocity("fadeOut", {
                duration: 0
            });
        });

        $(".section-box").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity({
                top: "150vh"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayOut
            }, easing).velocity("fadeOut", {
                duration: 0
            });
        });


        // $("#toolkit-section-wrapper").velocity("fadeOut", {
        //     duration: 0,
        //     delay: baseSpeed + animationDelayWrapper
        // });
    }

    function RevealScrollbarSectionView() {

        $("#section-title").velocity("fadeOut", {
            duration: 400,
            delay: animationDelayOut
        });

        $("#toolkit-section-wrapper").each(function() {
                var $element = $(this);
                var dropRate = Math.random();

                $element.velocity("fadeIn", {
                    duration: 0
                }).velocity({
                    top: "10vh",
                    left: "77vw",
                    height: "90vh",
                    width: "22vw"
                }, {
                    duration: (.5 * animationSpeed),
                    delay: animationDelayIn,
                    complete: function(){
                      $("#toolkit-section-wrapper").addClass("toolkit-section-sidebar");
                      $(".section-box").addClass("section-box-sidebar");
                    }
                }, easing);
            });
        //document.getElementById("section-title").style.display="none";



    }

    function HideScrollbarSectionView() {

        $("#section-title").velocity("fadeIn", {
            duration: 400,
            delay: animationDelayIn
        });

        $("#toolkit-section-wrapper").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity("fadeIn", {
                duration: 0
            }).velocity({
                top: "23vh",
                left: "15vw",
                width: "70vw",
                height: "auto"
            }, {
                duration: (.5 * animationSpeed),
                delay: animationDelayIn,
                complete: function(){
                  $(".section-box").removeClass("section-box-sidebar");
                  $("#toolkit-section-wrapper").removeClass("toolkit-section-sidebar");
                }
            }, easing);
        });
        //document.getElementById("section-title").style.display="block";
    }

    function RevealArticleView() {

        articleView = true;

        //document.body.style.backgroundImage = "url(assets/general/background.png)";
        $("#page-background").addClass("grayscale");
        
        //quick fix for when you load a section while in article view
        document.getElementById("library-menu").style.display = "none";

        $("#toolkit-article-wrapper").velocity("fadeIn", {
            duration: 0,
            delay: baseSpeed + animationDelayIn
        });

        $("#article-title").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity("fadeIn", {
                duration: 0
            }).velocity({
                top: "0px"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayIn
            }, easing);
        });

        $(".article-content").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity("fadeIn", {
                duration: 0
            }).velocity({
                top: "0px"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayIn
            }, easing);
        });

        //Controls the scrollability of the viewport
        ScrollArticle();
        $("#page-wrapper").velocity({
            opacity: 1
        }, {
            duration: 0,
            delay: baseSpeed + (speedMod * animationSpeed),
            complete: function() {
                AllowScroll();
            }
        });

    }

    function HideArticleView() {

        articleView = false;

        //quick fix for when you load a section while in article view
        document.getElementById("library-menu").style.display = "block";

        PreventScrollOnAnimation();

        $("#article-title").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity({
                top: "150vh"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayOut
            }, easing).velocity("fadeOut", {
                duration: 0
            });
        });

        $(".article-content").each(function() {
            var $element = $(this);
            var dropRate = Math.random();

            $element.velocity({
                top: "150vh"
            }, {
                duration: baseSpeed + (speedMod * animationSpeed * dropRate),
                delay: animationDelayOut
            }, easing).velocity("fadeOut", {
                duration: 0
            });
        });

        $("#toolkit-article-wrapper").velocity("fadeOut", {
            duration: 0,
            delay: baseSpeed + animationDelayWrapper
        });

    }

    function ScrollArticle(){
      $('body, html, #page-wrapper').animate({ scrollTop: 0 }, "fast");
//velocity({scrollTop:0},{duration:300});
    }


    //EXTRA CODE
    // $(".design-concepts").hover(function() {
    //     $(".design-concepts").each(function() {
    //         $(this).addClass("design-concepts-hover");
    //     });
    // }, function() {
    //     $(".design-concepts").each(function() {
    //         $(this).removeClass("design-concepts-hover");
    //     });
    // });

    // $(".graphing").hover(function() {
    //     $(".graphing").each(function() {
    //         $(this).addClass("graphing-hover");
    //     });
    // }, function() {
    //     $(".graphing").each(function() {
    //         $(this).removeClass("graphing-hover");
    //     });
    // });

    //RUN TRANSITION ANIMATION INTO SECTION VIEW
    // $(".content-category").click(function() {
    //     //console.log($(this).data("section"));
    //     HideMainView();
    //     RevealSectionView();
    //
    // });
    //EXCESS LOAD CRITERIA. LOADS ARE HANDLED WHEN SECTION IS CLICKED ON INSTEAD
    // $(window).load(function() {
    //     LoadSectionImages();
    // });

    //END OF DOCUMENT READY

});
