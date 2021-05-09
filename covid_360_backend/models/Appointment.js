const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	docId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	date: {
		type: Date
	},
	meetingLink: {
		type: String,
	},
	status: {
		type: Number,
		default: 0
	},
	fee: {
		type: Number
	}
});

appointmentSchema.methods.calcFee = async function (docId) {
	const foundDoc = await User.findOne({ _id: mongoose.Schema.Types.ObjectId(docId) })
	if(!docId){
		res.status(500).send({ "message": "Could not calculate doctor fee!" });
	}else{
		this.fee = foundDoc.fee;
		await this.save();
	}

	return this;
}
const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;

