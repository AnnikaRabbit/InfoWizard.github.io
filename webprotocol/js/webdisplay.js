


$(function() {

    //MASTER VARIABLES
    //Note, all timings are in the "seconds" format
    //List the number of emails coded in html
    const numberOfEmails = $(".email").length;
    //Length of time for baseline writing
    const baselineEssayLength = 1;//5 * 60; // 5 minutes
    const baselineEssayWarning = 2 * 60; // 2 minutes
    //Length of time for dual task writing
    const dualEssayLength = 50 * 60; // 50 minutes
    const dualEssayWarning = 5 * 60; // 5 minutes
    //Length of time before receiving first email in batch condition
    const batchFirstNotification = 10 * 60; // 10 minutes
    const batchRedirectTime = 5 * 60; // 5 minutes
    //Length of time before receiving first email in batch condition
    const intermittentFirstNotification = 5 * 60; // 5 minutes
    const intermittentRedirectTime = 10; // 10 seconds
    //Amount of base time to build notification time array from
    const intermittentBaseTime = 60; // 60 seconds == ~ 4 minute average time between emails

    //General program VARIABLES
    var essayLength = dualEssayLength;
    var warningLength;
    var name;
    var T_id;
    var condition1;
    var condition2;
    var essayResponses = [];
    var essayFlag = "baseline";
    var checkUnfocus = 0;
    var baselineResponseTime = 0;
    var baselineUnfocused = 0;
    var dualResponseTime = 0;
    var dualUnfocused = 0;
    //intermittentTimings = []; //declared above
    var resetArray = 1;
    var timesClickedNotification = 0;
    //variable arrays that need to match email number
    var emailResponses = [];
    var emailID = [];
    var timeRespondingEmail = [];
    var timestampClickedOpen = [];
    var timestampClickedSend = [];
    var timestampClickedNotification = [];
    var timestampResumedWriting = [];
    var markUnreadClicks = [];
    for(var i = 0; i < numberOfEmails; i++){
      markUnreadClicks.push(0);
      timestampResumedWriting.push(0);
    }
    var emailCompleted;
    var emailLeftover;
    var mouseClicks = 0;
    var pausedNumber = 0;

    //GLOBAL MEASURES TO ENSURE GENUINE INPUT
    //Prevent copy/paste
    $('.essayText').bind("cut copy paste",function(e) {
        e.preventDefault();
    });
    $('#responseField').bind("cut copy paste",function(e) {
        e.preventDefault();
    });
    //Disable tab
    $(document).keydown(function(objEvent) {
      if (objEvent.keyCode == 9) {  //tab pressed
          objEvent.preventDefault(); // stops its action
      }
    });
    //Prevents navigation away from the site, which will destroy any collected data
    window.addEventListener("beforeunload", function (e) {
      //this wont actually be said to the participant :(
      var confirmationMessage = 'Please keep this session active. '
                              + 'Do not refresh or navigate away from this page.';

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
    });
    //Prevents opening the contextmenu
    // document.addEventListener("contextmenu", function (e) {
    //     e.preventDefault();
    // }, false);

    //Admin pause feature
    //Use flags to control the decrements. SO you dont pause the functions, but you stop counting down...https://stackoverflow.com/questions/24724852/pause-and-resume-setinterval
    // var refreshAlert = new Audio('audio/triplebeep.mp3');
    // if(localStorage.getItem("T_id") === null){
    //   console.log("Local storage check");
    // }
    // else{
    //   //audio alert that the screen has been reset by participant and data needs to be retrieved
    //   refreshAlert.play();
    // }
    var paused = 0;
    $(".adminPause").click(function(){
      var password = document.getElementById("password").value;
      document.getElementById("password").value = "";
      var key = password.charAt(0);
      if (key == "p"){
        if(paused == 0){
          paused = 1;
          pausedNumber++;
          document.getElementById('adminPause').style.background = "#DE5145";
          console.log("Pausing all timers");
        }
        else{
          paused = 0;
          document.getElementById('adminPause').style.background = "none";
          console.log("Resuming all timers");
        }
      }
      else if (key == "s"){
        if(localStorage.getItem("T_id") === null){
          console.log("Local storage is empty");
        }
        else{
          printLocalData();
        }
      }
      else if (key == "c"){
        window.localStorage.clear();
      }
    });

    //SECTION ARRAY
    var sceneArray =
    ["optionsPane","baselineStressPane","cameraCalibrationPane","baselineEssayPane",
    "stressConditionPane","dualEssayPane","nasaPane","thankYou"];
    var sceneIndex = 0;
    //Clears extra spaces in textareas
    document.getElementById("baselineEssay").value = "";
    document.getElementById("dualEssay").value = "";
    document.getElementById("responseField").value = "";

    //SECTION POSITION AND TRANSITION
    //Begins with switching active pane (animates location and display)
    $(".sceneController").click(function(){
      //disables double click on this button
      $(this).off("click");

      //OPTIONS PANE
      if(sceneArray[sceneIndex] == "optionsPane"){
        console.log("Options confirmed");
        //Handle participant name and inclusions into email view
        name = document.getElementById("dataName").value;
        T_id = document.getElementById("dataID").value;
        if(name == ""){
          document.getElementById("emailReceiver").innerHTML = "to Ohi Mar";
        }
        else{
          document.getElementById("emailReceiver").innerHTML = "to " + name;
        }
        var surveyLink = "https://www.surveygizmo.com/s3/4384438/Office-Stress-Questionnaire-Set-1?subj="+T_id;
        $("#baselineSurvey").attr("href", surveyLink);

        console.log("Advancing scenes, calling SwitchPane()");
        console.log("Moving from " + sceneArray[sceneIndex] + " to " + sceneArray[sceneIndex+1]);
        switchPane(1);
      }

      //BASELINE ESSAY PANE
      else if(sceneArray[sceneIndex] == "baselineEssayPane"){
        //clear local data
        window.localStorage.clear();
        saveDataLocal();
        hidePane("baslineEssayInstructions");
        console.log("Instructions Complete: Beginning Phase 3 Writing");

        //Prepare phase 4 condition
        condition1 = document.getElementById("dataStress").value;
        condition2 = document.getElementById("dataEmail").value;
        console.log("Condition 1: " + condition1 + ", Condition 2: " + condition2);

        if(condition1 == "high"){
          console.log("Assigning high stress links and instructions");
          //change instructions for next phase
          $("#stressLink").attr("href","https://wzlxjtu.github.io/primingtask/");
          document.getElementById("cwtDemo").style.display = "block";
          document.getElementById("stressText").innerHTML = "Click below to start the next task";
          //Get proper description for insertion
          document.getElementById("presentationType").innerHTML = "Your performance will be based on both the quality of your essay, the quality of your responses to emails, and the quality of a 5-minute presentation you will give to a group of evaluators at the end.";
        }
        else{
          console.log("Assigning low stress links and instructions");
          //change instructions for next phase
          $("#stressLink").attr("href","https://youtu.be/u76kO9Elai4");
          document.getElementById("stressText").innerHTML = "Click below to start the video. Try to relax while watching.";
          //Get proper description for insertion
          document.getElementById("presentationType").innerHTML = "Your performance will be based on both the content of your essay and the relevance and sufficiency of your responses to emails.";
        }
        //Set the link for the NasaTLX and stress surveyText
        var linkLocation = "https://www.surveygizmo.com/s3/4388082/Office-Stress-Questionnaire-Set-2?subj="+T_id;
        $("#combinedSurvey").attr("href", linkLocation);

        //Sets the time allowed for a writing section
        essayLength = baselineEssayLength;
        warningLength = baselineEssayWarning;
        writingTimer(warningLength ,essayLength);
      }

      //DUAL ESSAY PANE
      else if (sceneArray[sceneIndex] == "dualEssayPane"){
        hidePane("dualEssayInstructions");
        essayFlag = "dual";
        if(condition2 == "batch"){
          console.log("Randomizing presentation order for BATCH");
          shuffleEmailList();
        }
        console.log("Instructions Complete: Beginning Phase 5 Writing");
        essayLength = dualEssayLength;
        warningLength = dualEssayWarning;
        //set session time length
        writingTimer (warningLength, essayLength);
        //Sets the time schedule for email notifications
        emailTimer();
      }
    });
    //controls scenes with multiple overlays (reveals the next button)
    $(".subSceneController").click(function(){
      $(this).off("click");
      console.log("Revealing next button to advance to " + sceneArray[sceneIndex+1]);
      var location = "#" + sceneArray[sceneIndex];
      $(location + " .beforeSurvey").addClass("disabled");
      $(location + " .afterSurvey").removeClass("disabled");
    });
    //Next button to advance scenes
    var expiredDoubleClick = 1;
    $(".next").click(function(){
      if(!$(this).hasClass("expire")){
        $(this).off("click");
        switchPane(1);
      }
      else {
        if(expiredDoubleClick){
          expiredDoubleClick = 0;
          console.log("Leaving time expired screen");
          hidePane("timeExpired");
          switchPane(1);
        }
      }
    });
    //Last chance to save data before final export and session clear
    $("#combinedSurvey").click(function(){
      $(this).off("click");
      saveDataLocal();
    });

    //Email phase controls
    //Changes variable to signal that email notification has been pressed
    var emailNotificationCheck = 1;
    $("#emailNotification").click(function(){
      if(emailNotificationCheck){
        emailNotificationCheck = 0;
        emailPressed();
      }
    });
    //Opens an unread email into a message view
    var openEmailCheck = 1;
    $(".email").click(function(){
      if(openEmailCheck){
        openEmailCheck = 0;
        openEmail(this);
      }
    });
    //Returns to inbox and marks email as unread
    var markUnreadCheck = 1;
    $("#markUnread").click(function(){
      if(markUnreadCheck){
        markUnreadCheck = 0;
        markUnread();
      }
    });
    //Loads reply textarea for response
    $("#reply2Email").click(function(){reply2Email();});
    //Saves participant response, clears email from stack, and returns to inbox
    var sendEmailCheck = 1;
    $("#sendEmail").click(function(){
      if(sendEmailCheck){
        sendEmailCheck = 0;
        sendEmail();
      }
    });

    //GENERAL TIME AND SCHEDULE
    //Timer for essay writing phases 3, 4, and 5
    var warningTime;
    var writingTime;
    var warningTimeFlag = 1;
    var timeCount;
    var expireSound = new Audio('audio/bong.mp3');
    var essayOrder = "baseline";
    var contentT1;
    var contentT2;
    var resumeT1;
    var resumeT2;
    var checkWriting = 0;
    var checkFlag = 0;
    var sessionComplete;
    var phaseTimestamps = [];
    //Checks to see if email pane is active, used to close screen if total time expires and participant for some reason is still responding to email
    var respondingEmail = 0;
    function writingTimer(warning, total){
      //WritingTime controls essays composition time. Once the time expires, an overlay is activated the defocuses text and displays an advance button.
      warningTime = warning;
      writingTime = total;
      sessionComplete = 0;
      timeCount = setInterval(function(){

        //check to see when writing has been resumed
        if(checkWriting == 0){}
        else if(checkWriting == 1){
          contentT1 = $("#dualEssay").val();
          resumeT1 = writingTime;
          checkWriting = 2;
        }
        else if(checkWriting == 2){
          contentT2 = $("#dualEssay").val();
          resumeT2 = writingTime;
          checkFlag = 1;
        }
        if(checkFlag && contentT1 != contentT2){
          timestampResumedWriting.shift();
          timestampResumedWriting.push(resumeT2);
          console.log("Collecting the resume time: " + resumeT2);
          saveDataLocal();
          checkFlag = 0;
          checkWriting = 0;
        }
        //Notify when particpant has entered warningTime
        if(writingTime <= warningTime){
          if(warningTimeFlag){
            //this flag is used just for the console log operation
            console.log("Time has entered into warning limit");
            warningTimeFlag = 0;
            document.getElementById("timerPane").style.display = "block";
          }
          //updates description of timer
          if(redirectIn > 0){
            //Dont override redirect time
          }
          else {
            document.getElementById("redirect").innerHTML = "Time Remaining";
            document.getElementById("stopTimer").innerHTML = convertTime(writingTime);
          }

          //Enable timeExpired and prevent additional writing
          if(writingTime < 0){
            sessionComplete = 1;
            document.getElementById("timerPane").style.display = "none";
            console.log("Time has expired: Next button available");
            clearInterval(timeCount);
            expireSound.play();
            document.getElementById("timeExpired").style.display = "block";
            $(".essayText").blur();
            //Save essay data
            var essayTemp;
            if(essayOrder == "baseline"){
              console.log("Entering baseline essay response into variable");
              essayTemp = $("#baselineEssay").val();
              essayOrder = "dual";
            }
            else {
              console.log("Entering dual essay response into variable");
              essayTemp = $("#dualEssay").val();
            }
            essayResponses.push(essayTemp);
            //Reset flag to enable next warning console log
            warningTimeFlag = 1;
            //If participant is still responding to email when session time expires, stop email activity
            if(respondingEmail){
              moveBackPane("emailPane");
              $("#responseField").blur();
              respondingEmail = 0;
            }
            //Save session data
            if(sceneArray[sceneIndex] == "dualEssayPane"){
              saveDataLocal();
            }
          }
        }
        if(paused == 0){
          //Measure the timings of essay writing and get defocus counter
          if(essayFlag == "baseline"){
            if(document.hasFocus()){
              checkUnfocus = 1;
              if(writingTime > 0){baselineResponseTime++;}
            }
            else {
              if(checkUnfocus){
                //checks the number of times in the essay session that someone leaves the essay writing to do something else
                checkUnfocus = 0;
                baselineUnfocused++;
                console.log("Baseline unfocused counter: " + baselineUnfocused);
              }
            }
          }
          else {
            if(document.hasFocus()){
              checkUnfocus = 1;
              if(writingTime > 0 && respondingEmail == 0){dualResponseTime++;}
            }
            else {
              if(checkUnfocus){
                checkUnfocus = 0;
                if(respondingEmail == 0)
                {
                  dualUnfocused++;
                  console.log("Dual unfocused counter: " + dualUnfocused);
                }
              }
            }
          }
          writingTime--;
        };
        if(writingTime % 10 == 0){console.log("Writing Time: " + writingTime);}
      },1000);
    }

    //EMAIL NOTIFICATION AND TIMERS
    //Clears email notification
    function clearNotification(){
      respondingEmail = 1;
      anime({
        targets: "#emailNotification",
        duration: 500,
        right: ["0%",'-200%'],
        easing: 'easeOutQuint',
        complete: function () {
          console.log("Notification reset");
          document.getElementById("emailNotification").style.display = "none";
          notificationPressed = 0;
          emailNotificationCheck = 1;
        }
      });
    }
    function convertTime(input){
      var date = new Date(null);
      date.setSeconds(input); // specify value for SECONDS here
      var result = date.toISOString().substr(11, 8).replace(/^[0:]+/, "");
      return result;
    }
    //Controls timing for email notifications
    var batchTime = batchFirstNotification;
    var batchRedirect = batchRedirectTime;
    var intermittentRedirect = intermittentRedirectTime;
    var intermittentIndex = 0;
    var intermittentTime = [];
    // 40/10, 4m per email, 2m base plus split 4m rng onto pair of 2m bases
    var splitValue = intermittentBaseTime * 2;
    for (i = 0; i < numberOfEmails; i++){
      var splitter = Math.random();
      var half1 = Math.floor(splitter * splitValue);
      var half2 = Math.floor((1 - splitter) * splitValue);
      intermittentTime.push(intermittentBaseTime + half1);
      intermittentTime.push(intermittentBaseTime + half2);
      i++;
    }
    intermittentTime[0] = intermittentFirstNotification;
    var intermittentTimings = [];
    for(var i = 0; i < intermittentTime.length; i++){
      intermittentTimings[i] = intermittentTime[i];
    }
    console.log("Intermittent Timings: " + intermittentTime);
    console.log("Intermittent SAVED data: " + intermittentTimings);
    function emailTimer(){
      var condition = document.getElementById("dataEmail").value;
      if(condition == "batch"){
        console.log("Batch condition activated");
        var emailSchedule = setInterval(function(){
          if(batchTime < 0){
            console.log("Batch email now available");
            clearInterval(emailSchedule);
            notifyEmail();
            setRedirect(batchRedirect);
          }
          if(paused == 0){batchTime--;}
        },1000);
      }
      else{
        //conditon == intermittent
        if(intermittentIndex < numberOfEmails){
          console.log("Intermittent condition activated");
          var emailSchedule = setInterval(function(){
            if(intermittentTime[intermittentIndex] < 0){
              clearInterval(emailSchedule);
              intermittentIndex++;
              console.log("Intermittent #" +(intermittentIndex)+ " email now available");
              notifyEmail();
              setRedirect(intermittentRedirect);
            }
            if(paused == 0){intermittentTime[intermittentIndex]--;}
          },1000);
        }
      }
    }
    //Present email notification and trigger sound
    var emailNotification = new Audio('audio/bellring.wav');
    var emailIndex = shuffle(Array.apply(null, Array(numberOfEmails)).map(function (_, i) {return i;}));
    console.log("Initial value of Email Index: " + emailIndex);
    function notifyEmail(){
      document.getElementById("emailNotification").style.display = "block";
      var condition = document.getElementById("dataEmail").value;
      if(condition == "batch"){
        //turn on all emails in html
        $(".notActive").removeClass("notActive");
        document.getElementById("newEmail").innerHTML = numberOfEmails +" New Emails";
        //Load current computer time into all emails
        $(".bannerTime").text(getTime());
      }
      else {//intermittent
        //turn on next email in html
        console.log("Check emails left in Email Index: "+ emailIndex);
        var chooseEmail = emailIndex.shift();
        console.log("Loading email #"+ (chooseEmail+1));
        var object = $(".email")[chooseEmail];
        document.getElementById("newEmail").innerHTML = "1 New Email";
        //Load current computer time into email
        $(object).removeClass("notActive");
        var emailNodes = object.children;
        emailNodes[2].innerHTML = getTime();
      }
      //Slide notifcation into view

      console.log("Animating notification");
      anime({
        targets: "#emailNotification",
        duration: 500,
        right: ["-200%",'0%'],
        easing: 'easeOutQuint',
        complete: function(){
          emailNotification.play();
        }
      });
    }
    var responseTime;
    var endMeasure;
    var validTime = 0;
    function measureResponseTime (){
      responseTime = 0;
      var measureTime = setInterval(function(){
        if(endMeasure){
          if(validTime){
            console.log("Collecting email response time");
            timeRespondingEmail.push(responseTime);
            validTime = 0;
          }
          clearInterval(measureTime);
        }
        if(paused == 0){responseTime++;}
      },1000);
    }
    var redirectIn = 0;
    var notificationPressed = 0;
    function setRedirect(time){
      console.log("Displaying redirect timer");
      redirectIn = time;
      //Updates the first time displayed, turns on clock
      document.getElementById("redirect").innerHTML = "Redirecting in";
      document.getElementById("stopTimer").innerHTML = convertTime(redirectIn);
      document.getElementById("timerPane").style.display = "block";
      //Initiate countdown
      stopTimer = setInterval(function(){
        if(paused == 0){redirectIn--;}
        document.getElementById("redirect").innerHTML = "Redirecting in";
        document.getElementById("stopTimer").innerHTML = convertTime(redirectIn);
        //Checks to see if notification has been clicked
        if(redirectIn < 0 || notificationPressed == 1){
          redirectIn = 0;
          document.getElementById("stopTimer").innerHTML = 0;
          console.log("Resolving redirect timer");
          if(warningTimeFlag != 0){
            document.getElementById("timerPane").style.display = "none";
          }
          clearInterval(stopTimer);
          timestampClickedNotification.push(writingTime);
          clearNotification();
          $(".essayText").blur();
          if(sessionComplete == 0){
            document.getElementById("emailPane").style.display = "block";
            movePane("#emailPane");
          }
        }
      },1000);
    }

    //EMAIL FUNCTIONS
    //Checks if notification has been pressed and interrupts redirect timer
    function emailPressed() {
      console.log("Email notifcation pressed by hand");
      notificationPressed = 1;
      timesClickedNotification++;
    }
    //Returns participant to inbox view and resets email
    var lastRead;
    var unreadStatus = 1;//1 is not unread
    var openEmailTime;
    function markUnread(){
      var currentEmail = $(lastRead).data("emailid");
      console.log("Adding unread tally to email# "+currentEmail);
      markUnreadClicks[currentEmail - 1]++;
      console.log("Marked email as unread");
      //reset measurement and dont record time
      validTime = 0;
      endMeasure = 1;
      openEmailCheck = 1;
      //Disable view overlays
      document.getElementById("emailMessage").style.display = "none";
      document.getElementById("responseField").style.display = "none";
      document.getElementById("sendEmail").style.display = "none";
      $("#responseField").blur();
      //Wipe entered data from textarea
      $("#responseField").val("");
      $(lastRead).addClass("unreadEmail");
      $(lastRead).removeClass("activeEmail");
    }
    //Loads message view from inbox click
    function openEmail(element){
      markUnreadCheck = 1;
      console.log("Opening email message");
      //Start measuring response time
      endMeasure = 0;
      measureResponseTime();
      openEmailTime = writingTime;
      //Used to enable mark unread
      lastRead = element;
      //Signals which email to load into message view
      $(element).addClass("activeEmail");
      //Copies data from html into message view
      var emailNodes = element.children;
      var messageNodes = document.getElementById("emailMessage").children;
      messageNodes[0].innerHTML = emailNodes[0].innerHTML;
      messageNodes[1].innerHTML = emailNodes[1].innerHTML;
      messageNodes[2].innerHTML = emailNodes[2].innerHTML
      messageNodes[3].innerHTML = emailNodes[3].innerHTML;
      //Removes css style from email
      $(element).removeClass("unreadEmail");
      //Turn on correct view displays
      document.getElementById("emailMessage").style.display = "block";
    }
    //Reply button on message window
    function reply2Email(){
      console.log("Reply button activated");
      document.getElementById("responseField").style.display = "block";
      document.getElementById("sendEmail").style.display = "block";
      document.getElementById("responseField").focus();
       $('html,body').animate({scrollTop: $("#responseField").offset().top},'slow');
    }

    //Sending email
    var batchCounter = numberOfEmails;
    //emailIndex.length is used in this function to serve as a progress metric for intermittent condition
    //Intermittent process actually pop()s emails from existence 0.0
    //Batch uses its own counter to handle the remaining emails
    function sendEmail (){
      var tempEmpty = $("#responseField").val();
      if(tempEmpty != ""){
        console.log("Sending email response");
        openEmailCheck = 1;
        //reset measurement and set valid flag to record time
        validTime = 1;
        endMeasure = 1;
        timestampClickedSend.push(writingTime);
        timestampClickedOpen.push(openEmailTime);
        //Animate confirmation message
        document.getElementById("messageSentNotification").style.display = "block";
        anime({
          targets: "#messageSentNotification",
          duration: 2000,
          opacity: [0,1],
          easing: 'easeOutQuint',
          complete: function(){
            //Record participant response and matching email prompt
            $('html,body').animate({scrollTop: $("#emailPane").offset().top},'slow');
            var response = $("#responseField").val();
            var object = $('.activeEmail')[0];
            var email = $(object).data("emailid");
            emailResponses.push(response);
            emailID.push(email);
            console.log([emailResponses,emailID]);
            //delete email from inbox
            $("#responseField").val("");
            document.getElementsByClassName('activeEmail')[0].style.display = "none";
            $(".activeEmail").removeClass("activeEmail");
            //return to inbox screen
            document.getElementById("emailMessage").style.display = "none";
            document.getElementById("responseField").style.display = "none";
            document.getElementById("sendEmail").style.display = "none";
            document.getElementById("messageSentNotification").style.display = "none";
            //if all emails have been answered return to essay
            var condition = document.getElementById("dataEmail").value;
            batchCounter--;
            console.log("Emails in system: " + emailIndex.length);
            console.log("Batch Counter: " + batchCounter);
            emailCompleted = numberOfEmails - batchCounter;
            emailLeftover = batchCounter;
            saveDataLocal();
            if(condition == "batch" && batchCounter <= 0){
              //Participant no longer in email viewer
              respondingEmail = 0;
              moveBackPane("emailPane");
              console.log("Batch COMPLETED");
              //check when they resume writing
              checkWriting = 1;
            }
            else if(condition == "intermittent"){
              //Participant no longer in email viewer
              respondingEmail = 0;
              moveBackPane("emailPane");
              console.log("Single email completed");
              //check when they resume writing
              checkWriting = 1;
              var timeCheck = writingTime - intermittentTime[intermittentIndex];
              var timeLimit = warningLength;
              console.log("Time Check: " + timeCheck + "; Emails Leftover: " + emailIndex.length);
              if(timeCheck > timeLimit && emailIndex.length > 0){
                emailTimer();
                console.log("Initiating additional email with notification in: " + intermittentTime[intermittentIndex] + " seconds");
                sendEmailCheck = 1;
              }
              else {
                console.log("Intermittent COMPLETED");
                console.log("Emails left uncompleted: " + emailIndex.length);
              }
            }
            else {//batch condition and still needing to respond
              sendEmailCheck = 1;
            }
          }
        });
      }
      else {
        document.getElementById("messageFailedNotification").style.display = "block";
        anime({
          targets: "#messageFailedNotification",
          duration: 2000,
          opacity: [0,1],
          easing: 'easeOutQuint',
          complete: function(){
            document.getElementById("messageFailedNotification").style.display = "none";
            sendEmailCheck = 1;
          }});
      }//email field is empty
    }

    //MOVEMENT FUNCTIONS
    //Turn display for any element to none
    function hidePane(element){
      anime({
        targets: "#"+element,
        duration: 50,
        delay: 10,
        easing: 'easeOutQuint',
        complete: function(){document.getElementById(element).style.display = "none";}
      });
    }
    //Shifts <section> from initial storage into view
    function movePane(element){
      anime({
        targets: element,
        duration: 500,
        left: ["200%",'0%'],
        easing: 'easeOutQuint'
      });
    }
    //Shifts <section> from view into storage
    function moveBackPane(element){
      anime({
        targets: "#"+element,
        duration: 500,
        left: ["0%",'200%'],
        easing: 'easeInExpo',
        complete: function(){
          document.getElementById(element).style.display = "none";
        }
      });
    }
    //Create a local version of the data
    function saveDataLocal(){
      console.log("Saving local data");
      console.log(window.localStorage);
      localStorage.setItem('T_id', JSON.stringify(T_id));
      localStorage.setItem('condition1', JSON.stringify(condition1));
      localStorage.setItem('condition2', JSON.stringify(condition2));

      localStorage.setItem('essayResponses', JSON.stringify(essayResponses));
      localStorage.setItem('baselineResponseTime', JSON.stringify(baselineResponseTime));
      localStorage.setItem('baselineUnfocused', JSON.stringify(baselineUnfocused));
      localStorage.setItem('dualResponseTime', JSON.stringify(dualResponseTime));
      localStorage.setItem('dualUnfocused', JSON.stringify(dualUnfocused));

      localStorage.setItem('timesClickedNotification', JSON.stringify(timesClickedNotification));
      localStorage.setItem('intermittentTimings', JSON.stringify(intermittentTimings));

      localStorage.setItem('emailResponses', JSON.stringify(emailResponses));
      localStorage.setItem('emailID', JSON.stringify(emailID));
      localStorage.setItem('timeRespondingEmail', JSON.stringify(timeRespondingEmail));
      localStorage.setItem('timestampClickedOpen', JSON.stringify(timestampClickedOpen));
      localStorage.setItem('timestampClickedSend', JSON.stringify(timestampClickedSend));
      localStorage.setItem('timestampClickedNotification', JSON.stringify(timestampClickedNotification));
      localStorage.setItem('timestampResumedWriting', JSON.stringify(timestampResumedWriting));
      localStorage.setItem('markUnreadClicks', JSON.stringify(markUnreadClicks));
      localStorage.setItem('emailCompleted', JSON.stringify(emailCompleted));
      localStorage.setItem('emailLeftover', JSON.stringify(emailLeftover));

      localStorage.setItem('mouseClicks', JSON.stringify(mouseClicks));
      localStorage.setItem('pausedNumber', JSON.stringify(pausedNumber));
      localStorage.setItem('phaseTimestamps', JSON.stringify(phaseTimestamps));
    }
    //print out the local data
    //this function can erase active recordings of variables. ONLY USE THIS AT THE BEGINNING OF A SESSION TO RECALL THE PREVIOUS SESSION THAT WAS "LOST"
    function printLocalData(){
      console.log("Printing local storage");
      console.log(window.localStorage);

      T_id = JSON.parse(localStorage.getItem('T_id'));
      condition1 = JSON.parse(localStorage.getItem('condition1'));
      condition2 = JSON.parse(localStorage.getItem('condition2'));

      essayResponses = JSON.parse(localStorage.getItem('essayResponses'));
      baselineResponseTime = JSON.parse(localStorage.getItem('baselineResponseTime'));
      baselineUnfocused = JSON.parse(localStorage.getItem('baselineUnfocused'));
      dualResponseTime = JSON.parse(localStorage.getItem('dualResponseTime'));
      dualUnfocused = JSON.parse(localStorage.getItem('dualUnfocused'));

      timesClickedNotification = JSON.parse(localStorage.getItem('timesClickedNotification'));
      intermittentTimings = JSON.parse(localStorage.getItem('intermittentTimings'));

      emailResponses = JSON.parse(localStorage.getItem('emailResponses'));
      emailID = JSON.parse(localStorage.getItem('emailID'));
      timeRespondingEmail = JSON.parse(localStorage.getItem('timeRespondingEmail'));
      timestampClickedOpen = JSON.parse(localStorage.getItem('timestampClickedOpen'));
      timestampClickedSend = JSON.parse(localStorage.getItem('timestampClickedSend'));
      timestampClickedNotification = JSON.parse(localStorage.getItem('timestampClickedNotification'));
      timestampResumedWriting = JSON.parse(localStorage.getItem('timestampResumedWriting'));
      markUnreadClicks = JSON.parse(localStorage.getItem('markUnreadClicks'));
      if(localStorage.getItem('emailCompleted') === null){
        emailCompleted = 0;
      }
      else{
        emailCompleted = JSON.parse(localStorage.getItem('emailCompleted'));
      }
      if(localStorage.getItem('emailLeftover') === null){
        emailLeftover = 0;
      }
      else{
        emailLeftover = JSON.parse(localStorage.getItem('emailLeftover'));
      }

      mouseClicks = JSON.parse(localStorage.getItem('mouseClicks'));
      pausedNumber = JSON.parse(localStorage.getItem('pausedNumber'));
      phaseTimestamps = JSON.parse(localStorage.getItem('phaseTimestamps'));

      saveData();
    }
    //SAVE Data
    function saveData() {
        console.log("Saving data in excel sheet");
        //Complete missing data and clean other things up
        if(emailResponses.length < numberOfEmails){
          //referencing larger array
          var indexModifier = emailResponses.length;
          //calculate number of missing cells
          var temp = numberOfEmails - emailResponses.length;
          console.log("Filling empty cells for "+temp+" emails");
          for(var i = 0; i < temp; i++){
            emailResponses.push("NA");
            timestampClickedSend.push(essayLength);
            timestampClickedOpen.push(essayLength);
            timeRespondingEmail.push(0);
            emailID.push(0);
            //Just lists the emails not responded to
            if(condition2 == "intermittent"){
              intermittentTimings[i + indexModifier] = 0;
              if(timestampClickedNotification[i + indexModifier] === "undefined"){
                timestampClickedNotification.push(essayLength);
              }
              else{
                timestampClickedNotification[i + indexModifier] = essayLength;
              }
              timestampResumedWriting.shift();
              timestampResumedWriting.push(essayLength);
            }
          }
        }
        if(condition2 == "batch"){
          for(var i = 0; i < intermittentTimings.length; i++){
            intermittentTimings[i] = batchFirstNotification;
          }
          var tempValue = timestampClickedNotification[0];
          for(var i = 1; i < numberOfEmails; i++){
            timestampClickedNotification.push(tempValue);
            timestampResumedWriting[i - 1] = timestampResumedWriting[numberOfEmails - 1];
          }
        }
        //Data structure
        const excelOutput = {
          filename: condition2+"-"+condition1+"-"+T_id,
          sheet: {
            data: [
              [{value: 'Participant ID', type: 'string'},/////////////////////////////row1
              {value: 'Stress Level', type: 'string'},
              {value: 'Email Mode', type: 'string'},
              {value: 'Emails Completed', type: 'string'},
              {value: 'Emails Leftover', type: 'string'},
              {value: 'Times Clicked Mouse', type: 'string'},
              {value: 'Times Paused', type: 'string'},
              {value: 'Times Clicked Email Notification', type: 'string'},
              {value: 'Baseline Stress Timestamp', type: 'string'},
              {value: 'Camera Calibration Timestamp', type: 'string'},
              {value: 'Baseline Essay Timestamp', type: 'string'},
              {value: 'Stress Condition Timestamp', type: 'string'},
              {value: 'Dual Essay Timestamp', type: 'string'},
              {value: 'Post Survey Timestamp', type: 'string'},
              {value: "Email 1 Clicked Unread", type: 'string'},
              {value: "Email 2 Clicked Unread", type: 'string'},
              {value: "Email 3 Clicked Unread", type: 'string'},
              {value: "Email 4 Clicked Unread", type: 'string'},
              {value: "Email 5 Clicked Unread", type: 'string'},
              {value: "Email 6 Clicked Unread", type: 'string'},
              {value: "Email 7 Clicked Unread", type: 'string'},
              {value: "Email 8 Clicked Unread", type: 'string'},
              // {value: "Email 9 Clicked Unread", type: 'string'},
              // {value: "Email 10 Clicked Unread", type: 'string'},
              {value: 'Essay Baseline Content', type: 'string'},/////////////////////////////essay data
              {value: 'Essay Baseline Response Time', type: 'string'},
              {value: 'Essay Baseline TIMES STOPPED WRITING', type: 'string'},
              {value: 'Essay Dualtask Content', type: 'string'},
              {value: 'Essay Dualtask Response Time', type: 'string'},
              {value: 'Essay Dualtask TIMES STOPPED WRITING', type: 'string'},
              {value: "Email "+emailID[0]+" Content", type: 'string'},//////////////email data
              {value: "Email "+emailID[1]+" Content", type: 'string'},
              {value: "Email "+emailID[2]+" Content", type: 'string'},
              {value: "Email "+emailID[3]+" Content", type: 'string'},
              {value: "Email "+emailID[4]+" Content", type: 'string'},
              {value: "Email "+emailID[5]+" Content", type: 'string'},
              {value: "Email "+emailID[6]+" Content", type: 'string'},
              {value: "Email "+emailID[7]+" Content", type: 'string'},
              // {value: "Email "+emailID[8]+" Content", type: 'string'},
              // {value: "Email "+emailID[9]+" Content", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              {value: "Email Interaction Order", type: 'string'},
              // {value: "Email Interaction Order", type: 'string'},
              // {value: "Email Interaction Order", type: 'string'},
              {value: "Email "+emailID[0]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[1]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[2]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[3]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[4]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[5]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[6]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[7]+" Time Until Notification", type: 'string'},
              // {value: "Email "+emailID[8]+" Time Until Notification", type: 'string'},
              // {value: "Email "+emailID[9]+" Time Until Notification", type: 'string'},
              {value: "Email "+emailID[0]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[1]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[2]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[3]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[4]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[5]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[6]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[7]+" Client Started Time", type: 'string'},
              // {value: "Email "+emailID[8]+" Client Started Time", type: 'string'},
              // {value: "Email "+emailID[9]+" Client Started Time", type: 'string'},
              {value: "Email "+emailID[0]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[1]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[2]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[3]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[4]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[5]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[6]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[7]+" Open Email Time", type: 'string'},
              // {value: "Email "+emailID[8]+" Open Email ime", type: 'string'},
              // {value: "Email "+emailID[9]+" Open Email Time", type: 'string'},
              {value: "Email "+emailID[0]+" Ending Time", type: 'string'},
              {value: "Email "+emailID[1]+" Ending Time", type: 'string'},
              {value: "Email "+emailID[2]+" Ending Time", type: 'string'},
              {value: "Email "+emailID[3]+" Ending Time", type: 'string'},
              {value: "Email "+emailID[4]+" Ending Time", type: 'string'},
              {value: "Email "+emailID[5]+" Ending Time", type: 'string'},
              {value: "Email "+emailID[6]+" Ending Time", type: 'string'},
              {value: "Email "+emailID[7]+" Ending Time", type: 'string'},
              // {value: "Email "+emailID[8]+" Ending Time", type: 'string'},
              // {value: "Email "+emailID[9]+" Ending Time", type: 'string'},
              {value: "Essay Resume Time 1", type: 'string'},
              {value: "Essay Resume Time 2", type: 'string'},
              {value: "Essay Resume Time 3", type: 'string'},
              {value: "Essay Resume Time 4", type: 'string'},
              {value: "Essay Resume Time 5", type: 'string'},
              {value: "Essay Resume Time 6", type: 'string'},
              {value: "Essay Resume Time 7", type: 'string'},
              {value: "Essay Resume Time 8", type: 'string'},
              // {value: "Essay Resume Time 9", type: 'string'},
              // {value: "Essay Resume Time 10", type: 'string'},
              {value: "Email "+emailID[0]+" Response Time", type: 'string'},
              {value: "Email "+emailID[1]+" Response Time", type: 'string'},
              {value: "Email "+emailID[2]+" Response Time", type: 'string'},
              {value: "Email "+emailID[3]+" Response Time", type: 'string'},
              {value: "Email "+emailID[4]+" Response Time", type: 'string'},
              {value: "Email "+emailID[5]+" Response Time", type: 'string'},
              {value: "Email "+emailID[6]+" Response Time", type: 'string'},
              // {value: "Email "+emailID[7]+" Response Time", type: 'string'},
              // {value: "Email "+emailID[8]+" Response Time", type: 'string'},
              {value: "Email "+emailID[7]+" Response Time", type: 'string'}],
              [{value: T_id, type: 'string'},/////////////////////////////row2
              {value: condition1, type: 'string'},
              {value: condition2, type: 'string'},
              {value: emailCompleted, type: 'number'},
              {value: emailLeftover, type: 'number'},
              {value: mouseClicks, type: 'number'},
              {value: pausedNumber, type: 'number'},
              {value: timesClickedNotification, type: 'number'},
              {value: phaseTimestamps[0], type: 'string'},
              {value: phaseTimestamps[1], type: 'string'},
              {value: phaseTimestamps[2], type: 'string'},
              {value: phaseTimestamps[3], type: 'string'},
              {value: phaseTimestamps[4], type: 'string'},
              {value: phaseTimestamps[5], type: 'string'},
              {value: markUnreadClicks[0], type: 'number'},
              {value: markUnreadClicks[1], type: 'number'},
              {value: markUnreadClicks[2], type: 'number'},
              {value: markUnreadClicks[3], type: 'number'},
              {value: markUnreadClicks[4], type: 'number'},
              {value: markUnreadClicks[5], type: 'number'},
              {value: markUnreadClicks[6], type: 'number'},
              {value: markUnreadClicks[7], type: 'number'},
              // {value: markUnreadClicks[8], type: 'number'},
              // {value: markUnreadClicks[9], type: 'number'},
              {value: essayResponses[0], type: 'string'},/////////////////////////////essay data
              {value: baselineResponseTime, type: 'number'},
              {value: baselineUnfocused, type: 'number'},
              {value: essayResponses[1], type: 'string'},
              {value: dualResponseTime, type: 'number'},
              {value: dualUnfocused, type: 'number'},
              {value: emailResponses[0], type: 'string'},/////////////////////////////email data
              {value: emailResponses[1], type: 'string'},
              {value: emailResponses[2], type: 'string'},
              {value: emailResponses[3], type: 'string'},
              {value: emailResponses[4], type: 'string'},
              {value: emailResponses[5], type: 'string'},
              {value: emailResponses[6], type: 'string'},
              {value: emailResponses[7], type: 'string'},
              // {value: emailResponses[8], type: 'string'},
              // {value: emailResponses[9], type: 'string'},
              {value: emailID[0], type: 'number'},
              {value: emailID[1], type: 'number'},
              {value: emailID[2], type: 'number'},
              {value: emailID[3], type: 'number'},
              {value: emailID[4], type: 'number'},
              {value: emailID[5], type: 'number'},
              {value: emailID[6], type: 'number'},
              {value: emailID[7], type: 'number'},
              // {value: emailID[8], type: 'number'},
              // {value: emailID[9], type: 'number'},
              {value: intermittentTimings[0], type: 'number'},
              {value: intermittentTimings[1], type: 'number'},
              {value: intermittentTimings[2], type: 'number'},
              {value: intermittentTimings[3], type: 'number'},
              {value: intermittentTimings[4], type: 'number'},
              {value: intermittentTimings[5], type: 'number'},
              {value: intermittentTimings[6], type: 'number'},
              {value: intermittentTimings[7], type: 'number'},
              // {value: intermittentTimings[8], type: 'number'},
              // {value: intermittentTimings[9], type: 'number'},
              {value: essayLength - timestampClickedNotification[0], type: 'number'},
              {value: essayLength - timestampClickedNotification[1], type: 'number'},
              {value: essayLength - timestampClickedNotification[2], type: 'number'},
              {value: essayLength - timestampClickedNotification[3], type: 'number'},
              {value: essayLength - timestampClickedNotification[4], type: 'number'},
              {value: essayLength - timestampClickedNotification[5], type: 'number'},
              {value: essayLength - timestampClickedNotification[6], type: 'number'},
              {value: essayLength - timestampClickedNotification[7], type: 'number'},
              // {value: essayLength - timestampClickedNotification[8], type: 'number'},
              // {value: essayLength - timestampClickedNotification[9], type: 'number'},
              {value: essayLength - timestampClickedOpen[0], type: 'number'},
              {value: essayLength - timestampClickedOpen[1], type: 'number'},
              {value: essayLength - timestampClickedOpen[2], type: 'number'},
              {value: essayLength - timestampClickedOpen[3], type: 'number'},
              {value: essayLength - timestampClickedOpen[4], type: 'number'},
              {value: essayLength - timestampClickedOpen[5], type: 'number'},
              {value: essayLength - timestampClickedOpen[6], type: 'number'},
              {value: essayLength - timestampClickedOpen[7], type: 'number'},
              // {value: essayLength - timestampClickedOpen[8], type: 'number'},
              // {value: essayLength - timestampClickedOpen[9], type: 'number'},
              {value: essayLength - timestampClickedSend[0], type: 'number'},
              {value: essayLength - timestampClickedSend[1], type: 'number'},
              {value: essayLength - timestampClickedSend[2], type: 'number'},
              {value: essayLength - timestampClickedSend[3], type: 'number'},
              {value: essayLength - timestampClickedSend[4], type: 'number'},
              {value: essayLength - timestampClickedSend[5], type: 'number'},
              {value: essayLength - timestampClickedSend[6], type: 'number'},
              {value: essayLength - timestampClickedSend[7], type: 'number'},
              // {value: essayLength - timestampClickedSend[8], type: 'number'},
              // {value: essayLength - timestampClickedSend[9], type: 'number'},
              {value: essayLength - timestampResumedWriting[0], type: 'number'},
              {value: essayLength - timestampResumedWriting[1], type: 'number'},
              {value: essayLength - timestampResumedWriting[2], type: 'number'},
              {value: essayLength - timestampResumedWriting[3], type: 'number'},
              {value: essayLength - timestampResumedWriting[4], type: 'number'},
              {value: essayLength - timestampResumedWriting[5], type: 'number'},
              {value: essayLength - timestampResumedWriting[6], type: 'number'},
              {value: essayLength - timestampResumedWriting[7], type: 'number'},
              // {value: essayLength - timestampResumedWriting[8], type: 'number'},
              // {value: essayLength - timestampResumedWriting[9], type: 'number'},
              {value: timeRespondingEmail[0], type: 'number'},
              {value: timeRespondingEmail[1], type: 'number'},
              {value: timeRespondingEmail[2], type: 'number'},
              {value: timeRespondingEmail[3], type: 'number'},
              {value: timeRespondingEmail[4], type: 'number'},
              {value: timeRespondingEmail[5], type: 'number'},
              {value: timeRespondingEmail[6], type: 'number'},
              // {value: timeRespondingEmail[7], type: 'number'},
              // {value: timeRespondingEmail[8], type: 'number'},
              {value: timeRespondingEmail[7], type: 'number'}]
            ]
          }
        };
        //saveDataLocal();
        zipcelx(excelOutput);
        window.localStorage.clear();
    }

    var switchNoise = new Audio('audio/ding.wav');
    //Moves the current <section> to the left, and stored <section> to the left
    function switchPane(value){
      //Advance through the <sections>
      if(value == 1){

        var today = new Date();
        var hour = today.getHours();
        var seconds = today.getSeconds();
        var minutes = today.getMinutes();
        phaseTimestamps.push(hour+":"+minutes+":"+seconds);

        //Check to see if participant in on final screen
        if(sceneIndex+1 == sceneArray.length-1){
          //incomplete = "";
          saveData();
        }
        document.getElementById(sceneArray[sceneIndex+1]).style.display = "block";
        switchNoise.play();
        var timeline = anime.timeline();
        timeline.add({
          targets: "#"+sceneArray[sceneIndex],
          duration: 300,
          delay: 300,
          left: ["0%","-200%"],
          easing: 'easeOutQuint',
          complete: function(){document.getElementById(sceneArray[sceneIndex]).style.display = "none";}
        }).add({
          targets: "#"+sceneArray[sceneIndex+1],
          duration: 300,
          left: ["200%",'0%'],
          easing: 'easeOutQuint',
          complete:function(){
            sceneIndex++;
            console.log("Current screen: " + sceneArray[sceneIndex]);
            expiredDoubleClick = 1;
          }
        });
      }
      //Limited usage reverse button
      else{
        document.getElementById(sceneArray[sceneIndex-1]).style.display = "block";
        var timeline = anime.timeline();
        timeline.add({
          targets: "#"+sceneArray[sceneIndex],
          duration: 300,
          delay: 300,
          left: ['0%',"200%"],
          easing: 'easeOutQuint',
          complete: function(){document.getElementById(sceneArray[sceneIndex]).style.display = "none";}
        }).add({
          targets: "#"+sceneArray[sceneIndex-1],
          duration: 300,
          left: ["-200%","0%"],
          easing: 'easeOutQuint',
          complete:function(){
            if(sceneIndex != 0){
              sceneIndex--;
            }
          }
        });
      }
    }

    //GENERAL UTILITY FUNCTION
    function checkTime(i) {
      if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
      return i;
    }
    function getTime(){
      var today = new Date();
      var h = today.getHours();
      var m = today.getMinutes();
      m = checkTime(m);
      var sun = h >= 12 ? "PM" : "AM";
      if(h > 12){ h -= 12;}
      return h + ":" + m + " " + sun;
    }
    //Counts mouse clicks
    document.onclick = function(){
      mouseClicks++;
    }
    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }
    function shuffleEmailList(){
      var parent = $("#emailList");
      var divs = parent.children();
      while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
      }
    }

});
