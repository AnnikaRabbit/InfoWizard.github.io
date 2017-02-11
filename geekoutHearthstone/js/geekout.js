$(document).ready(function() {

    //Manage site data
    //
    //
    //
    $(window).unload(function() {
        // Remove the cookie on navigation away
        document.cookie = "BypassIntro=true; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        console.log("Removed cookie");
        console.log("Proof: ["+document.cookie+"]");
    });

    var introGate = [];
    var introGateValue = [];
    var allcookies;
    ReadCookie();

    function ReadCookie() {
        allcookies = document.cookie;

        if (allcookies != "") {
            // Get all the cookies pairs in an array
            cookiearray = allcookies.split(';');

            // Now take key value pair out of this array
            for (var i = 0; i < cookiearray.length; i++) {
                introGate.push(cookiearray[i].split('=')[0]);
                introGateValue.push(cookiearray[i].split('=')[1]);
                console.log("Cookies are:" + " " + introGate[i] + ": " + introGateValue[i]);
            }
        } else {
            console.log("Cookies are null");
        }
    }

    //Hearthbook animations
    //
    //
    //
    $("#welcome-button").click(function() {

        //$("#hearthbook").addClass("shift");
        setTimeout(function() {
            //  $("#hearthbook").addClass("slam");
            document.getElementById("hearthbook").style.display = "block";
            $("#hearthbook").velocity({
                scale: [1, 3],
                opacity: [1, 0]
            }, {
                easing: [.63, .19, .36, .79],
                duration: 1000
            });
            $("body").addClass("rattle");
        }, 0);

        setTimeout(function() {
            //$("#hearthbook").addClass("zoomed");
            $("#hearthbook").velocity({
                scale: [2, 1]
            }, {
                easing: [.63, .19, .36, .79],
                duration: 1000
            });
        }, 2100);

        setTimeout(function() {
            //$("#star-contain").toggleClass("flipped");
            //$("#star-menu-contain").toggleClass("flipped");
            $("#star-menu-contain").removeClass("flipped");
            $("#star-contain").velocity({
                perspective: "800px",
                rotateY: ["180deg", "0deg"]
            }, {
                duration: 800
            });
            $("#star-menu-contain").velocity({
                perspective: "800px",
                rotateY: ["360deg", "180deg"]
            }, {
                duration: 800
            });
            //$("#hearthbook").addClass("shift");
        }, 2800);

        //document.getElementById("welcome-board").style.display = "none";
        $("#welcome-board").velocity({
            opacity: [0, 1]
        }, {
            duration: 100
        });

    });

    //Skip intro function
    //
    //
    //
    if (introGateValue[introGate.indexOf("BypassIntro")] == "true" && allcookies != "") {
      console.log([introGateValue,allcookies]);
        $("#welcome-button").click();
        console.log("skipped intro");
    }
    else{
      document.getElementById('welcome-board').style.visibility = "visible";
    }

    //Button operations for navigation menu
    //
    //
    //
    $('#what-is-hearthstone').click(function() {
        //$("#star-menu-contain").toggleClass("flipped");
        //$("#what-is-hearthstone-text-contain").toggleClass("flipped");
        $("#what-is-hearthstone-text-contain").removeClass("flipped");
        $("#star-menu-contain").velocity({
            perspective: "800px",
            rotateY: ["180deg", "0deg"]
        }, {
            duration: 800
        });
        $("#what-is-hearthstone-text-contain").velocity({
            perspective: "800px",
            rotateY: ["360deg", "180deg"]
        }, {
            duration: 800
        });
    });

    $('#what-is-hearthstone-menu').click(function() {
        $("#star-menu-contain").velocity({
            perspective: "800px",
            rotateY: ["360deg", "180deg"]
        }, {
            duration: 800
        });
        $("#what-is-hearthstone-text-contain").velocity({
            perspective: "800px",
            rotateY: ["180deg", "0deg"]
        }, {
            duration: 800
        });
    });

    $('#upcoming-news').click(function() {
        //$("#star-menu-contain").toggleClass("flipped");
        //$("#upcoming-news-text-contain").toggleClass("flipped");
        $("#upcoming-news-text-contain").removeClass("flipped");
        $("#star-menu-contain").velocity({
            perspective: "800px",
            rotateY: ["180deg", "0deg"]
        }, {
            duration: 800
        });
        $("#upcoming-news-text-contain").velocity({
            perspective: "800px",
            rotateY: ["360deg", "180deg"]
        }, {
            duration: 800
        });
    });

    $('#upcoming-news-menu').click(function() {
        //$("#star-menu-contain").toggleClass("flipped");
        //$("#upcoming-news-text-contain").toggleClass("flipped");
        $("#star-menu-contain").velocity({
            perspective: "800px",
            rotateY: ["360deg", "180deg"]
        }, {
            duration: 800
        });
        $("#upcoming-news-text-contain").velocity({
            perspective: "800px",
            rotateY: ["180deg", "0deg"]
        }, {
            duration: 800
        });
    });

    $("#how-to-play").click(function() {
        $("body").remove("rattle");
        window.location = "howtoplay.html";
    });

    $("#streamers").click(function() {
        $("body").remove("rattle");
        window.location = "streamers.html";
    });



});
