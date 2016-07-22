$(document).ready(function(){
	
//	var whiteSpace = $('#containerTrainer').html().replace(/\r|\n/gm, "");


	
	for(i = 0; i < CreateDistricts.length; i++){

		var location = CreateDistricts[i].location.split(' ').join('');
		var name = CreateDistricts[i].location;

		$("#containerDistrict").append('<div id="'+location+'" class="badge" data-location="'+name+'"><p>'+name+'</p></div>');
	}
	
	var districtObjects = [];
	var districtNames = []
	
	
	for(i = 0; i < Trainers.length; i++){
		console.log(i);
		if( !($.inArray(Trainers[i].getDistrict(), districtNames) > -1) )
		{
			var district = Trainers[i].getDistrict();
			districtNames.push(district);
			
			var gyms = 0;
			var stops = 0;
			for(j = 0; j < CreateDistricts.length; j++){
				if(CreateDistricts[j].getLocation() == district){
					gyms = CreateDistricts[j].gyms;
					stops = CreateDistricts[j].stops;
				}
			}
			
			districtObjects.push({"name":district,"count":0, "mystic":0, "valor":0, "instinct":0, "gyms":gyms, "stops":stops});
		}
		
		var counted = false;
		var districtIndex = 0;
		
		while(counted == false){
			
			if(districtObjects[districtIndex].name == Trainers[i].getDistrict()){
			
				if(Trainers[i].getTeam() == "Mystic" || Trainers[i].getTeam() == "Harmony" ){
					districtObjects[districtIndex].mystic += 1;
				}
				
				else if(Trainers[i].getTeam() == "Valor"){
					districtObjects[districtIndex].valor += 1;
				}
				
				else if(Trainers[i].getTeam() == "Instinct"){
					districtObjects[districtIndex].instinct += 1;
				}
				
				else{}
				
				districtObjects[districtIndex].count += 1;
				counted = true;
			}
			districtIndex++;
		}
	}
	
	$(".badge").click(function() {
	
		$(".badge").removeClass("activeBadge");
		$(this).addClass("activeBadge");
		$("#enterSocial").addClass("activeSocial");

		for(i = 0; i < districtObjects.length; i++){
			
			if($(this).data("location") == districtObjects[i].name){
				var location = districtObjects[i].name;//.split(' ').join('');
				var totalCount = districtObjects[i].count;
				var mysticCount = 40 * (districtObjects[i].mystic / totalCount);
				var valorCount = 40 * (districtObjects[i].valor / totalCount);
				var instinctCount = 40 * (districtObjects[i].instinct / totalCount);
				
				
				$("#gymCount").html("Gyms: "+districtObjects[i].gyms);
				$("#stopCount").html("Stops: "+districtObjects[i].stops);
				$("#trainerCount").html("Trainers: "+districtObjects[i].count);
				$("#mysticTower").css("width", mysticCount+"vw");
				$("#valorTower").css("width", valorCount+"vw");
				$("#instinctTower").css("width", instinctCount+"vw");
				
				$("#enterSocial").data("location", location);
				
			}
		}
	});
	
	$("#enterSocial").click(function() {
		var location = $("#enterSocial").data("location");
		window.location.href = "TrainerTemplate.html#"+location;
	});
	
	$("#burgerMenu").click(function(){
		document.getElementById("aboutOverlay").style.display = "inline-block";
		document.getElementById("siteNav").style.display = "none";
		document.getElementById("containerDistrict").style.display = "none";
		document.getElementById("districtInfo").style.display = "none";
	});
	$("#closeAbout").click(function(){
		document.getElementById("aboutOverlay").style.display = "none";
		document.getElementById("siteNav").style.display = "inline-block";
		document.getElementById("containerDistrict").style.display = "block";
		document.getElementById("districtInfo").style.display = "block";
	});
	
	$("#join").click(function(){
	
		$(this).toggleClass("clicked");
	
		if($(this).hasClass("clicked")){
		
			$("#menuInfo").html('<p>So you want a player icon and name?</p><p>Just tweet me using the button below which player icon you want, your team, and where you most frequently play: I will add your Twitter handle to the social nexus GoGreet and find or create a play region for you.</p> <p>By joining, you can participate in what other players are saying more easily and collaborate with friends to take on gyms.</p><p>Poke Go fan-site. Not officially affiliated with Pokemon Go or Niantic Labs.</p><a href="https://twitter.com/intent/tweet?original_referer=http%3A%2F%2Flocalhost%3A4000%2FTrainerTemplate.html&amp;ref_src=twsrc%5Etfw&amp;screen_name=NicholasPersa&amp;tw_p=tweetbutton" target="_blank"><div id="tweetMe"><p>Tweet Me</p></div></a>');
			
			$("#join").html('<p>Return</p>');
			
		}
		else{
			$("#menuInfo").html('<p>Welcome to GoGreet: a social nexus designed for Pokemon Go. This is an unofficial fan-site authored by myself. I study and research digital media and have an interest in learning about collaborative social interactions.</p><p>I hope that this website helps players meet and plan in-game events. The site is being hosted on GitHub and I am using Twitter to create player profiles and send messages. In order to particiapte you will need to have or create a Twitter account. This site is experimental and its purpose is for educating myself on social interactions and web design.</p><p>If you have ideas about what would help develop this idea, get in touch with me on Twitter <a href="https://twitter.com/NicholasPersa" target="_blank">@NicholsaPersa</a></p><p>Poke Go fan-site. Not officially affiliated with Pokemon Go or Niantic Labs.</p>');
			
			$("#join").html('<p>Join?</p>');
		}
	});

});














