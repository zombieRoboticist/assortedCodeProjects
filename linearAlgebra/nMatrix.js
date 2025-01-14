const Vector = require('./nVector.js');
class Matrix{
	// takes in a 1d array of vectors which corrispond to the collums
	constructor(input){
		this.list=input;
	}
	// takes in a matrix and returns a matrix the two matricies of equal size added together
	add(input){
		var temp=[];
		for(var i=0;i<this.list.length; i++){
			temp.push(this.list[i].add(input.list[i]));
		}
		return new Matrix(temp);
	}

	sub(input){
		var temp=[];
		for(var i=0;i<this.list.length; i++){
			temp.push(this.list[i].sub(input.list[i]));
		}
		return new Matrix(temp);
	}
	times(input){
		var temp=[];
		for(var i=0;i<this.list.length; i++){
			temp.push(this.list[i].times(input));
		}
		return new Matrix(temp);
	}
	divide(input){
		var temp=[];
		for(var i=0;i<this.list.length; i++){
			temp.push(this.list[i].divide(input));
		}
		return new Matrix(temp);
	}
	termInverse(input){
		var temp=[];
		for(var i=0;i<this.list.length; i++){
			temp.push(this.list[i].inverse(input));
		}
		return new Matrix(temp);
	}
	static toArray(input){
		var temp=[];
		for(var i=0;i<input.list.length; i++){
			temp.push(input.list[i].getSet());
		}
		return temp;
	}
	static toMatrix(input){
		var temp =[];
		for(var i=0; i<input.length;i++){
			temp.push(new Vector(input[i]));
		}
		return new Matrix(temp);
	}
	det(){
		var data = Matrix.toArray(new Matrix(this.list));
		if(data.length ==1){
			return data[0][0];
		} else if(data.length==2){
			return (data[0][0]*data[1][1]-data[0][1]*data[1][0]);
		}else{
			var deter=0;
			for( var c=0; c<data[0].length;c++){
				var ne =[];
				for( var i = 1; i<data.length;i++){
					var temp=[];
					for (var n =0; n< data.length;n++){
						if (n!=c){
							temp.push(data[i][n]);
						}
					}
					ne.push(new Vector(temp));
				}
				deter+= data[0][c]*(new Matrix(ne)).det()*Math.pow(-1,c+1);
			}
			return -1*deter;
		}
	}
	transpose(){
		var data = Matrix.toArray(new Matrix(this.list));
		var out =[];
		for (var i =0; i<data[0].length; i++){
			var temp=[];
			for( var j=0; j<data.length;j++){
				temp.push(data[j][i]);
			}
			out.push(new Vector(temp));
		}
		return new Matrix(out);
	}
	inverse(){
		var data = Matrix.toArray(new Matrix(this.list));
		if(data.length==data[0].length){
			var deter= this.det();
			var trans = this.transpose();
			if(deter==0){
				return "degenerate matrix";
			}else{
				var out=[];
				//console.log("check 1");
				for( var r=0; r<trans.list.length; r++){
					//console.log("check 2")
					var tempr=[];
					for( var c=0; c<trans.list[0].getSet().length;c++){
						//console.log("check 3");
					var ne =[];
						for( var i = 0; i<trans.list.length;i++){
							//console.log("check 4");
							var temp=[];
							for (var n =0; n< trans.list.length;n++){
								//console.log("check 5");
								if (n!=c&&i!=r){
									temp.push(trans.list[i].getSet()[n]);
								}
							}
							if(i!=r){
								ne.push(new Vector(temp));
								//console.log(ne)
							}
						}
						tempr.push(((new Matrix(ne)).det())*Math.pow(-1,(r+c)));
					}
					out.push(new Vector(tempr));
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
			ident.push(new Vector(inter));
		}
		return new Matrix(ident);
	}
	static rowReduction(input){
		for( var i=0; i<input.list[0].getSet().length-1; i++){
			if(input.list[i].getSet()[i]==0&&i<input.list.length-1){
				for(var j=i+1;j<input.list.length; j++ ){
					if(input.list[j].getSet()[i]!=0){
						var temp =input.list[j]
						input.list[j]=input.list[i]
						input.list[i]=temp;
						break;
					}
				}
			}
			if(input.list[i].getSet()[i]!=0&&i<input.list.length){
				input.list[i]=input.list[i].divide(input.list[i].getSet()[i]);
				for( var j=i+1; j<input.list.length; j++){
					input.list[j]=input.list[j].sub(input.list[i].times(input.list[j].getSet()[i]));
				}
				for( var j=i-1; j>=0; j--){
					input.list[j]=input.list[j].sub(input.list[i].times(input.list[j].getSet()[i]));
				}
			}
		}
		return input;
	}
	static rotate(input){
		var data = Matrix.toArray(input)
		var out =[];
		for(var i=0; i<data[0].length;i++){
			var temp = []
			for(var j=0; j<data.length;j++){
				temp.push(data[j][i])
			}
			out.push(temp)
		}
		return Matrix.toMatrix(out)
	}
}
module.exports= Matrix;
/*var c = (new Matrix([new Vector([1,2,3,4]),new Vector([1,2,6,7]),new Vector([75,85,74,15]),new Vector([15,5,4754,45]),new Vector([15,5,4754,45])]));
console.log(c.inverse());
console.log(Matrix.toArray(Matrix.rowReduction(c)));
console.log(Matrix.toArray(c));*/