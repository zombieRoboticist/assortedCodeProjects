import numpy as np
from math import cos, sin, pi

class state:

	position: = np.zeros(3);
	velocity: =np.zeros(3);
	acceleration: =np.zeros(3);
	isAngular=False;
	isPolar=False;
	isSpherical=False
	frame=0;

	def __init__(self,position,velocity,acceleration,frame,isAngular=False,isPolar=False,isSpherical=False):
		"""initializer for the state class

		Inputs:
			position - the position vector (3x1 np array)
			velocity - the velocity vector (3x1 np array)
			acceleration - the acceleration vector (3x1 np array)
			isAngular - flag to tell if state is an angular state (bool)
			isPolar - flag to tell if state is in polar coordinates (bool)
			isSpherical - flag to tell if state is in spherical coordinates (bool)
		Outputs:
			NONE """

		self.position=position
		self.velocity=velocity
		self.acceleration=acceleration
		self.frame=frame
		self.isAngular=isAngular
		self.isPolar=isPolar
		self.isSpherical=isSpherical


	def stateToParent(self):
		"""uses kinematics to translate a state into the parent frame

		Inputs:
			NONE
		Outputs:
			the translated state"""
		if not self.isAngular:
			R=self.frame.RToParent();
			r=self.frame.offset.position+np.matmul(R,self.position)
			# v=self.frame.offset.velocity+np.matmul(R,self.velocity)+np.cross(self.frame)

class Frame:

	name=""
	isGlobal=False
	parentFrame =0
	offset=''
	angularOffset=''

	def __init__(self,name,parentFrame, offset, angularOffset, isGlobal=False):
		"""initializer for Frame class

		Inputs:
			name - the name of the frame (type=string)
			parentFrame - the frame the offset is with respect to (type=Frame)
			offset - the cartesian linear offset between frames expresed in parent frame (type= state)
			angularOffset - the cartesian angular offset between frames expresed in parent frame (type=state) Note assumes of form |theta (rad)|*axis unit vector
			isGlobal - states if this is the static global reference frame (type=bool)
		Outputs:
			NONE"""
		self.name=name
		self.parentFrame=parentFrame;
		self.offet=offset
		self.angularOffset=angularOffset
		self.isGlobal=isGlobal

	def RFromParent(self):
		""" uses Rodrigues' rotation formula to calculate the rotation matrix from parent frame to this Frame

		Inputs:
			NONE
		Outputs:
			the rotation matrix that describes the rotation from the parent frame to this frame (3x3 numpy array)
		"""
		theta=np.linalg.norm(self.angularOffset.position)
		axis =self.angularOffset.position/theta
		R=cos(theta)*np.eye(3)+sin(theta)*np.cross(np.eye(3),axis)+(1-cos(theta))*np.outer(axis,axis)
		return R

	def RToParent(self):
		""" user Rodrigues' rotation formula to calculate the rotation matrix from this frame to parent Frame

		Inputs:
			NONE
		Outputs:
			the rotation matrix that describes the rotation from the this frame to parent frame (3x3 numpy array)
		"""
		return np.transpose(self.RFromParent())

	def RFromGlobal(self):
		""" uses Rodrigues' rotation formula to calculate the rotation matrix from global frame to this Frame Note:does not factor in offsets

		Inputs:
			NONE
		Outputs:
			the rotation matrix that describes the rotation from the global frame to this frame (3x3 numpy array)
		"""
		if self.parentFrame.isGlobal:
			return self.RFromParent()
		return np.matmul(self.RFromParent(),self.parentFrame.RFromGlobal())

	def RToGlobal(self):
		""" uses Rodrigues' rotation formula to calculate the rotation matrix from this frame to global Frame Note:does not factor in offsets

		Inputs:
			NONE
		Outputs:
			the rotation matrix that describes the rotation from the this frame to global frame (3x3 numpy array)
		"""
		return np.transpose(self.RFromGlobal())


