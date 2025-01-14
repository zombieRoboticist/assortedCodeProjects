function worldHello(){
	console.log("hello World!");
}
function Motor (freeSpeed, speedUnits, stallTorque, torqueUnits, gearRatio){
	this.speed = Number(freeSpeed);
	this.torque= Number(stallTorque);
	this.gR = Number(gearRatio);
	this.speedU=speedUnits;
	this.torqueU=torqueUnits;
}
function PoweredPoint(I, J, K, IJKU, MUS, v, vu, t,tu,gear, wD, wU){
	this.r = new Vector(I,J,K,IJKU);
	this.muS = Number(MUS);
	this.motor = new Motor(v,vu,t,tu,gear);
	this.wheelDiameter = Number(wD);
	this.wheelUnits = wU;
}
function StaticPoint(i,j,k,u,MUK,MUS){
	this.r = new Vector(i,j,k,u);
	this.muK= Number(MUK);
	this.muS= Number(MUS);
}
function isNumber (input){
	if(Number(input)==0){
		console.log(1);
	} else if(Number(input)==Number("")){
		console.log(input);
		console.log(Number(input));
		return false;
	}
	return true;
}
function Fn(normalForce, dist){
	this.distance = Number(dist);
	this.fn = Number(normalForce);
}
function AngleRange(al,ah){
	if(ah<al){
		this.min = Math.acos(Number(ah)/Number(al))*180/Math.PI;
		this.max = 360-this.min;
	}else{
		this.max=360;
		this.min = 0;
	}
}
function Range(min,max){
	this.min=Number(min);
	this.max=Number(max);
}
function Arm(i,j,k,unit,sp,tq,tqu,gr,am,al,ah,pm,tilt){
	this.r = new Vector(i,j,k,unit);
	this.r1= new Vector(al,j,k,unit);
	this.motor = new Motor (sp, "rot/s",tq,tqu,gr);
	this.length = Number(al);
	this.height = Number(ah);
	this.massA = Number(am);
	this.massP = Number(pm);
	this.tilt=Number(tilt);
	this.range = new AngleRange(al,ah);
	this.torqueArm = this.motor.torque*this.motor.gR;
	this.aRange = new Range(rotationalA(this.massA, this.r,this.massP,this.r1, 90, this.tilt, this.torqueArm),rotationalA(this.massA, this.r,this.massP,this.r1, 270, this.tilt, this.torqueArm));
	this.maxPayload = maxPayload(this.massA, this.r,this.r1, this.tilt, this.torqueArm, this.aRange.max);
	this.minGR = minGR(this.massA, this.r,this.massP,this.r1 ,this.tilt,this.torqueArm, this.motor.gR);
}