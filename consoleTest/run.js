const prompt = require("prompt-sync")();
const Vector = require("../robotics/vectors.js");
const Matrix = require("../robotics/matrix.js");
const IEA = require("../robotics/iea.js");

/*function test (){
	var a = new Vector(0,0,-.2,"m");
	var b = new Vector(280,-190,150,"N");
	//b=b.toUnit().times(165);
	var c = new Vector(.3,.4,0,"m");
	console.log(c.toUnit());
	console.log(a.cross(b));
	console.log(c.toUnit().dot(a.cross(b)));
	console.log(c.toUnit().times(a.cross(b).dot(c.toUnit())));

}*/
function loadMatrix(){
	var input = [];
	var r = prompt("How many rows? ");
	var c = prompt("How many collums? ");
	for (var i =0; i<Number(r); i++){
		var temp=[];
		for(var j=0; j<Number(c); j++){
			temp.push(Number(prompt("What is the vallue of "+ i+", "+j+"? ")));
		}
		input.pus(temp);
	}
	return new Matrix(input);
}
function loadVector(){
	var i = prompt("i");
	var j = prompt("j");
	var k = prompt("k");
	var units = prompt("units");
	return new Vector(Number (i),Number(j),Number(k),units);
}

var action ="";
while(action!= "q"){
	action = prompt("What do you want to do today? 1.) Vectors  2.) Matricies 3.) IEA q) quit : ");
	if(Number(action)==1){
		var input = prompt("What do you want to do with vectors? 1) add 2) subtract 3) multiply by a scalar 4) divide by a scalar 5) dot product 6) cross product 7) unit vector 8) spherical coordinates to components 9) magnitude, alpha, beta, and gamma to components 10) get magnitude 11) components to spherical coordinates 12) components to magnitude, alpha, beta, and gamma: ");
		switch(Number(input)){
			case 1:
				var v1 = loadVector();
				var v2=loadVector();
				console.log(v1.add(v2));
				break;
			case 2:
				var v1 = loadVector();
				var v2=loadVector();
				console.log(v1.sub(v2));
				break;
			case 3:
				var v1 = loadVector();
				var a = prompt("What is the scalar? ");
				console.log(v1.times(a));
				break;
			case 4:
				var v1 = loadVector();
				var a = prompt("What is the scalar? ");
				console.log(v1.divide(a));
				break;
			case 5:
				var v1 = loadVector();
				var v2=loadVector();
				console.log(v1.dot(v2));
				break;
			case 6:
				var v1 = loadVector();
				var v2=loadVector();
				console.log(v1.cross(v2));
				break;
			case 7:
				var v1 = loadVector();
				console.log(v1.toUnit());
				break;
			case 8:
				var mag = prompt("What is the magnitude? ");
				var o=prompt("What is theta? ");
				var p = prompt("What is phi? ");
				console.log(toComponent(mag,o,p,""));
				break;
			case 9:
				var mag = prompt("What is the magnitude? ");
				var a=prompt("What is alpha? ");
				var b = prompt("What is beta? ");
				var g=prompt("What is gamma? ");
				console.log(toComponent(mag,a,b,g,""));
				break;
			case 10:
				var v1= loadVector();
				console.log(v1.mag());
				break;
			case 11:
				var v1=loadVector();
				console.log(v1.mag()+", "+ v1.Oxy()+ ", "+ v1.getGamma());
				break;
			case 12:
				var v1=loadVector();
				console.log(v1.mag()+", "+ v1.getAlpha()+ ", "+v1.getBeta()+", "+ v1.getGamma());
				break;
		}
	}else if( Number(action)==2){
		var input = prompt("What do you want to do with matricies? 1) add 2) subtract 3) multiply by a scalar 4) divide by a scalar 5) multiply 2 matricies 6) get the determinant of a matrix 7) transpose a matrix 8) get the inverse of a matrix 9) get an identity matrix: ");
		switch(Number(input)){
			case 1:
				var m1=loadMatrix();
				var m2=loadMatrix();
				console.log(m1.add(m2));
				break;
			case 2:
				var m1=loadMatrix();
				var m2=loadMatrix();
				console.log(m1.sub(m2));
				break;
			case 3:
				var m1=loadMatrix();
				var a = prompt("What is the scalar? ");
				console.log(m1.times(Number(a)));
				break;
			case 4:
				var m1=loadMatrix();
				var a = prompt("What is the scalar? ");
				console.log(m1.times(1/Number(a)));
				break;
			case 5:
				var m1=loadMatrix();
				var m2=loadMatrix();
				console.log(m1.dot(m2));
				break;
			case 6:
				var m1=loadMatrix();
				console.log(m1.det());
				break;
			case 7:
				var m1=loadMatrix();
				console.log(m1.transpose());
				break;
			case 8:
				var m1=loadMatrix();
				console.log(m1.inverse());
				break;
			case 9:
				var m1=prompt("What size Identity Matrix? ");
				console.log(Matrix.identity(m1));
				break;
		}
	}else if(Number(action)==3){
		var input = prompt("What IEA function do you want to perform? 1) convert 3 vectors to a matrix 2) convert a matrix to vectors 3) get the moment about a point 4) get the moment about an axis 5) get a net force 6) get the component of a force parrallel to a position vector 7) get the component of a force perpendicular to a position vector ");
		switch(Number(input)){
			case 1:
				var v1= loadVector();
				var v2=loadVector();
				var v3=loadVector();
				console.log(vectorsToMatrix(v1,v2,v3));
				break;
			case 2:
				var m1 = loadMatrix();
				console.log(matrixToVectors(m1));
				break;
			case 3:
				console.log("force vector");
				var f = loadVector();
				console.log("position vector");
				var r = loadVector();
				var m = prompt("1)magnitude or 2) vector form? ");
				if(Number(m)==2){
					console.log(momentPoint(r,f));
				} else if(Number(m)==1){
					console.log(momentPoint(r,f).mag());
				}
				break;
			case 4:
				console.log("axis vector");
				var a = loadVector().toUnit();
				console.log("force vector");
				var f = loadVector();
				console.log("position vector");
				var r = loadVector();
				var m = prompt("1)magnitude or 2) vector form? ");
				if(Number(m)==2){
					console.log(momentAxis(a,r,f));
				} else if(Number(m)==1){
					console.log(momentAxis(a,r,f).mag());
				}
				break;
			case 5:
				var n = prompt("How many forces? ");
				var im=[];
				for( var i =0; i<Number(n);i++){
					im.push(loadVector());
				}
				console.log(netForce(im));
				break;
			case 6:
				console.log("force vector");
				var f = loadVector();
				console.log("position vector");
				var r = loadVector();
				var m = prompt("1)magnitude or 2) vector form? ");
				if(Number(m)==2){
					console.log(component(r,f));
				} else if(Number(m)==1){
					console.log(component(r,f).mag());
				}
				break;
			case 7:
				console.log("force vector");
				var f = loadVector();
				console.log("position vector");
				var r = loadVector();
				var m = prompt("1)magnitude or 2) vector form? ");
				if(Number(m)==2){
					console.log(f.sub(component(r,f)));
				} else if(Number(m)==1){
					console.log(f.sub(component(r,f)).mag());
				}
				break;
		}
	}
}

//test();
