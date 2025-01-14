const Matrix = require("./nMatrix.js");
class Vector{
	//takes in a 1d array of numbers 
	constructor( input){
		this.set = input;
	}
	//returns a 1d array of the vector vallues
	getSet(){
		return this.set;
	}
	// takes in a vector and returns a vector of the two vectors added together
	add( input){
		var temp=[];
		for( var i=0;i<this.set.length; i++){
			temp.push(this.set[i]+input.set[i]);
		}
		return new Vector(temp);
	}
	// takes in a vector and returns a vector of the this vector minus the input
	sub (input){
		var temp=[];
		for( var i=0;i<this.set.length; i++){
			temp.push(this.set[i]-input.set[i]);
		}
		return new Vector(temp);
	}
	// takes in a vector and returns a scalar of the dot product of the two vectors
	dot (input){
		var temp=0;
		for( var i=0;i<this.set.length; i++){
			temp+=this.set[i]*input.set[i];
		}
		return temp;
	}
	// takes in a scalar and returns a vector of each term multiplied by the scalar
	times (input){
		var temp=[];
		for( var i=0;i<this.set.length; i++){
			temp.push(this.set[i]*input);
		}
		return new Vector(temp);
	}
	// takes in a scalar and returns a vector of each term divided by the scalar
	divide (input){
		var temp=[];
		for( var i=0;i<this.set.length; i++){
			temp.push(this.set[i]/input);
		}
		return new Vector(temp);
	}
	// returns a vector with each term inversed
	inverse (){
		var temp=[];
		for( var i=0;i<this.set.length; i++){
			temp.push(1/this.set[i]);
		}
		return new Vector(temp);
	}
	//returns a scalar of the magnitude of the vector
	mag (){
		var temp=0
		for( var i=0;i<this.set.length; i++){
			temp+= Math.pow(this.set[i],2);
		}
		return Math.pow(temp,.5);
	}
	// takes in a vector and returns a scalar of the eucledian distance between them
	distance (input){
		var temp=0
		for( var i=0;i<this.set.length; i++){
			temp+= Math.pow((this.set[i]-input.set[i]),2);
		}
		return Math.pow(temp,.5);	
	}
	//takes in a vector and returns a boolean of if the two vectors are normal
	isNormal(input){
		var a =this.dot(input)*1000000
		a= Math.round(a)/1000000
		if(a==0){
			return true;
		}else{
			return false;
		}
	}
	// takes in a vector and returns a vector of its unit vector
	static toUnit(input){
		return input.divide(input.mag());
	}
	// takes in a list of vectors and uses the grahm schmidt process to return a 1d array of orthonormal vectors
	static normalize(input){
		var temp = [];
		temp.push( input[0]);
		for( var i=1; i<input.length; i++){
			var a = input[i];
			for( var j =0; j<temp.length; j++){
				var b = temp[j].dot(input[i])/temp[j].dot(temp[j]);
				a=a.sub(temp[j].times(b));
			}
			temp.push(a);
		}
		for( var i=0; i<temp.length;i++){
			temp[i]=temp[i].divide(temp[i].mag());
		}
		return temp;
	}
	// takes in a vector and returns a scalar of the smallest angle between the two vectors
	thetaBtwn(input){
		var out = this.dot(input)/this.mag();
		out /= input.mag();
		out = Math.acos(out)*180*1000000000/Math.PI;
		out= Math.round(out)/1000000000
		return out;
	}
	//take in the magnitude and unit vector of the vector and returns the vector ----> usless/doesnt work/redundant
	/*static toComponents(magn, units){
		var temp =[];
		for (var i=0; i<units.length; i++){
			temp.push( Vector.toUnit(units[i]).times(magn));
		}  
		var temp2= temp[0];
		for(var i=1;i<temp.length;i++){
			temp2=temp2.add(temp[i]);
		}
		return temp2;
	}*/ 
	// returns a scalar of the dimension of the vector
	getN(){
		return this.set.length;
	}
	/*takes in n-1 Vectors of dimension n and returns a vector of the cross product of them*/
	static cross(input){
		var data = Matrix.toArray(Matrix.rotate(input));
		var out =[];
		for(var k=0; k<data.length;k++){
			var temp=[];
			for (var i =0; i<data.length;i++){
				var temp2=[]
				for(var j=0; j<data[0].length; j++){
					if(i!=k){
						temp2.push(data[i][j]);
						// console.log("temp2" +temp2)
					}
				}
				if(temp2[0]!= null){
					temp.push(temp2)
					// console.log("temp" +temp)
				}
			}
			out.push(Matrix.toMatrix(temp).det());
		}
		return new Vector(out);
	}
}

module.exports= Vector;

var a = new Vector([3,1]);
var b = new Vector([2,2]);
var c = new Vector([1,2,3]);
var u = new Vector([6,4,7]);
var test = Vector.normalize([a,b]);
console.log("hello world");
console.log(test);
console.log(test[0].thetaBtwn(test[1]));
console.log(u.dot(u));
console.log(Vector.toUnit(u));
console.log(u.mag());
console.log(u.mag()*u.mag());
console.log(c.dot(u));
