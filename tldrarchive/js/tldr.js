

$(document).ready(function(){

	//POPULATE THE ARTICLES INTO THE CONTAINER
	function LoadContainer (items) {
		
		for(var i = 0; i < items.length; i++){
			
			//APPEND EACH ARTICLE IN ARRAY INTO CONTAINER
			if(items[i].getSection() != null){
				$("#itemContainer").append('<a href="'+ items[i].getLink() +'" target="_blank"><div class="linkArticle tranBox '+ items[i].getSection() +'" data-tags="'+items[i].getTags().join(" ")+'"><p class="tags">'+ items[i].getTags().join(" ") +'</p><h6>'+ (i+1) +'</h6><h4>'+ items[i].getSection().substring(0,2) +'</h4><h5>'+ items[i].getTitle() +'</h5></div></a>');
				
				//GET SECTIONS NAMES FOR BUILDING SECTION DROPDOWN MENU
				if( !($.inArray(items[i].getSection(), sectionNames) > -1) )
				{
					sectionNames.push(items[i].getSection());
				}
				
				//GET TAG NAMES FOR BUILDING TAGS DROPDOWN MENU
				for(var j = 0; j < items[i].getTags().length; j++){
					if( !($.inArray(items[i].getTags()[j], tagNames) > -1) )
					{
						tagNames.push(items[i].getTags()[j]);
					}
				}
				
			}
			
		}
	}
	
	//POPULATE THE SEARCH BAR WITH SECTION AND TAG NAMES
	function LoadSearch(sections, tags)
	{
		//SECTION NAMES ARE POPULATED ON ARTICLE LOAD
		//<span class="sectionTooltip">View only</span>
		for(var i = 0; i < sections.length; i++){
			if(sections[i] != null){
				$("#sectionContain").append('<div id="'+ sections[i] +'"><p class="genreToggle" data-type="genre" data-section="'+ sections[i] +'">'+ sections[i] +'</p><div class="visToggle"  data-type="section" data-section="'+ sections[i] +'"><img class="button" src="image/greenButton.png"></div></div>');
			}
		}
		
		//$("#searchContain").append('<div class="titleInfo" data-section="titleInfo"><p>Title</p><div class="visToggle" data-section="null"></div></div><div class="weightInfo" data-section="weightInfo"><p>Weight</p><div class="visToggle" data-section="null"></div></div>')
		
		//SORT BY IS A STATIC SEARCH FIELD, NO
		//$("#sortContain").append('<div class="titleInfo" data-type="titleInfo"><p>Title</p><div class="visToggle" data-type="sort" data-section="titleInfo"><img class="button" src="image/grayButton.png"></div></div><div class="weightInfo" data-type="weightInfo"><p>Weight</p><div class="visToggle" data-section="weightInfo"><img class="button" src="image/grayButton.png"></div></div>')
		
		//TAG NAMES ARE POPULATED ON ARTICLE LOAD
		for(var i = 0; i < tags.length; i++){
			if(tags[i] != null){
				$("#tagInfo").append('<div data-tag="'+tags[i]+'"><p class="tagPToggle" data-type="tag" data-tag="'+tags[i]+'">'+tags[i]+'</p><div id='+"hover"+tags[i]+' class="tagToggle" data-type="tag" data-tag="'+tags[i]+'"><img class="button" src="image/grayButton.png"></div></div>');
			}
		}
		
		//LOAD IN THE COLOR CODE SCHEMES HERE, EVEN THOUGH ITS SHOULD BE SEPARATE
		for(var i = 0; i < colorArray.length; i++){
			$("#colorSchemes").append('<li data-option="scheme" data-code="'+colorArray[i]+'">'+colorNames[i]+'</li>');
		}
	}
	
	//sorts by section
	articleItems.sort(function(a, b){
		var sectionA = a.section.toLowerCase(), sectionB = b.section.toLowerCase();
		if(sectionA < sectionB){ //sort string ascending
			return -1;
		}
		if(sectionA > sectionB){
			return 1;
		}
		return 0; //default return value (no sorting)
	});
	
	//sorts by title
	articleItems.sort(function(a, b){
		var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
		if(titleA < titleB){ //sort string ascending
			return -1;
		}
		if(titleA > titleB){
			return 1;
		}
		return 0; //default return value (no sorting)
	});
	
	//sorts by weight
	articleItems.sort(function(a, b){
		return b.weight - a.weight
	});
	
	/*var sort_by = function(field, reverse, primer){
		var key = primer ?
			function(x) {return primer(x[field])}:
			function(x) {return x[field]};
		
		reverse = !reverse ? 1 : -1;
		
		return function(a,b){
			return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
			}
	};*/
	
	// the initial seed
	//var timeSeed = new Date();
	//Math.seed = timeSeed.getTime();
	
	//Math.seed = 1467926970352;
	
	//need to move this function until new seed is set inside functions
	//document.getElementById("seed").innerHTML = "Color Code: " + Math.seed;

		// in order to work 'Math.seed' must NOT be undefined,
		// so in any case, you HAVE to provide a Math.seed
	Math.seededRandom = function(max, min) {
		max = max || 1;
		min = min || 0;
		
		Math.seed = (Math.seed * 9301 + 49297) % 233280;
		var rnd = Math.seed / 233280;
		
		return min + rnd * (max - min);
	}
	
	//Array of interesting colors
	var colorArray = [1467929669389,1467930290698,1467930335292,1468096778469,1468181071259,1468380281929,1468894552492,1470434848507,1471740693405,1471991342961,1471999239306,1473109525456,1473458086273,1473462312959,1474498025742,1474789185995,1475113849949,1475254606772,1476251572810, 1476510582586, 1476760663138, 1477017596345, 1477060637558,1479146673006, 1479189152708,1480994919056];
	var colorNames = [];
	
	var sectionNames = [];
	var tagNames = [];
	
	GenerateColorNames(colorArray.length);
	//$("#itemContainer").empty();
	LoadContainer(articleItems);

	LoadSearch(sectionNames, tagNames);
	//console.log([sectionNames,tagNames]);
	
	//OPERATE CONTEXT OPTIONS FOR SECTION DOWN MENU
	$(".visToggle").click(function(){
	
		//IF THE BUTTON HASNT BEEN CLICKED YET
		if(!$(this).hasClass("clicked")){
		
			var type = $(this).data("type");
			
			//CONTEXT OPTION FOR SECTION DROPDOWN
			if(type == "section")
			{
				var section = $(this).data("section");
				var hideSection = document.getElementsByClassName(section);
				for(var i = 0; i < hideSection.length; i++){
					hideSection[i].style.display = "none";
				}
			
			}
			
			$(this).addClass("clicked");
			$(this).find("img").attr("src", "image/redButton.png");
			
		}
		//IF THE BUTTON HAS BEEN CLICKED
		else{
			var type = $(this).data("type");
			
			//CONTEXT OPTION FOR SECTION DROPDOWN
			if(type == "section")
			{
				var section = $(this).data("section");
				var showSection = document.getElementsByClassName(section);
				for(var i = 0; i < showSection.length; i++){
					showSection[i].style.display = "inline-block";
				}
			}
			
			$(this).removeClass("clicked");
			$(this).find("img").attr("src", "image/greenButton.png");
		}
		
	});
	
	//OPERATE CONTEXT OPTIONS FOR GENRE OF SECTION DROPDOWN MENU
	$(".genreToggle").click(function(){
		
		var section = $(this).data("section");
		
		//IF THE CLICKED GENRE IS NOT ACTIVE
		if(!$("#"+section).hasClass("currentGenre"))
		{
			//REMOVE ALL OTHER CURRENTGENRE FROM FOCUS
			var removeFocus = document.getElementsByClassName("currentGenre");
			
			for(var i = 0; i < removeFocus.length; i++)
			{
				$(removeFocus[i]).removeClass("currentGenre");
			}
			
			//HIDE ALL ARTICLES AND PRIME THE SPACE
			var hideSection = document.getElementsByClassName("linkArticle");
			for(var i = 0; i < hideSection.length; i++){
				hideSection[i].style.display = "none";
			}
			
			for(var i = 0; i < sectionNames.length; i++)
			{
				if(sectionNames[i] != section)
				{
					$("#"+sectionNames[i]).find("img").attr("src", "image/redButton.png");
					$("#"+sectionNames[i]).find(".visToggle").addClass("clicked");
				}
			}
			
			//SHOW ONLY THE GENRE OF CHOICE
			var showSection = document.getElementsByClassName(section);
			
			for(var i = 0; i < showSection.length; i++){
				showSection[i].style.display = "inline-block";
			}
			
			$("#"+section).addClass("currentGenre");
			$("#"+section).find(".visToggle").removeClass("clicked");
			$("#"+section).find("img").attr("src", "image/greenButton.png");
		}
		
		//IF THE GENRE HAS BEEN CLICKED BEFORE
		//REVERT THE SPACE SO ALL ARTICLES ARE SHOWN
		else {
			var showSection = document.getElementsByClassName("linkArticle");
			for(var i = 0; i < showSection.length; i++){
				showSection[i].style.display = "inline-block";
			}
			
			for(var i = 0; i < sectionNames.length; i++)
			{
				$("#"+sectionNames[i]).removeClass("currentGenre");
				$("#"+sectionNames[i]).find("img").attr("src", "image/greenButton.png");
				$("#"+sectionNames[i]).find(".visToggle").removeClass("clicked");
			}
		}
		
	});
	
	//ENABLE ALL GENRES
	$("#genreAll").click(function(){
		
			var showSection = document.getElementsByClassName("linkArticle");
			for(var i = 0; i < showSection.length; i++){
				showSection[i].style.display = "inline-block";
			}
			
			for(var i = 0; i < sectionNames.length; i++)
			{
				$("#"+sectionNames[i]).removeClass("currentGenre");
				$("#"+sectionNames[i]).find("img").attr("src", "image/greenButton.png");
				$("#"+sectionNames[i]).find(".visToggle").removeClass("clicked");
			}
	});
	
	//OPERATE CONTEXT OPTIONS FOR TAG DROPDOWN MENU
	function AddClassTags () {
	
		var timeSeed = new Date();
		var firstSeed = timeSeed.getTime();
		ResetSeed (firstSeed);
		document.getElementById("seed").innerHTML = "Color Code: " + firstSeed;
		//console.log([firstSeed, Math.seed]);
	
		var sheet = document.styleSheets[1];
		//console.log(sheet);
		//console.log("Color Seed: "+Math.seed);
		
		for(var i = 0; i < tagNames.length; i++)
		{
			var color1 = Math.floor(Math.seededRandom() * 255);
			var color2 = Math.floor(Math.seededRandom() * 255);
			var color3 = Math.floor(Math.seededRandom() * 255);
			var opacity = .5 * Math.seededRandom() + .2;
			
			sheet.insertRule("."+tagNames[i]+"Hue::before" + " {position:absolute;content:' ';top: 0; right: 0; bottom: 0; left: 0; background:rgba("+color1+","+color2+","+color3+","+opacity+"); z-index:99;}", sheet.cssRules.length);
		}
	}
	AddClassTags();
	
	$(".tagToggle").click(function(){
		
		var tagHues = document.getElementsByClassName("linkArticle");

		if(!$(this).hasClass("clicked")){
		
			var tag = $(this).data("tag");
			
			$(this).addClass("clicked");
			$(this).parent().find(".tagPToggle").addClass("clicked");
			$(this).find("img").attr("src", "image/greenButton.png");
			
			for(var i = 0; i < tagHues.length; i++){
				var tagArray = $(tagHues[i]).data("tags").split(" ");
				
				if( ($.inArray(tag, tagArray) > -1) )
				{
					$(tagHues[i]).addClass(tag+"Hue");
				}
			}

		}
		else{
		
			var tag = $(this).data("tag");
			
			$(this).removeClass("clicked");
			$(this).parent().find(".tagPToggle").removeClass("clicked");
			$(this).find("img").attr("src", "image/grayButton.png");
			
			for(var i = 0; i < tagHues.length; i++){
				var tagArray = $(tagHues[i]).data("tags").split(" ");
				
				if( ($.inArray(tag, tagArray) > -1))
				{
					$(tagHues[i]).removeClass(tag+"Hue");
				}
			}
			
		}
		
	});
	
	//FUNCTION TO CONTROL WHEN USER IS CLICKING ON THE TEXT
	$(".tagPToggle").click(function(){
		
		var tagHues = document.getElementsByClassName("linkArticle");

		if(!$(this).hasClass("clicked")){
		
			var tag = $(this).data("tag");
			
			$(this).addClass("clicked");
			$(this).parent().find("img").attr("src", "image/greenButton.png");
			$(this).parent().find(".tagToggle").addClass("clicked");
			
			for(var i = 0; i < tagHues.length; i++){
				var tagArray = $(tagHues[i]).data("tags").split(" ");
				
				if( ($.inArray(tag, tagArray) > -1) )
				{
					$(tagHues[i]).addClass(tag+"Hue");
				}
			}

		}
		else{
		
			var tag = $(this).data("tag");
			
			$(this).removeClass("clicked");
			$(this).parent().find("img").attr("src", "image/grayButton.png");
			$(this).parent().find(".tagToggle").removeClass("clicked");
			
			for(var i = 0; i < tagHues.length; i++){
				var tagArray = $(tagHues[i]).data("tags").split(" ");
				
				if( ($.inArray(tag, tagArray) > -1))
				{
					$(tagHues[i]).removeClass(tag+"Hue");
				}
			}
			
		}
		
	});
	
	//DISABLE OR ENABLE ALL TAGS
	$("#tagAll").click(function(){
		
		var enabledTags = document.getElementsByClassName("tagToggle");
		var enabledPTags = document.getElementsByClassName("tagPToggle");
		var tagHues = document.getElementsByClassName("linkArticle");
		var tagArray = tagNames.map(function(e) {return e + "Hue"});

		if($(enabledTags).filter(".clicked").length > 0)
		{
			for(var i = 0; i < tagHues.length; i++)
			{
				$(tagHues[i]).removeClass(tagArray.join(" "));
			}
			
			$(enabledTags).removeClass("clicked");
			$(enabledPTags).removeClass("clicked");
			$(enabledTags).find("img").attr("src", "image/grayButton.png");
		}
		else
		{
			$(".tagToggle").click();
		}
	});
	
	//DETECT SCROLL AND MOVE CONTROLS TO TOP OF SCREEN
	$(window).scroll(function (event) {
		var scroll = $(window).scrollTop();
		if(scroll > 30){
			$("#searchBar").css({"margin-top":"0","top":"0%"});
		}
		else{
			$("#searchBar").css({"margin-top":"1.5vh", "top":"7%"});
		}
	});
	
	//GENERATE THE RANDOM NAMES FOR COLORS
	function GenerateColorNames(number) {
		
		var first = ["Fools", "Triple","Savage", "Hard",
		"Adamant", "Soft", "Edgy", "Slick",
		"Clear", "007", "Cute", "Ice",
		"Molten", "Terra", "Facet", "Weird",
		"Wicked","Spotted","Jungle","Yuge"];
		
		var second = ["Ocean", "Reef", "Plains", "Rock",
			"Panda", "Shock", "Berry", "Engine",
			"Smear", "Bouy", "Money", "Chance",
			"Diamond", "Cake", "Bucket", "Bunny", "Cathedral",
			"Bucket","Bar","Tangent","Red"];
		
		for(i = 0; i < number; i++){
			ResetSeed(colorArray[i]);
			var firstRand = Math.ceil(Math.seededRandom() * (first.length - 1));
			var secondRand = Math.ceil(Math.seededRandom() * (second.length - 1));
		
			colorNames.push(first[firstRand]+" "+second[secondRand]);
		}
	}
	
	//MANIPULATE TAGS WHEN HOVERING
	$(".linkArticle").hover(function(){
		
		var tagCall = $(this).data("tags");
		//console.log($("#hover"+tagCall).hasClass("clicked"));
		
		if(!$("#hover"+tagCall).hasClass("clicked")){
		
			$("#hover"+tagCall).addClass("hoverMode");
			$("#hover"+tagCall).click();
		}
		
	}, function(){
		var tagCall = $(this).data("tags");

		if($("#hover"+tagCall).hasClass("hoverMode")){
			$("#hover"+tagCall).removeClass("hoverMode");
			$("#hover"+tagCall).click();
		}
	});
	
	//TURN OFF/ON THE SETTINGS MENU
	$('#settings').click(function(){
		$('#settingsMenu').toggle();
	});
	$('#close').click(function(){
		$('#settingsMenu').toggle();
	});

	//Reset seed to previous code scheme
	function ResetSeed (newSeed){
		Math.seed = newSeed;
	}
	//Change the color code to scheme
	function ChangeColor (color){
	
		var sheet = document.styleSheets[1];
		
		ResetSeed(color);
		
		for(var i = 0; i < tagNames.length; i++)
		{
			var color1 = Math.floor(Math.seededRandom() * 255);
			var color2 = Math.floor(Math.seededRandom() * 255);
			var color3 = Math.floor(Math.seededRandom() * 255);
			var opacity = .5 * Math.seededRandom() + .2;
			
			sheet.insertRule("."+tagNames[i]+"Hue::before" + " {position:absolute;content:' ';top: 0; right: 0; bottom: 0; left: 0; background:rgba("+color1+","+color2+","+color3+","+opacity+"); z-index:99;}", sheet.cssRules.length);
		}
	}
	
	//SETS CURRENT THEME
	var currentTheme = "tranBox";
	
	//CONTROLLER FOR THEMES
	$("li").click(function(){
		var option = $(this).data("option");
		
		if(option == "Red" || option == "Green" || option == "Purple" || option == "Pink"){
			$("body").removeClass("Red Green Purple Pink");
			$("body").addClass(option);
		}
		else if(option == "scheme"){
			var code = $(this).data("code");
			ChangeColor(code);
		}
		else{
			if(currentTheme == "tranBox")
			{
				$(".tranBox").each(function(){
					$(this).removeClass("tranBox");
					$(this).addClass(option);
				});
			}
			
			else if(currentTheme == "lightBox")
			{
				$(".lightBox").each(function(){
					$(this).removeClass("lightBox");
					$(this).addClass(option);
				});
			}
			else
			{
				$(".darkBox").each(function(){
					$(this).removeClass("darkBox");
					$(this).addClass(option);
				});
			}
			
			currentTheme = option;
		}
	});
	
	function RandomizeTheme () {
	
		var timeSeed = new Date();
		ResetSeed (timeSeed.getTime());
		
		var background = [ "Green", "Red", "Purple", "Pink"];
		var bkSelect = background[Math.round(Math.seededRandom () * 3)];
		
		var allThemes = ["tranBox", "lightBox", "darkBox"];
		var allSelect = allThemes[Math.round(Math.seededRandom () * 2)];
		
		var flexThemes = ["lightBox", "darkBox"];
		var flexSelect = flexThemes[Math.round(Math.seededRandom () * 1)];
		
		$("body").removeClass("Red Green Purple Pink");
		$("body").addClass(bkSelect);
		
		if(bkSelect == "Pink")
		{
			$(".tranBox").each(function(){
				$(this).removeClass("tranBox");
				$(this).addClass(flexSelect);
			});
			currentTheme = flexSelect;
		}
		
		else if(bkSelect == "Red")
		{
			//nada
		}
		else {
			$(".tranBox").each(function(){
				$(this).removeClass("tranBox");
				$(this).addClass(allSelect);
			});
			currentTheme = allSelect;
		}
		
	}
	//RANDOMIZE THE SCENE ON LOAD
	RandomizeTheme();
	
	$(".genreToggle").hover(function(){
	
		$(this).siblings(".sectionTooltip").css({"visibility":"visible"});
		
	}, function(){
	
		$(this).siblings(".sectionTooltip").css({"visibility":"hidden"});
		
	});
	
	
});













