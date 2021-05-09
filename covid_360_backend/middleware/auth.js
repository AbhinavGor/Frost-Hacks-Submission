const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
	try{
	const token = req.header("Authorization").replace("Bearer ", "");

	const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
	const { googleId } = decodedToken;
	
	const authUser = await User.findOne({ googleId: googleId  });
	console.log(authUser);

	if(!authUser){
		res.status(404).send({"message": `User with googleId ${decodedToken.googleId} not found` });
	}else{
		req.token = token;
		req.user = authUser;
		next();
	}
	}catch(e) {
		console.log(e);
		res.status(401).send("Please authenticate");
	}
}

module.exports = { auth };
