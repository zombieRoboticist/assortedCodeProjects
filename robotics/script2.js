 var untat;
 $(document).ready(function() {
 	function runArm(arm){
 		console.log("run");
 		var max =arm.range.max;
 		var min =arm.range.min;
 	// 	if(max == Math.acos(320)){
		// 	max=360;
		// }
		// if(min == Math.acos(320)){
		// 	min = 0;
		// }
 		var out = " Angle Range: "+min + "° - "+max + "° \n Acceleration Range: "+arm.aRange.min.toStringF(3)+ " - "+ arm.aRange.max.toStringF(3) + "\n Maximum Payload: "+ arm.maxPayload+" Minimum Gear Ratio "+ arm.minGR;
 		document.getElementById("armAns").innerHTML = out;
 	}
 	$("#rnrm").click(function(){
 		var unta;
 		if(Number($("#unitsa").val())==1){
 			g = g0*100;
			gUnit = "cm/s^2";
			gHat=new Vector(0,g,0,gUnit);
			unta = "cm";
			untat = "cmkg";
 		}else if(Number($("#unitsa").val())==0){
 			g = g1*100;
			gUnit = "in/s^2";
			gHat=new Vector(0,g,0,gUnit);
			unta ="in";
			untat = "inlbs";
 		}
 		var arm;
 		if(isNumber($("#cgai").val())&&isNumber($("#cgaj").val())&&isNumber($("#cgak").val())&&isNumber($("#am").val())&&isNumber($("#al").val())&&isNumber($("#ah").val())&&isNumber($("#pm").val())&&isNumber($("#tilta").val())&&isNumber($("#mta").val())&&isNumber($("#msa").val())&&isNumber($("#gra").val())){
 			arm = new Arm(Number($("#cgai").val()),Number($("#cgaj").val()),Number($("#cgak").val()), unta, $("#msa").val(),$("#mta").val(),untat,$("#gra").val(),$("#am").val(),$("#al").val(),$("#ah").val(),$("#pm").val(),Number($("#tilta").val()));
 			runArm(arm);
 		} else {
 			document.getElementById("armAns").innerHTML = "There are 1 or more missing or invalid inputs.";
 		}
 	})
 })