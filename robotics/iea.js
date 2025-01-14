const Vector = require("./vectors.js");
const Matrix = require("./matrix.js");
class IEA{

	static vectorsToMatrix(a,b,c){
		return new Matrix([[a.i,a.j,a.k],[b.i,b.j,b.k],[c.i,b.j,c.k]]);
	}
	static matrixToVectors(a){
		var out = [];
		for ( var i =0; i<a.data.length; i++){
			var b,c,d=0;
			if(a.data[i][0]!= null){
				b=a.data[i][0];
			} 
			if(a.data[i][1]!= null){
				c=a.data[i][1];
			} 
			if(a.data[i][2]!= null){
				d=a.data[i][2];
			} 
			out.push( new Vector(b,c,d,""));
		}
		return out;
	}
	static momentPoint(r,f){
		return r.cross(f);
	} 
	static netForce(a){
		var out = new Vector(0,0,0,"");
		for(var i =0;i<a.length;i++){
			out=out.add(a[i]);
		}
		return out;
	}
	static momentAxis(u,r,f){
		return u.toUnit().times(vectorsToMatrix(u.toUnit(),r,f).det());
	}
	static component(u,f){
		return u.toUnit().dot(f);
	}
}
module.expots=IEA;