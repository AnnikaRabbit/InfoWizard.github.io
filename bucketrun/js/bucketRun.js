

$(document).ready(function(){

	function ReadCookie()
	{
		var allcookies = document.cookie;
		//document.write ("All Cookies : " + allcookies );
		
			// Get all the cookies pairs in an array
		cookiearray = allcookies.split(';');
		
			// Now take key value pair out of this array
		for(var i=0; i<cookiearray.length; i++){
			name = cookiearray[i].split('=')[0];
			value = cookiearray[i].split('=')[1];
			console.log ("Key is : " + name + " and Value is : " + value);
			if(name == "BucketScore"){
				score = value;
				$("#counter").html("Buckets Caught: "+score);
			}
		}
	}
	
	function WriteCookie() {
		document.cookie = "BucketScore="+score+";expires=Sa, 19 Apr 2070 00:00:01 GMT";
	}
	
	characterController = setInterval(CharacterAnim, 250);
	faintController = null;
	bucketRunInterval = null;

	//moving = false;
	airborne = true;
	idle = 0;
	runningFrame = 0;
	movingLeft = false;
	clicked = false;
	fainting = false;
	faintingFrame = 0;
	invulnerable = 0;
	score = 0;
	ReadCookie();
	
	//lowLag.init();
	//lowLag.load("sound/Electro Cabello.mp3", "bkMusic");
	//backgroundMusic = document.getElementById("bkMusic");
	//backgroundMusic.play();
	//slip = document.getElementById("slip");

	function FaintAnim () {
	
			if(faintingFrame == 0){
				document.getElementById("bucket").src = "images/bucket/faint/frame-1.png";
				faintingFrame++;
			}
			else if(faintingFrame == 1){
				document.getElementById("bucket").src = "images/bucket/faint/frame-2.png";
				faintingFrame++;
			}
			else if(faintingFrame == 2){
				document.getElementById("bucket").src = "images/bucket/faint/frame-3.png";
				faintingFrame++;
			}
			else if(faintingFrame == 3){
				document.getElementById("bucket").src = "images/bucket/faint/frame-4.png";
				faintingFrame++;
			}
			else {
				document.getElementById("bucket").src = "images/bucket/faint/frame-5.png";
				faintingFrame = 0;
				clicked = false;
				clearInterval(faintController);
				setTimeout( function(){
					characterController = setInterval(CharacterAnim, 200);
					bucketRunInterval = setInterval(BucketRun, 1000);
					
					document.getElementById("messageBox").style.display = "block";
					$("#bucket").click(function(){
						CheckBucketClick();
					});
					
				},4000);
			}
	}
	
	function CharacterAnim (){
	
		if(clicked){
			$("#bucket").stop();
			idle = 1;
			clearInterval(characterController);
			faintController = setInterval(FaintAnim, 200);
			score++;
			WriteCookie();
			$("#counter").html("Buckets Caught: "+score);
		}
		
		if(!airborne && !clicked){
			if(idle > 0){
				
				//reset
				runningFrame = 0;
				
				if(idle ==1){
					document.getElementById("bucket").src = "images/bucket/standing/frame-1.png";
					idle = 2;
				}
				else {
					document.getElementById("bucket").src = "images/bucket/standing/frame-2.png";
					idle = 1;
				}
				
			}
			else {

				if(runningFrame == 0){
					document.getElementById("bucket").src = "images/bucket/run/frame-1.png";
					runningFrame++;
				}
				else if(runningFrame == 1){
					document.getElementById("bucket").src = "images/bucket/run/frame-2.png";
					runningFrame++;
				}
				else if(runningFrame == 2){
					document.getElementById("bucket").src = "images/bucket/run/frame-3.png";
					runningFrame++;
				}
				else if(runningFrame == 3){
					document.getElementById("bucket").src = "images/bucket/run/frame-4.png";
					runningFrame++;
				}
				else {
					document.getElementById("bucket").src = "images/bucket/run/frame-5.png";
					runningFrame = 0;
				}
				
			}
			
			if(movingLeft){
				$("#bucket").removeClass("regular");
				$("#bucket").addClass("flipped");
			}
			else{
				$("#bucket").removeClass("flipped");
				$("#bucket").addClass("regular");
			}
			
		}
		
	}
	
	function BucketRun () {
		idle = 0;
		runningFrame = 0;
		width = 100 * Math.random() - 45;
		height = 100 * Math.random() - 50;
		
		target = $("#bucket");
		currentPosition = 100 * (target.position().left / $(window).width());
		
		if(width < currentPosition){
			movingLeft = true;
		}
		else {
			movingLeft = false;
		}
		
		$("#bucket").animate({top:height+"vh", left:width+"vw"},1000, function(){/*idle=1;*/});
		
	}
	
	function CheckBucketClick(){
		
		invulnerable++;
	
		if(Math.random() > .65 && invulnerable > 4){
		
			invulnerable = 0;
			$("#bucket").off("click");
			document.getElementById("messageBox").style.display = "none";
			
			//initial dizzy anim from click
			document.getElementById("bucket").src = "images/bucket/dizzy/frame-2.png";
			
			clearInterval(bucketRunInterval);
			clicked = true;
			
			$("#winState").html("You got the bucket!");
			setTimeout(function(){
				$("#winState").html("");
				$("#messageBox").html("");
			},4000);
		}
		else {
			//slip.play();
			$("#messageBox").html("");
			$("#messageBox").removeClass("magictime puffin")
			textMessages = ["Almost!","Look at em go!","Try again!", "TOO FAST 4 U", "I <3 speed"];
			index = Math.floor((1000 * Math.random())) % textMessages.length;
			$("#messageBox").html(textMessages[index]);
			$("#messageBox").addClass("magictime puffin")
			setTimeout(function(){
				$("#messageBox").html("");
				$("#messageBox").removeClass("magictime puffin")
			},1500);
			
		}
	}
	
	$("#presentBox").click(function(){
	 
	 //lowLag.play("bkMusic");
	 $("#boxLid").removeClass("lidShake");
	 
		 //open up the lid fully
	 $("#boxLid").animate({top:"-=10%"},500,"swing");
	 $("#boxBottom").animate({top:"+=20%"},500,"swing");
	 
	 $("#boxLid").addClass("magictime spaceOutUp");
	 $("#boxBottom").addClass("magictime spaceOutDown");
	 
		 //disable click box
	 $("#presentBox").off("click");
	 
		 //peak nugget and welcome him
		 //start the nugg run
	 document.getElementById("bucket").style.display = "block";
	 $("#bucket").addClass("magictime foolishIn");
	 setTimeout( function(){
		 document.getElementById("bucket").src = "images/bucket/jump/jump-fall.png";
		 $("#bucket").animate({top:"+=10%"},500,"swing");
		 setTimeout(function(){
			 airborne = false;
			 idle = 1;
			 $("#bucket").removeClass("magictime foolishIn");
			 
			//start the bucket run
			bucketRunInterval = setInterval(BucketRun, 1000);
			document.getElementById("counter").style.display = "block";
			
			 $("#bucket").click(function(){
				CheckBucketClick();
			 });
			 
		 },500);
		 
		 $("#title").html("Catch him Quick");
		 $("#title").addClass("magictime puffIn");
	 }, 1000);
	 
 });
	
});