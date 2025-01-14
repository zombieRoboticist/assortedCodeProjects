const Vector = require("./nVector.js");
const Matrix = require("./nMatrix.js");
class Basis{
	// takes in a 1d array of vectors which corrispond to the unit vectors, the name of the basis, and a position vector for the origin of the basis
	constructor(unitVectors, name='name', origin){
		this.units = unitVectors;
		this.name=name;
		this.d=this.units.length;
		this.o=origin;
	}
	//returns a 1d array of vectors which corrispond to the unit vectors
	getUnitVectors(){
		return this.units;
	}

	
}
module.exports= Basis;

/*var a = new Vector([1,0,0,0]);
var b = new Vector([0,1,0,0]);
var d= new Vector([0,0,1,0]);
var c = new Matrix([a,b,d])
console.log(a.dot(b));
console.log(Vector.cross(c));*/