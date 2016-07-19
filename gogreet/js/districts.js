	function DistrictDB (location, gyms, stops){
		this.location = location;
		this.gyms = gyms;
		this.stops = stops;
	}
	
	DistrictDB.prototype.getLocation = function (){
		return this.location
	};
	DistrictDB.prototype.getGyms = function (){
		return this.gyms
	};
	DistrictDB.prototype.getStops = function (){
		return this.stops
	};

	DistrictDB.prototype.getInfo = function (){
		return [this.location, this.gyms, this.stops];
	};
	
	var CreateDistricts = [];

	CreateDistricts.push(new DistrictDB("Minneapolis","14","56"));
	CreateDistricts.push(new DistrictDB("Como Zoo","8","22"));
	CreateDistricts.push(new DistrictDB("Centennial Lakes","8","22"));
	CreateDistricts.push(new DistrictDB("Normandale Lake","3","11"));
	CreateDistricts.push(new DistrictDB("Saint Paul","14","56"));
	CreateDistricts.push(new DistrictDB("Eden Prairie","8","22"));
	CreateDistricts.push(new DistrictDB("Lake Calhoun","3","11"));
	CreateDistricts.push(new DistrictDB("Minnesota Zoo","14","56"));

