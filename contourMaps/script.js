import {eval}from 'mathjs'
var funct ="(x^2)+(y^2)"
var x =2;
var y=0;

console.log(func(x,y,funct));
function isNumber(num){
        if(Number(num)== Number("x"))
            return false;
        return true;
    }
function func (x,y,funct){
    var functs=funct.split("x");
    var functn ="";
    for( var c = 0; c<(functs.length-1);c++){
        functn = functn+functs[c]+x;
    }
    functn+= functs[functs.length-1];
    functs=functn.split("y");
    functn ="";
    for( var c = 0; c<(functs.length-1);c++){
        functn = functn+functs[c]+y;
    }
    functn+= functs[functs.length-1];
    return math.eval(functn);
}
    var xlow;
    var xhi;
    var ylow;
    var yhi;
    var zlow;
    var zhi;
    var eqn;
    var data=[];
    var int;
    var can;
    var ctx ;
/* $(document).ready(function() {
    can = document.getElementById("graph");
    ctx=can.getContext("2d");
    $("#calc").click(function(a) {
        console.log("hi");
        xhi=$("#xhigh").val();
        xlow=$("#xlo").val();
        yhi=$("#yhigh").val();
        ylow=$("#ylo").val();
        zhi=$("#zhigh").val();
        zlow=$("#zlo").val();
        eqn=$("#equ").val();
        //console.log(xhi);
        console.log(xlow);
        if(isNumber(xhi)&&isNumber(yhi)&&isNumber(zhi)&&isNumber(xlow)&&isNumber(ylow)&&isNumber(zlow)){
            xhi= Number(xhi);
            xlow= Number(xlow);
            yhi= Number(yhi);
            ylow= Number(ylow);
            zhi= Number(zhi);
            zlow= Number(zlow);
            console.log(xhi);
            int = Math.max(((xhi-xlow)/screen.availWidth), ((yhi-ylow)/screen.availHeight));
            can.width=screen.availWidth;
            can.height=screen.availHeight;
            ctx== can.getContext("2d");
            //data=[(xhi-xlow)/int][(yhi-ylow)/int];
            // data=[...Array((xhi-xlow)/int)].map(e => Array((yhi-ylow)/int))

            for(var a=0;a<(xhi-xlow)/int;a++){
                var datum=[];
                for(var b=0;b<(yhi-ylow)/int;b++){
                    // datum[b]=func( (xlow+a*int),(ylow+b*int),eqn);
                    var pxl=Number(func((xlow+a*int),(ylow+b*int),eqn));
                    if(pxl==Number("s")){
                        console.log(NaN);
                        ctx.fillStyle= 'white';
                    }else if((zhi-zlow)/6+zlow>pxl){
                        ctx.fillStyle= 'purple';
                    }else if(2*(zhi-zlow)/6+zlow>pxl){
                        ctx.fillStyle= 'blue';
                    }else if(3*(zhi-zlow)/6+zlow>pxl){
                        ctx.fillStyle= 'green';
                    }else if(4*(zhi-zlow)/6+zlow>pxl){
                        ctx.fillStyle= 'yellow';
                    }else if(5*(zhi-zlow)/6+zlow>pxl){
                        ctx.fillStyle= 'orange';
                    }else {
                        ctx.fillStyle= 'red';
                    }
                    ctx.fillRect(a,b,1,1)
                }
                // data[a]=datum;
            }


        }else{
            console.log("Error: invalid input")
        }
    })
})*/