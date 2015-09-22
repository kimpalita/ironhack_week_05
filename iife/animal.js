'use strict';

(function(){

	window.Animal = function(name, noise){
		//some code
		console.log('I am a ' + name);
		this.noise = noise;
	};

	Animal.prototype.bark = function(){
		console.log(this.noise);
	};

})();