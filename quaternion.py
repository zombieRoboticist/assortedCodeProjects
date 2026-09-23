import numpy as np
# https://mecademic.com/insights/academic-tutorials/quaternions-in-industrial-robotics/
class Quaternion(object):

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
        """overwrite the multiplication opperator (*) to allow for easy multiplication

        Inputs: self, other (second quaternion or scalar)
        Output: quaternion representing the self*other (if scalar then element wise multiplication, if quaternion then completes cross product)"""

        if isinstance(other,(int,float)):
            return Quaternion(q1=(self.q1*other),q2=(self.q2*other),q3=(self.q3*other),q4=(self.q4*other))
        elif isinstance(other,Quaternion):
            return Quaternion(q1=(self.q1*other.q1-self.q2*other.q2-self.q3*other.q3-self.q4*other.q4),q2=(self.q1*other.q2+self.q2*other.q1+self.q3*other.q4-self.q4*other.q3),q3=(self.q1*other.q3+self.q3*other.q1-self.q2*other.q4+self.q4*other.q2),q4=(self.q1*other.q4+self.q4*other.q1+self.q2*other.q3-self.q3*other.q2))
        return NotImplemented

    def __rmul__(self,other):
        """overwrite the multiplication opperator (*) to allow for easy multiplication

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
    print(t1.inv())
    print(t1.normalize())
