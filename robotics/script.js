 $(document).ready(function() {
	// var physics = document.createElement("script");
	// physics.src = "physics.js";
	// document.documentElement.firstChild.appendChild(physics);
	// var Vectors = document.createElement("script");
	// Vectors.src = "Vectors.js";
	// document.documentElement.firstChild.appendChild(Vectors);
	function test(){
		console.log("1");
		helloWorld();
		alert("2");
		hello();
	}

	
	// movement page
	var numpp = 0;
	var pcpList=[];
	var numsp=0;
	var scpList=[];
	var mass=0;
	var massUnits = "";
	var cpList=[];
	const FsWheel = 1;
	$(".st").hide();
	var input ="#addpcp"
	$(input).click(function(){
		$("#li2").hide();
		$("#li3").hide();
		$("#li4").hide();
		$("#trans2").hide();
		$("#trans3").hide();
		$("#trans4").hide();
		$(".sFrc").show();
		$("#ans").show();
		pcpList=[];
		numpp=parseInt($("#pcp").val());
		for(var i =0; i < numpp ; i++){
			var name = "#li"+(i+1);
			$(name).show();
		}
		if(Number($("#fs").val())==0){
			$(".sFrc").hide();
			$("#fsin1").innerHTML=FsWheel;
			$("#fsin2").innerHTML=FsWheel;
			$("#fsin3").innerHTML=FsWheel;
			$("#fsin4").innerHTML=FsWheel;
		}
	})
	$(".lipp").click(function(a){
		var ids = a.target.id;
		console.log(ids.slice(-1));
		var name = "#trans" +ids.slice(-1);
		$(name).show();
	})
	$(".finpcp").click(function(a){
		var ids = a.target.id;
		var p=ids.slice(-1);
		if(Number($("#units").val())==1){
		pcpList[(Number(p)-1)] = new PoweredPoint($("#pi"+p).val(),$("#pj"+p).val(),$("#pk"+p).val(),"cm",$("#fsin"+p).val(),$("#ms"+p).val(),"rot/s",$("#mt"+p).val(),"cmKg",$("#gr"+p).val(),$("#wd"+p).val(),"cm");
	}else if(Number($("#units").val())==0){
		pcpList[(Number(p)-1)] = new PoweredPoint($("#pi"+p).val(),$("#pj"+p).val(),$("#pk"+p).val(),"in",$("#fsin"+p).val(),$("#ms"+p).val(),"rot/s",$("#mt"+p).val(),"inlbs",$("#gr"+p).val(),$("#wd"+p).val(),"in");
	}
	})
	$("#addscp").click(function(){
		numsp=parseInt($("#scp").val());
		$("#li5").hide();
		$("#li6").hide();
		$("#li7").hide();
		$("#li8").hide();
		$(".Frc").show();
		scpList=[];
		$("#ansDiv").show();
		for(var i =0; i<numsp;i++){
			var name = "#li"+(i+5);
			$(name).show();
		}
		if(Number($("#fk").val())==1){
			$(".Frc").hide();
			$("#ckf5").innerHTML=0;
			$("#ckf6").innerHTML=0;
			$("#ckf7").innerHTML=0;
			$("#ckf8").innerHTML=0;
			$("#csf5").innerHTML=0;
			$("#csf6").innerHTML=0;
			$("#csf7").innerHTML=0;
			$("#csf8").innerHTML=0;
		}
	})
	$(".finscp").click(function(a){
		var ids = a.target.id;
		var p=ids.slice(-1);
		// console.log(p);
		if(Number($("#units").val())==1){
		scpList[(Number(p)-5)] = new StaticPoint($("#si"+p).val(),$("#sj"+p).val(),$("#sk"+p).val(),"cm",$("#ckf"+p).val(),$("#csf"+p).val());
		}else if(Number($("#units").val())==0){
		scpList[(Number(p)-5)] = new StaticPoint($("#si"+p).val(),$("#sj"+p).val(),$("#sk"+p).val(),"in",$("#ckf"+p).val(),$("#csf"+p).val());
		}
	})
	function run(){
		
		cpList=[];
		var out;
		var outfn;
		var outsP;
		var outsS=0;
		var outmt;
		var outa=0;
		mass = Number($("#rm").val());
		var tilt = Number($("#tilt").val());
		if(Number($("#units").val())==1){
			massU= "kg";
			g = g0*100;
			gUnit = "cm/s^2";
			gHat=new Vector(0,g,0,gUnit);
		}else if(Number($("#units").val())==0){
			massU= "lbs";
			g =g1;
			gUnit =g1Unit ;
			gHat=new Vector(0,g,0,gUnit);
		}
		var cenGrav = new Vector($("#cgi").val(),$("#cgj").val(),$("#cgk").val(),$("#cgu").val());
		for( var i = 0; i<numpp; i++){
			cpList[i]=pcpList[i];
		}
		for( var i = 0; i<numsp; i++){
			cpList[i]=scpList[i];
		}
		outfn = calcFn(cenGrav, cpList,mass,0,0);
		outsP = fFsnet(pcpList,outfn,0,numpp);
		if(numsp>0){
			outsS = fFknet(scpList, outfn, numpp);
		}
		outmt= motorForce(pcpList);
		outa = (Math.min(outsP,outmt)-outsS)/mass;
		var outv = speedMax(pcpList);
		var outTheta = maxAngle(cpList,numpp,cenGrav,outa,mass,3,tilt);
		console.log(outsP);
		out = "Maximum Linear Acceleration: "+(parseInt(outa*1000)/1000)+"\nMaximum Linear Speed: "+(parseInt(outv*1000)/1000)+"\nMaximum Climbable Angle: "+ outTheta;
		return out;
	}
	var calc;
	$("#ans").click(function(){
		calc = true;
		for(var i = 0; i<numpp;i++){
			if(calc){
				calc = isNumber(pcpList[i].r.i)&&isNumber(pcpList[i].r.j)&&isNumber(pcpList[i].r.k)&&isNumber(pcpList[i].motor.speed)&&isNumber(pcpList[i].motor.torque)&&isNumber(pcpList[i].motor.gR)&&isNumber(pcpList[i].muS)&&isNumber(pcpList[i].wheelDiameter);
				console.log(i);
				console.log(calc);
			}
		}
		for(var i = 0; i<numsp;i++){
			if(calc){
				calc = isNumber(scpList[i].r.i)&&isNumber(scpList[i].r.j)&&isNumber(scpList[i].r.k)&&isNumber(pcpList[i].muS)&&isNumber(pcpList[i].muK);
			}
		}
		if(calc){
			calc= (isNumber( $("#cgi").val() )&&isNumber($("#cgj").val())&&isNumber($("#cgk").val())&&isNumber($("#rm").val()));
		}
		if(!calc){
			document.getElementById("answer").innerHTML= "There are 1 or more missing or invalid inputs.";
		}else{
			document.getElementById("answer").innerHTML=run();
		}
	})
	//other math page
	$("#mgijk").click(function(){
		var output = Vector.toComponent($("#magIn").val(),$("#xyIn").val(),$("#xzIn").val(), "");
		document.getElementById("mag-th").innerHTML=output.toString();
	})
	$("#ijkmg").click(function(){
		var out = new Vector($("#iIn").val(),$("#jIn").val(),$("#kIn").val(), "");
		document.getElementById("ijk").innerHTML= out.toMagnitudeString();
	})
	$("#add").click(function(){
		var vA= new Vector ($("#aiAdd").val(),$("#ajAdd").val(),$("#akAdd").val(), "");
		var vB= new Vector ($("#biAdd").val(),$("#bjAdd").val(),$("#bkAdd").val(), "");
		document.getElementById("adOut").innerHTML=vA.add(vB).toString();
	})
	$("#sub").click(function(){
		var vA= new Vector ($("#aiAdd").val(),$("#ajAdd").val(),$("#akAdd").val(), "");
		var vB= new Vector ($("#biAdd").val(),$("#bjAdd").val(),$("#bkAdd").val(), "");
		document.getElementById("adOut").innerHTML=vA.sub(vB).toString();
	})
	$("#mul").click(function(){
		var vA= Number($("#aMul").val());
		var vB= new Vector ($("#biMul").val(),$("#bjMul").val(),$("#bkMul").val(), "");
		document.getElementById("mult").innerHTML = vB.times(vA).toString();
	})
	$("#divi").click(function(){
		var vA= Number($("#aMul").val());
		var vB= new Vector ($("#biMul").val(),$("#bjMul").val(),$("#bkMul").val(), "");
		document.getElementById("mult").innerHTML = vB.divide(vA).toString();
	})
	$("#cro").click(function(){
		var vA= new Vector ($("#aiCro").val(),$("#ajCro").val(),$("#akCro").val(), "");
		var vB= new Vector ($("#biCro").val(),$("#bjCro").val(),$("#bkCro").val(), "");
		document.getElementById("cross").innerHTML=vA.cross(vB).toString();
	})
	$("#dots").click(function(){
		var vA= new Vector ($("#aiDot").val(),$("#ajDot").val(),$("#akDot").val(), "");
		var vB= new Vector ($("#biDot").val(),$("#bjDot").val(),$("#bkDot").val(), "");
		document.getElementById("dot").innerHTML=vA.dot(vB);
	})
});