from quaternion import Quaternion, Orientation, Vector

# print('hello')

class ReferenceFrame(object):
	"""class describing Reference Frame functions"""
	def __init__(self, parentFrame, origin, theta, omega, alpha):
		"""class initialization function

		Inputs: self, parentFrame (reference frame), origin (point describing origin in parent frame), theta (orientation quaternion describing orientation from parent frame), omega (pure vector describing rotation in parent frame), alpha (pure vector describing angular acceleration in parent frame)
		Output: none"""
		self.frame=parentFrame
		self.origin=origin
		self.theta=theta
		self.omega=omega
		self.alpha=	alpha
		self.child=[]
		self.isGlobal=False
	def addChild(self,child):
		"""add a child to the list of children

		Input: self, child (anything in the frame)
		Output: none"""
		self.child.append(child)


class Point(object):
	"""class describing a point in space"""
	def __init__(self,referenceFrame,r,v,a):
		"""class initilization function

		Inputs: self, referenceFrame (a ReferenceFrame object the position, velocity, and acceleration are in), r (pure vector describing location in reference frame), v (pure vector describing velocity in reference frame), a (pure vector describing acceleration in reference frame)
		Output: none"""
		self.frame=referenceFrame
		self.r=r
		self.v=v
		self.a=a 
		self.frame.addChild(self)
