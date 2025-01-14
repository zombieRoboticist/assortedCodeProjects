// var Vectors = document.createElement("script");
// Vectors.src = "Vectors.js";
// document.documentElement.firstChild.appendChild(Vectors);
// import instance from 'Vectors.js';
// var Vectors = instance.getName();
var g0 = 9.81;
var g0Unit = "m/s^2";
var g0Hat=new Vector(0,g0,0,g0Unit);
function hellio(im){
	return "hello world" + im +"is here";
}

var g;
var gUnit;
var gHat;
var g1 = 9.81*100/2.54;
var g1Unit = "in/s^2";
var g1hat = new Vector(0,g,0,gUnit);
function setg(h){
	g=h;
}
function hello (){
	console.log("hello world");
	helloWorld();
}
function calcFn(cg, cp, m, theta, tilt){
	var mg = Vector.toComponent((Number(m)*g),(Number(theta)-90),tilt);
	var out = [];
	var dists= [];
	var total = 0;
	for( var x=0; x<cp.length;x++){
		var p = Number(cg.distancexz((cp[x].r)));
		total+= p;
		dists[x]=p
	}
	for(var x = 0; x<cp.length;x++){
		var p = mg.j*((total-dists[x])/total);
		out[x] = new Fn(p, dists[x]);
	}
	// console.log(out);
	return out;
}
function fFsnet(cp, fns, off,stp){
	// console.log(fns);
	// console.log(fns[0]);
	// console.log(fns[0].fn);
	var total = 0;
	for( var x=0; x<stp;x++){
		total+=(cp[x].muS*fns[(x+off)].fn);
	}
	return total;
}
function fFknet(cp, fns, off){
	var total = 0;
	for( var x=off; x<cp.length;x++){
		total+=(cp[x].muK*fns[(x)].fn);
	}
	return total;
}
function motorForce(cp){
	var total=0;
	for( var x=0; x<cp.length; x++){
		total += (cp[x].motor.torque*cp[x].wheelDiameter*cp[x].motor.gR);
	}
	return total;
}
function speedMax(cp){
	var v = cp[0].motor.speed*cp[0].wheelDiameter*Math.PI/cp[0].motor.gR;
	for( var x = 1; x<cp.length;x++){
		v=Math.min(v,(cp[x].motor.speed*cp[x].wheelDiameter*Math.PI/cp[x].motor.gR));
	}
	return v;
}
function maxAngle(cp, numP, cent,a,m,f, tilt){
	var theta = 0;
	var lastA;
	var lcent= new Vector(0,0,0,0);
	var l = cent;
	while(a>0){
		lastA=a;
		lcent=cent;
		var fnout = calcFn(cent, cp, m, theta,tilt);
		var one=fFsnet(cp,fnout,0,numP);
		var two =fFknet(cp,fnout,numP);
		var three=m*g*Math.sin((theta* Math.PI/180));
		a=one-two-three;
		theta++;
	}
	theta--;
	return (" At "+theta+"° your acceleration is "+parseInt(lastA*Math.pow(10,f))/Math.pow(10,f));
}
function rotationalA(mass1, cg1,mass2,cg2 ,theta,tilt,tq){
	console.log(1);
	//find mg
	var tqv = Vector.toComponent(tq, theta,tilt,untat);
	var mga= Vector.toComponent((mass1*-1),(theta),(tilt),untat);
	var mgl = Vector.toComponent((mass2*-1),(theta),(tilt),untat);
	var mg = mga.add(mgl);
	console.log(mg.mag());
	// find cg of arm+payload
	console.log(cg1);
	var cga1=cg1.times(mass1);

	var cga2= cg2.times(mass2);
	var cga = cga1.add(cga2);
	cga=cga.divide((mass1+mass2));
	//cga = cga.divide(((mass1+mass2)));
	//find force at cg
	var ftq = cga.inverse().mult(tqv);
	ftq=ftq.add(mg);
	ftq = ftq.divide((mass1+mass2));
	return ftq;
}
function mprun(ftq, mass2,mass1,cg1 ,cg2,tilt,tq){
	console.log(2);
	var mga= Vector.toComponent((mass1*-1),(90*Math.PI/180),(tilt*Math.PI/180));
	var mgl = Vector.toComponent((mass2*-1),(90*Math.PI/180),(tilt*Math.PI/180));
	var mg = mga.add(mgl);
	var cga1=cg1.times(mass1);
	var cga2= cg2.times(mass2);
	var cga = cga1.add(cga2);
	cga=cga.add(cga2);
	//cga=cga.divide(2);
	// cga = cga.divide(((mass1+mass2)));
	ftq = cga.divide(tq);
	ftq = ftq.inverse();
	ftq=ftq.add(mg);
	ftq = ftq.divide((mass1+mass2));
	return ftq;
}
function maxPayload(mass1,cg1 ,cg2,tilt,tq,a){
	console.log(3);
	var ftq = new Vector(1,1,1,1);
	console.log(ftq);
	var mass2;
	for( mass2 = 0; ftq.j > 0; mass2++){
		ftq=mprun(ftq, mass2,mass1,cg1 ,cg2,tilt,tq);
	}
	mass2--;
	for( var mass3 = 0; ftq.j > 0; mass2+=.1){
		ftq=mprun(ftq, mass2,mass1,cg1 ,cg2,tilt,tq);
	}
	mass2-=.1;
	for( var mass3 = 0; ftq.j > 0; mass2+=.01){
		ftq=mprun(ftq, mass2,mass1,cg1 ,cg2,tilt,tq);
	}
	mass2-=.01;
	for( var mass3 = 0; ftq.j > 0; mass2+=.001){
		ftq=mprun(ftq, mass2,mass1,cg1 ,cg2,tilt,tq);
	}
	mass2-=.001;
	return mass2;
}
function minGR(mass1, cg1,mass2,cg2 ,tilt,tq, gr){
	//console.log(5);
	tq/=gr;
	var theta = 90;
	//console.log(4);
	//find mg
	var tqv = Vector.toComponent(tq, theta,tilt,untat);
	var mga= Vector.toComponent((mass1*-1),(theta),(tilt),untat);
	var mgl = Vector.toComponent((mass2*-1),(theta),(tilt),untat);
	var mg = mga.add(mgl);
	//console.log(mg.mag());
	// find cg of arm+payload
	//console.log(cg1);
	var cga1=cg1.times(mass1);

	var cga2= cg2.times(mass2);
	var cga = cga1.add(cga2);
	cga=cga.divide((mass1+mass2));
	//cga = cga.divide(((mass1+mass2)));
	//find force at cg
	var ftq = cga.inverse().mult(tqv);
	ftq=mg.mult((ftq.inverse()));
	return ftq.mag();
}