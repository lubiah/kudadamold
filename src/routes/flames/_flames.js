class Flames {
	constructor(first_name,second_name){
		// The constructor takes both names as paramters
		this.first_name = first_name; //The first partner's name
		this.second_name = second_name; //The second partner's name
		//We then create a clone of both names and convert them 
		//to lowercase and remove all white spaces in them
		//NB: The reason for creating the clone is because we don't
		//want to mess with the original data
		this.a = this.first_name.toLowerCase().replace(/\s/g,"");
		this.b = this.second_name.toLowerCase().replace(/\s/g,"");
		this.getDifference();
		this.getRelationship();
		//Now we remove the cloned variables since they are not needed
		delete this.a;
		delete this.b;
	}

	getDifference(){
		//This method is responsible for cancelling the common letters
		//out and returning the uncancelled letters

		for (let i = 0; i < this.a.length; i++) {
			for (let j = 0; j < this.b.length; j++){
				//The `if` statement below is to check if a letter in the
				//first_name is also present in the second_name, if it is,
				//it removes that letter in both names.
				//After that, we call the function again, the reason for calling
				//the function is to make it run with the new data or else it will
				//stick to the unreplaced data
				if (this.a[i] === this.b[j]){
					this.a = this.a.replace(this.a[i],"");
					this.b = this.b.replace(this.b[j],"");
					this.getDifference();
				}
			}
		}
		this.difference = this.a.length + this.b.length;
		return this.difference;
	}
	getRelationship(){
		//The method responsible for returning the relationship between both individuals
		const FLAMES = {
			0: ["F","Friends"],
			1: ["L","Lovers"],
			2: ["A","Admirers"],
			3: ["M","Marriage"],
			4: ["E","Enemies"],
			5: ["S","Secret Lovers"]
		};
		let modular_difference = this.difference % 6; //Gets the modular 6 of this.difference
		this.relationship = FLAMES[modular_difference];
	}

}

export default Flames;