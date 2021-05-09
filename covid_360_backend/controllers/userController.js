const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = {
	getUsers : async (req, res) => {
		try {
			const allUsers = await User.find({});
			if(allUsers){
				res.status(200).send(allUsers);
			}else{
				throw new Error({ message: "No users found at this moment. Please try again later!", status: "404" });
			}
		} catch (err){
			res.status(500).send(err);
		}
	},
	loginUser : async (req, res) => {
		const { googleId, email, userName, dob } = req.body;
		
		try{
			const foundUser = await User.findOne({ email: email });
			if(foundUser){
				console.log(foundUser);
				
				const token = jwt.sign({ _id: foundUser._id.toString(), googleId: foundUser.googleId, isDoc: foundUser.isDoc.toString() }, process.env.JWT_SECRET);
				foundUser.authTokens = foundUser.authTokens.concat({ token });

				await foundUser.save();

				res.status(200).send(foundUser);
							
			} else {
				const newUser = new User({ googleId, email, userName, dob });	
				await newUser.save();

				//generate jwt
				const token = jwt.sign({ _id: newUser._id.toString(), googleId: newUser.googleId.toString(), isDoc: newUser.isDoc.toString() }, process.env.JWT_SECRET);
				newUser.authTokens = newUser.authTokens.concat({ token });

				await newUser.save();

				res.status(200).send(newUser);
			}
		} catch (err){
			res.status(500).send(err);
		}
	}


}
