class Matrix{
	constructor(input){
		this.data=input;
	}
	add( a){
		if(a.data.length== this.data.length && a.data[0].length ==this.data[0].length){
			var out=[];
			for(var i=0;i<this.data.length;i++){
				var mid=[];
				for( var j = 0;j<this.data[0].length;j++){
					mid.push(this.data[i][j]+a.data[i][j]);
				}
				out.push(mid);
			}
			return new Matrix(out);
		} else {
			return "error";
		}
	}
	times(a){
		var out=[];
			for(var i=0;i<this.data.length;i++){
				var mid=[];
				for( var j = 0;j<this.data[0].length;j++){
					mid.push(this.data[i][j]*a);
				}
				out.push(mid);
			}
			return new Matrix(out);
	}
	sub(a){
		return (this.add(a.times(-1)));
	}
	termInverse(){
		var out=[];
			for(var i=0;i<this.data.length;i++){
				var mid=[];
				for( var j = 0;j<this.data[0].length;j++){
					mid.push(1/this.data[i][j]);
				}
				out.push(mid);
			}
			return new Matrix(out);
	}
	divide(a){
		var out=[];
			for(var i=0;i<this.data.length;i++){
				var mid=[];
				for( var j = 0;j<this.data[0].length;j++){
					mid.push(this.data[i][j]/a);
				}
				out.push(mid);
			}
			return new Matrix(out);
	}
	dot(a){
		if(this.data[0].length == a.data.length){
			var out=[];
			for(var i=0;i<this.data.length;i++){
				var inter=[];
				var midthis=[];
				for( var j = 0;j<this.data[0].length;j++){
					midthis.push(this.data[i][j]);
				}
				for( var k=0;k<a.data[0].length;k++){
					var count=0;
					for( var j = 0;j<this.data[0].length;j++){
						count+=a.data[j][k]*midthis[j];
					}
					inter.push(count);
				}
				out.push(inter);
			}
			return new Matrix(out);
		}else {
			return "error";
		}
	}
	det(){
		/* creates an expanded matrix
		var mod=[];
		for(var i=0;i<this.data.length; i++){
			var morrow=[];
			for(var j=0; j<this.data[0].length; j++){
				morrow.push(this.data[i][j]);
			}
			for(var j=0; j<this.data[0].length-1; j++){
				morrow.push(this.data[i][j]);
			}
			mod.push(morrow);
		}*/
		if(this.data.length ==1){
			return this.data[0][0];
		} else if(this.data.length==2){
			return (this.data[0][0]*this.data[1][1]-this.data[0][1]*this.data[1][0]);
		}else{
			var deter=0;
			for( var c=0; c<this.data[0].length;c++){
				var ne =[];
				for( var i = 1; i<this.data.length;i++){
					var temp=[];
					for (var n =0; n< this.data.length;n++){
						if (n!=c){
							temp.push(this.data[i][n]);
						}
					}
					ne.push(temp);
				}
				deter+= this.data[0][c]*(new Matrix(ne)).det()*Math.pow(-1,c+1);
			}
			return -1*deter;
		}
	}
	transpose(){
		var out =[];
		for (var i =0; i<this.data[0].length; i++){
			var temp=[];
			for( var j=0; j<this.data.length;j++){
				temp.push(this.data[j][i]);
			}
			out.push(temp);
		}
		return new Matrix(out);
	}
	inverse(){
		if(this.data.length==this.data[0].length){
			var deter= this.det();
			var trans = this.transpose();
			if(deter==0){
				return "degenerate matrix";
			}else{
				var out=[];
				//console.log("check 1");
				for( var r=0; r<trans.data.length; r++){
					//console.log("check 2")
					var tempr=[];
					for( var c=0; c<trans.data[0].length;c++){
						//console.log("check 3");
					var ne =[];
						for( var i = 0; i<trans.data.length;i++){
							//console.log("check 4");
							var temp=[];
							for (var n =0; n< trans.data.length;n++){
								//console.log("check 5");
								if (n!=c&&i!=r){
									temp.push(trans.data[i][n]);
								}
							}
							if(i!=r){
								ne.push(temp);
								//console.log(ne)
							}
						}
						tempr.push(((new Matrix(ne)).det())*Math.pow(-1,(r+c)));
					}
					out.push(tempr);
					//console.log(out);
				}
				var output= new Matrix(out);
				return output.times(1/deter);
			}
		} else {
			return "error";
		}
	}
	static identity(n){
		var ident=[];
		for(var i=0; i<n;i++){
			var inter=[];
			for(var j=0;j<n;j++){
				if(i==j){
					inter.push(1);
				}else{
					inter.push(0);
				}
			}
			ident.push(inter);
		}
		return new Matrix(ident);
	}
}


function createMatrix(){

}
function test(){
	/*var ints = [[1,2,3,4],[2,3,4,5],[3,4,5,6],[4,5,6,7]];
	var all = new Matrix(ints);
	console.log(all.add(all));
	console.log(all.transpose());*/
	/*var tst = new Matrix([[1,3,7],[2,11,6],[1,9,17]]);
	console.log(tst);
	console.log(tst.inverse());
	tst=new Matrix([[1,3],[5,9]]);
	console.log(tst.inverse());
	tst= new Matrix([[1,3,90,5],[7,8,9,10],[5,40,2,5],[50,2,1,4]]);
	console.log(tst.inverse());*/
	//var tst=new Matrix ([[]]);
}
//test();
module.exports= Matrix;