
	function Article (title, link, weight, tags, section){
		this.title = title;
		this.link = link;
		this.weight = weight;
		this.tags = tags;
		this.section = section;
	}
	
	Article.prototype.getTitle = function (){
		return this.title
	};
	Article.prototype.getLink = function (){
		return this.link
	};
	Article.prototype.getWeight = function (){
		return this.weight
	};
	Article.prototype.getTags = function (){
		return this.tags
	};
	Article.prototype.getSection = function (){
		return this.section
	};
	Article.prototype.getInfo = function (){
		return [this.title, this.link, this.weight, this.tags, this.section];
	};
	
	var articleItems = [];

	//GAMES
	articleItems.push(new Article("Arrowhead: Magicka","https://quip.com/4T9fAuWAeWx0",600,["development"],"games"));
	articleItems.push(new Article("M Herman: Rules","https://quip.com/7PuuA7Yl7ufc",800,["development"],"games"));
	articleItems.push(new Article("Ludwig Game Art","https://quip.com/QWw2AaVe90Kl",500,["design"],"games"));
	articleItems.push(new Article("Mechanics Basics","https://quip.com/WaX1AvaGgz9K",800,["development"],"games"));
	articleItems.push(new Article("Accomplishment","https://quip.com/QhhzAai1oAe8",800,["development"],"games"));
	articleItems.push(new Article("Which Way to Win","https://quip.com/pg3cAKnl4OTb",800,["development"],"games"));
	articleItems.push(new Article("Chou's Techniques","https://quip.com/PapOARw86ebe",800,["development"],"games"));
	articleItems.push(new Article("Epic Purpose","https://quip.com/nuFuAeH8xBLw",800,["development"],"games"));
	articleItems.push(new Article("Fit Investment","https://quip.com/bLWCA3nNGjFe",800,["development"],"games"));
	articleItems.push(new Article("Community","https://quip.com/i0WbAA7vsTFa",801,["development"],"games"));
	articleItems.push(new Article("Rare & Shiny","https://quip.com/LdPXA0CzbjmC",800,["development"],"games"));
	articleItems.push(new Article("Curios & Expectations","https://quip.com/qkzuA49NDga3",800,["development"],"games"));
	articleItems.push(new Article("Value & Time","https://quip.com/H2baAhJrk5ls",800,["development"],"games"));
	articleItems.push(new Article("Identity Networks","https://quip.com/xYDXA00uNx1b",801,["development"],"games"));
	articleItems.push(new Article("Game Frameworks","https://quip.com/aFk0AMZfCm8a",801,["development"],"games"));
	articleItems.push(new Article("Phases in Games","https://quip.com/uZ3EASv7m08b",700,["development"],"games"));
	articleItems.push(new Article("Yu-kai Design Document","https://quip.com/hbT7AdIi28A9",800,["development"],"games"));

	//EDUCATION
	articleItems.push(new Article("Good Question Game","https://quip.com/iUDRAFpLiDT5",500,["games"],"education"));
	
	//DESGIN
	articleItems.push(new Article("Transparency","https://quip.com/qXCpAojvaNs4",700,["design"],"design"));
	articleItems.push(new Article("Creative Spaces","https://quip.com/svxFApDVhrkw",500,["design"],"design"));
	articleItems.push(new Article("Webfacing","https://quip.com/43rCAxkydhz9",500,["design"],"design"));
	articleItems.push(new Article("Typography General","https://quip.com/gZ5pAFe10EIn",500,["design"],"design"));
	
	//BUSINESS
	articleItems.push(new Article("Job Description","https://quip.com/JN4LADIMxLuj",1000,["games"],"business"));
	articleItems.push(new Article("Y Moon: Strengths","https://quip.com/E6m1AKQ4j93x",800,["business"],"business"));
	articleItems.push(new Article("Team Composition","https://quip.com/iWE7AaCWOAVP",400,["business"],"business"));
	articleItems.push(new Article("Early Access","https://quip.com/BFa9AyasmE7Z",600,["games"],"business"));

	//UXUI
	articleItems.push(new Article("N Rosencranz: UXUI","https://quip.com/tuGHAxcuzvZB",500,["uxui"],"uxui"));
	articleItems.push(new Article("Error Experience","https://quip.com/aq7uAWHGF0gZ",500,["uxui"],"uxui"));
	articleItems.push(new Article("Usability Hertz 16","https://quip.com/hNZEAz6l3tlz",600,["uxui"],"uxui"));
	articleItems.push(new Article("Defining UXUI Hertz 10","https://quip.com/LfI9Aj5QSLGW",800,["uxui"],"uxui"));
	
	//PSYCHOLOGY
	articleItems.push(new Article("Memory in Design","https://quip.com/TcNoArb2Ktkp",500,["uxui"],"psychology"));
	articleItems.push(new Article("Learning by Tests","https://quip.com/zRTIAb4zLUys",600,["psychology"],"psychology"));
	articleItems.push(new Article("Learning with Animation","https://quip.com/a7LmAyHro4bL",600,["psychology"],"psychology"));
	articleItems.push(new Article("Listen, then Talk","https://quip.com/M64BABTzXwTT",300,["psychology"],"psychology"));
	articleItems.push(new Article("Motivation Ryan 06","https://quip.com/rfhrAHPJqIsH",800,["psychology"],"psychology"));

	//INFORMATICS
	articleItems.push(new Article("Participatory Development","https://quip.com/uiYlA1wXQms9",800,["informatics"],"informatics"));
	articleItems.push(new Article("Arithmetic Development","https://quip.com/VJEmAVbv2aOW",800,["informatics"],"informatics"));

	//TLDR
	articleItems.push(new Article("TLDR Archive","https://quip.com/QDiJAu9KsTa7",1000,["tldr"],"tldr"));
	articleItems.push(new Article("As We May Think","https://quip.com/EZBEAmBUMlUr",1000,["tldr"],"tldr"));
	articleItems.push(new Article("Mother of All Demos","https://quip.com/47M5A3CR4jcz",1000,["tldr"],"tldr"));














