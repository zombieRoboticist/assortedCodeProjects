import numpy as np
import math
# https://mecademic.com/insights/academic-tutorials/quaternions-in-industrial-robotics/
class Quaternion(object):
    "Implementation of quaternion methods"
    def __init__(self,q1=0,q2=0,q3=0,q4=0):
        """ class initialization function

        Inputs: self, q1 (number representing first component of the quaternion), q2 (number representing second component of the quaternion), q3 (number representing third component of the quaternion), q4 (number representing fourth component of the quaternion)
        Outputs: none"""
        self.q1=q1
        self.q2=q2
        self.q3=q3
        self.q4=q4
    def __str__(self):
        """class toString method:

        Inputs: self
        Output: a string representing the quaternion in complex number notation"""
        return str(self.q1)+' + '+str(self.q2)+'i + '+str(self.q3)+'j + '+str(self.q4)+'k'
    def __add__(self,other):
        """overwrite the plus opperator (+) to allow for easy addition

        Inputs: self, other (second quaternion)
        Output: quaternion representing the self+other"""
        return Quaternion(q1=(self.q1+other.q1),q2=(self.q2+other.q2),q3=(self.q3+other.q3),q4=(self.q4+other.q4))

    def __mul__(self,other):
        """overwrite the multiplication opperator (*) to allow for easy multiplication (Cross product)

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the self*other (if scalar then element wise multiplication, if quaternion then completes cross product)"""

        if isinstance(other,(int,float)):
            return Quaternion(q1=(self.q1*other),q2=(self.q2*other),q3=(self.q3*other),q4=(self.q4*other))
        elif isinstance(other,Quaternion):
            return Quaternion(q1=(self.q1*other.q1-self.q2*other.q2-self.q3*other.q3-self.q4*other.q4),q2=(self.q1*other.q2+self.q2*other.q1+self.q3*other.q4-self.q4*other.q3),q3=(self.q1*other.q3+self.q3*other.q1-self.q2*other.q4+self.q4*other.q2),q4=(self.q1*other.q4+self.q4*other.q1+self.q2*other.q3-self.q3*other.q2))
        return NotImplemented

    def __rmul__(self,other):
        """overwrite the multiplication opperator (*) to allow for easy multiplication (Cross product)

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the other*self (if scalar then element wise multiplication)"""
        if isinstance(other,(int,float)):
            return self.__mul__(other)
        return NotImplemented
    def inv(self):
        """invert the quaternion

        Input: self
        output: the inverted Quaternion"""
        return (1/(self.norm()**2))*self
    def norm(self):
        """return the euclidean norm of the quaternion

        input: self
        output: scalar norm of quaternion"""
        return (self.q1**2+self.q2**2+self.q3**2+self.q4**2)**.5
    def normalize(self):
        """normalize the quaternion

        input: self
        output: the normalized quaternion"""
        return self/(self.norm()**2)
    def __truediv__(self,other):
        """overwrite the standard division opperator (/) to allow for easy division

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the self/other (if scalar then element wise division)"""
        if isinstance(other,(int,float)):
            return self.__mul__(1/other)
        elif(isinstance(other,Quaternion)):
            return self.__mul__(other.inv())
        return NotImplemented
    def __rtruediv__(self,other):
        """overwrite the standard division opperator (/) from the right side to allow for easy division

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the other/self (if scalar then element wise division)"""
        if isinstance(other,(int,float)):
            return other*self.inv()
        elif(isinstance(other,Quaternion)):
            return other.__mul__(self.inv())
        return NotImplemented
    def __floordiv__(self,other):
        """overwrite the floor division opperator (//) to allow for easy left had division ( q\\p=q^-1 x p)

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the self//other (self\\other) (if scalar then element wise division)"""
        if isinstance(other,(int,float)):
            return other*self.inv()
        elif(isinstance(other,Quaternion)):
            return self.inv().__mul__(other)
        return NotImplemented
    def __rfloordiv__(self,other):
        """overwrite the floor division opperator (//) from the right side to allow for easy left had division ( q\\p=q^-1 x p)

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the other//self (other\\self) (if scalar then element wise division)"""
        if isinstance(other,(int,float)):
            return self.__truediv__(other)
        elif(isinstance(other,Quaternion)):
            return other.inv().__mul__(self)
        return NotImplemented
    def __sub__(self,other):
        """overwrite the subtraction opperator (-) to allow for easy subtraction

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the self-other"""
        if isinstance(other, Quaternion):
            return self+((-1)*other)
        elif isinstance(other,(int,float)):
            return Quaternion(self.q1-other, self.q2, self.q3,self.q4)
        return NotImplemented
    def __rsub__(self,other):
        """overwrite the subtraction opperator (-) to allow for easy subtraction

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the other-self"""
        if isinstance(other,(int,float, Quaternion)):
            return -1*self.__sub__(other)
        return NotImplemented
    def __matmul__(self,other):
        """overwrite the matrix multiplication opperator (@) to allow for easy multiplication (dot product)

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the self*other (if scalar then element wise multiplication, if quaternion then completes cross product)"""

        if isinstance(other,Quaternion):
            return self.q1*other.q1+self.q2*other.q2+self.q3*other.q3+self.q4*other.q4
        return NotImplemented
    def __rmatmul__(self,other):
        """overwrite the matrix multiplication opperator (@) to allow for easy multiplication (dot product)

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the other*self (if scalar then element wise multiplication)"""
        if isinstance(other,Quaternion):
            return self.__matmul__(other)
        return NotImplemented
    def dot(self,omega):
        """implement cross product method to take temporal derivative
    https://www.iri.upc.edu/people/jsola/JoanSola/objectes/notes/kinematics.pdf pg 21
        Input: self, omega (pure vector describing angular velocity)
        Output: a vector describing the derivative of the quaternion"""
        return .5*self*omega
    def ddot(self,omega,alpha):
        """implement cross product method to take temporal derivative
https://www.iri.upc.edu/people/jsola/JoanSola/objectes/notes/kinematics.pdf pg 21
        Input: self, omega (pure vector describing angular velocity), alpha (pure vector describing angular acceleration)
        Output: a vector describing the second derivative of the quaternion"""
        return .25*self*omega*omega+.5*self*alpha
    def exp(w=self):
        """implement exponetial function (e^w) for quaternions
https://www.iri.upc.edu/people/jsola/JoanSola/objectes/notes/kinematics.pdf
        inputs: w (quaternion defaults to self)
        output: a quaternion describing  e^w"""
        theta=w.norm()
        sin=math.sin(theta)
        return math.exp(w.q1)*Quaternion(q1=math.cos(theta),q2=w.q2*sin/theta,q3=w.q3*sin/theta,q4=w.q4*sin/theta)
    def wdt(w,dt)
        """implements the step update for a quaternion rotated at angular velocity w for time step dt

        Inputs: w (a pure quaternion describing the angular velocity), dt (the timestep for the update)
        output: a quaternion describing the change in orientation"""
        return (w*dt/2).exp()
    def rotateQuaternion(q=self,p):
        """implements the step update to rotate a quaternion q by step p=w*dt

        inputs: q (quaternion, default = self) p (quaternion)
        output a quaternion defined as q*p"""
        return q*p

class Vector(Quaternion):
    """Implementation of vector mathematics using quaternions. Also called a pure quaternion, it only exists in the 3 imaginary axis of the quaternion"""
    def __init__(self,i=0,j=0,k=0):
        """ class initialization function

        Inputs: self, i (number representing the first component of the vector and second component of the quaternion), j (number representing the second component of the vector and third component of the quaternion), k (number representing the third component of the vector and fourth component of the quaternion)
        Outputs: none"""
        super().__init__(q1=0,q2=i,q3=j,q4=k)

class Orientation(Quaternion):
    "implementation of unit quaternions for use as orientation representations"
    def setAxisAngle(u, theta):
        """create a quaternion with a given axis and angle

        Inputs: u (a vector that describes the axis of rotation) and theta (the angle around the axis in degrees)
        Output: a unit quaternion that desribes the orrientation (q={cos(theta/2), ux sin(theta/2)/|u|, uy sin(theta/2)/|u|, uz sin(theta/2)/|u|})"""
        temp=u.normalize()
        halfDeg=math.radians(theta)/2
        return(Orientation(q1=math.cos(halfDeg), q2=temp.q2*math.sin(halfDeg), q3=temp.q3*math.sin(halfDeg), q4=temp.q4*math.sin(halfDeg)))
    def getAxisAngle(self):
        """create a vector describing the axis and the angle around the axis described by the quaternion

        Inputs: self (q={cos(theta/2), ux sin(theta/2)/|u|, uy sin(theta/2)/|u|, uz sin(theta/2)/|u|})
        Output: a unit vector that desribes the axis , theta the angle of rotation in degrees"""
        if self.q1<0:
            self=self*-1
        theta=math.degrees(math.acos(self.q1))*2
        sinHalfTheta=math.sin(math.radians(theta/2))
        i=self.q2/sinHalfTheta
        j=self.q3/sinHalfTheta
        k=self.q4/sinHalfTheta
        u=Vector(i=i,j=j,k=k)
        return u,theta
    def setR(R):
        """create a quaternion from a rotation matrix

        Inputs: R (a rotation matrix)
        Output: a unit quaternion that desribes the orrientation """
        q1=((1+R[0,0]+R[1,1]+R[2,2])**(.5))/2
        q2=np.sign(R[2,1]-R[1,2])*((1+R[0,0]-R[1,1]-R[2,2])**(.5))/2
        q3=np.sign(R[0,2]-R[2,0])*((1-R[0,0]+R[1,1]-R[2,2])**(.5))/2
        q4=np.sign(R[1,0]-R[0,1])*((1-R[0,0]-R[1,1]+R[2,2])**(.5))/2
        return Orientation(q1=q1,q2=q2,q3=q3,q4=q4)
    def getR(self):
        """create a rotation matrix from a quaternion

        Inputs: self (a unit quaternion that desribes the orrientation)
        Output: R (a rotation matrix given by a 3x3 np array) """
        R=np.array([[0,0,0],[0,0,0],[0,0,0]])
        R[0,0]=2*self.q1**2+2*self.q2**2-1
        R[1,1]=2*self.q1**2+2*self.q3**2-1
        R[2,2]=2*self.q1**2+2*self.q4**2-1
        R[0,1]=2*self.q2*self.q3-2*self.q1*self.q4
        R[1,0]=2*self.q2*self.q3+2*self.q1*self.q4
        R[0,2]=2*self.q2*self.q4+2*self.q1*self.q3
        R[2,0]=2*self.q2*self.q4-2*self.q1*self.q3
        R[1,2]=2*self.q3*self.q4-2*self.q1*self.q2
        R[2,1]=2*self.q3*self.q4+2*self.q1*self.q2
        return R
    def inv(self):
        """invert the quaternion

        Input: self
        output: the inverted Orientation Quaternion"""
        return Orientation(q1=self.q1,q2=-1*self.q2,q3=-1*self.q3,q4=-1*self.q4)
    def transform(p,v):
        """do a coorinate transform of quaternion v by rotation described by p

        Inputs: p, v (quaternion)
        Output: Vtransform (a quaternion describing the transformed V vtrans=p x V x p^-1)"""
        return p*v*p.inv()
    def minRotation(q,p):
        """use d=q^-1p to describe the path of minimum rotation between 2 poses or toque minimal path

        Inputs: q (starting orientation quaternion), p (end orientation quaternion)
        Output: orientation quaternion describing the minimum rotation, the rotation axis, the angle or rotation in degrees, flip (if the minimum path is rotation about the oposite direction described by multiplying one of the poses by -1)"""
        d=q.inv()*p
        flip=False
        if d.q1<0:
            d=-1*d
            flip=True
        u,theta=d.getAxisAngle()
        return d,u,theta,flip
    def slerpStep(q,p,theta,t,flip=False):
        """spherical linear interpolation from orientation quaternion q to orientation quaternion p along torque minimal path with angle theta at interval t

        Inputs: q (starting orientation quaternion), p (ending orientation quaternion), theta (angle of torque minimal path in degrees), t (interval of interpolation between 0 and 1, flip (if the rotation direction is flipped, defaults to false)
        Output: an orientation quaternion described by the step t"""
        sign=1
        radHalf=math.radians(theta)/2
        if flip:
            sign=-1
        return (math.sin((1-t)*radHalf)*q+math.sin(t*radHalf)*sign*p)/math.sin(radHalf)
    def slerpPath(q,p,n,allowFlip=True):
        """list spherical linear interpolation points from orientation quaternion q to orientation quaternion p along torque minimal path at n intervals

        Inputs: q (starting orientation quaternion), p (ending orientation quaternion), n (integer number of intervals), allowFlip ( allow the rotation direction to flip if the rotation direction is not correct for torque minimal path, defaults to true)
        Output: an numpy array of n+1 orientation quaternions from each interval step starting at q and ending at p"""
        d,u,theta,flip=Orientation.minRotation(q,p)
        out=np.zeros(n+1)
        if not allowFlip and flip:
            thetap=-1*(360-theta)/2
            pprime=Orientation.transform(Orientation.setAxisAngle(u,thetap),q)
            np=(n-1)/2
            if n%2==0:
                np=np-.5
            out1=Orientation.slerpPath(q,pprime,np,allowFlip=False)
            out2=Orientation.slerpPath(pprime,p,np,allowFlip=False)
            for i in np:
                out[i]=out1[i]
                out[i+np]=out2[i]
            out[-1]=p
            return out
        for i in range(1,n):
            out[i]=Orientation.slerpStep(q,p,theta,i/n,flip=flip)
        out[0]=q
        out[-1]=p
        return out
        
def test():
    t1=Quaternion(1,2,3,4)
    t2=Quaternion(3,4,5,6)
    print(t1)
    print((t1+t2))
    print((3*t1))
    print((t1*2.5))
    print((t1*t2))
    print((t2*t1))
    print(t1/2)
    print(t1/t2)
    print(t2/t1)
    print(t1//t2)
    print(t2//t1)
    print(1/t1)
    print(1//t1)
    print(t1//1)
    print(t1-t2)
    print(t2-t1)
    print(5-t1)
    print(t1-5.3)
    print(t1.norm())
    print(t1@t1)
    print(t1.inv())
    print(t1.normalize())
    print(t1@t2)
