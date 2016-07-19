//var twitterHandles = ["PeteRose", "KavinRose", "JacobRose", "MartinRose"];
//var teamIcon = ["mystic","instinct","valor"];



	function PlayerDB (handle, team, district, cosmetic){
		this.handle = handle;
		this.team = team;
		this.district = district;
		this.cosmetic = cosmetic;
	}
	
	PlayerDB.prototype.getHandle = function (){
		return this.handle
	};
	PlayerDB.prototype.getTeam = function (){
		return this.team
	};
	PlayerDB.prototype.getDistrict = function (){
		return this.district
	};
	PlayerDB.prototype.getCosmetic = function (){
		return this.cosmetic
	};

	PlayerDB.prototype.getInfo = function (){
		return [this.handle, this.team, this.district, this.cosmetic];
	};
	
	var Trainers = [];

	Trainers.push(new PlayerDB("NicholasPersa","Mystic","Centennial Lakes","Ace Trainer Female"));
	Trainers.push(new PlayerDB("LauraLundahl","Mystic","Centennial Lakes","Ace Trainer Male"));
	Trainers.push(new PlayerDB("Charles","Valor","Centennial Lakes","Hiker"));
	Trainers.push(new PlayerDB("Peter","Instinct","Centennial Lakes","Camper"));
	Trainers.push(new PlayerDB("Jeff","Valor","Centennial Lakes","Ace Trainer Male"));
	Trainers.push(new PlayerDB("Frank","Mystic","Centennial Lakes","Black Belt"));
	Trainers.push(new PlayerDB("PeteRose","Valor","Centennial Lakes","Ace Trainer"));

	Trainers.push(new PlayerDB("NicholasPersa","Mystic","Minneapolis","Ace Trainer Female"));
	Trainers.push(new PlayerDB("LauraLundahl","Mystic","Minneapolis","Ace Trainer Male"));
	Trainers.push(new PlayerDB("Charles","Valor","Minneapolis","Hiker"));
	Trainers.push(new PlayerDB("Peter","Instinct","Minneapolis","Camper"));
	Trainers.push(new PlayerDB("Jeff","Valor","Minneapolis","Ace Trainer Male"));
	Trainers.push(new PlayerDB("Frank","Mystic","Minneapolis","Black Belt"));
	Trainers.push(new PlayerDB("PeteRose","Valor","Minneapolis","Ace Trainer"));

















