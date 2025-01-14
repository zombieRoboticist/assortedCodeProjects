class Vector{
	//this.name = name; 
	// this.vector (){
	// 	var out = new Vector(this.i, this.j, this.k, this.units);
	// 	return out;
	// }
	constructor( i, j, k, units){
		this.i = Number(i);
		this.j= Number(j);
		this.k= Number(k);
		this.units=units;
	}
	add( input){
		var out = new Vector ((this.i +input.i), (this.j+ input.j), (this.k+ input.k), this.units);
		return out;
	}
	sub (input){
		var out = new Vector ((this.i -input.i), (this.j- input.j), (this.k- input.k), this.units);
		return out;
	}
	dot (input){
		var out = this.i*input.i+this.j*input.j+this.k*input.k;
		return out;
	}
	cross (input){
		var out = new Vector ((this.j *input.k-this.k*input.j), (this.k* input.i-this.i*input.k), (this.i* input.j-this.j*input.i), this.units);
		return out;
	}
	times (input){
		var out = new Vector ((this.i *input), (this.j*input), (this.k*input), this.units);
		return out;
	}
	divide (input){
		var out = new Vector ((this.i /input), (this.j/input), (this.k/input), this.units);
		return out;
	}
	inverse (){
		var out = new Vector((1/this.i),(1/this.j),(1/this.k),this.units);
		return out;
	}
	mag (){
		var out = Number((Math.pow((Math.pow(this.i,2)+Math.pow(this.j,2)+Math.pow(this.k,2)),.5)));
		return out;
	}
	Oxy (){
		var out= Math.atan(this.j/this.i)*180/Math.PI;
		if(this.i<0){
			out = out+180;
		}else if(this.j <0){
			out=out+360;
		}
		return out;
	}
	Oxz (){
		var out= Math.atan(this.k/this.i)*180/Math.PI;
		if(this.i<0){
			out = out+180;
		}else if(this.k <0){
			out=out+360;
		}
		return out;
	}
	Ozy (){
		var out= Math.atan(this.j/this.k)*180/Math.PI;
		if(this.k<0){
			out = out+180;
		}else if(this.j <0){
			out=out+360;
		}
		return out;
	}
	toString (){
		var out = this.i +" " + this.units +" i + " +this.j + " "+ this.units+ " j + " +this.k + " "+ this.units+ " k";
		return out;
	}
	toMagnitudeString (){
		var out = this.mag() + " "+this.units +", "+ this.Oxy() + " °, "+ this.Oxz() +" °";
		return out;
	}
	distance (input){
		var dist = Math.pow((Math.pow((this.i-input.i),2)+Math.pow((this.j-input.j),2)+Math.pow((this.k-input.k)),2),.5);
		return dist;
	}
	distancexy (input){
		var dist = Math.pow((Math.pow((this.i-input.i),2)+Math.pow((this.j-input.j),2)),.5);
		return dist;
	}
	distancexz (input){
		var dist = Math.pow((Math.pow((this.i-input.i),2)+Math.pow((this.k-input.k)),2),.5);
		return dist;
	}
	distanceyz (input){
		var dist = Math.pow((Math.pow((this.j-input.j),2)+Math.pow((this.k-input.k)),2),.5);
		return dist;
	}
	toStringF (a){
		var out = parseInt(this.i*Math.pow(10,a))/Math.pow(10,a) +" " + this.units +" i + " +parseInt(this.j*Math.pow(10,a))/Math.pow(10,a) + " "+ this.units+ " j + " +parseInt(this.k*Math.pow(10,a))/Math.pow(10,a) + " "+ this.units+ " k";
		return out;
	}
	mult (input){
		var out = new Vector ((this.i *input.i), (this.j* input.j), (this.k* input.k), this.units);
		return out;
	}
	static toComponent(magn, thxy, thzy, units){
		var man = Number(magn);
		var thy = Number(thxy);
		var thz = Number(thzy);
		while(thy<0){
			thy=thy+360;
		}
		while(thz<0){
			thz=thz+360;
		}
		thy = thy - thy%360*360;
		thz = thz - thz%360*360;
		var xy= thy*Math.PI/180;
		var zy = thz*Math.PI/180;
		var xz= Math.atan((Math.tan(zy)*Math.tan(xy)));
		var x = Math.pow((Math.pow(man,2)/ (1+Math.pow(Math.tan(xy),2)+Math.pow(Math.tan(xz),2))),.5);
		var y = x*Math.tan(xy);
		var z = x*Math.tan(xz);
		if(thy>90&&thy<=270){
			y=-y;
		}
		if(thz>90&&thz<=270){
			z=-z;
		}
		var out = new Vector(x,y,z,units);
		return out;
	}
	static toComponent(magn, alpha,beta,gamma,units){
		return new Vector((magn*Math.cos(alpha)),(magn*Math.cos(beta)),(magn*Math.cos(gamma)),units);
	}
	toUnit (){
		return this.divide(this.mag());
	}
	getAlpha(){
		return Math.acos(this.i/this.mag());
	}
	getBeta(){
		return Math.acos(this.j/this.mag());
	}
	getGamma(){
		return Math.acos(this.k/this.mag());
	}
}

function helloWorld(){
 		console.log("hello World");
 		var test = new Vector(1,2,3,"js");
 		console.log(test.toUnit());
 		console.log(test.getAlpha());
 		console.log(Vector.toComponent(test.mag(),test.getAlpha(),test.getBeta(),test.getGamma(),test.units));
}
module.exports= Vector;
//helloWorld();
// function test (){
// 	var a = new Vector(1.4,1.7,1.6,"m");
// 	var b = new Vector(-230,100,160,"N");
// 	console.log(a.cross(b));

// }
// test();
var uF = [new Vector(0.70014, -0.70014, -0.14003,''), new Vector(0.57735, -0.80829, -0.11547,''),new Vector( -0.37139, 0.928477, 0,''), new Vector( -0.28735, 0.957826, 0,''), new Vector(-0.0995, 0.995037, 0,''), new Vector(0, 1, 0,'')];

var F = [20000, 20000, 15000, 15000, 15000, 15000];
var P = [ new Vector(95, -2.6, -25,''), new Vector(90, -3.2, -20,''), new Vector(-75, -30, 2.5,''), new Vector(-80, -30, 2.5,''), new Vector(-85, -30, 2.5,''), new Vector(-90, -30, 2.5,'')];

for(var i =0; i< uF.length;i++ ){
	console.log(P[i].cross(uF[i].times(F[i])));
}