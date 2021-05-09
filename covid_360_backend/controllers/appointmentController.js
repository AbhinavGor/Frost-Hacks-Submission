const Appointment = require('../models/Appointment');
const mongoose = require('mongoose');
const {google} = require('googleapis');
const fs = require('fs');
const readline = require('readline');

module.exports = {
	getApts : async (req, res) => {
		try{
			const allApts = await Appointment.find({});
			if(allApts){
				res.status(200).send(allApts);
			} else {
				res.status(404).send({ "message": "No appointments found now! Please try again later!" });
			}
		} catch (err) {
			res.status(500).send(err);
		}
	},
	createApt : async (req, res) => {
		try{
			const { docId, date, meetingLink } = req.body;
			const newApt = new Appointment({
				userId: mongoose.Types.ObjectId(req.user._id.toString()),
				docId: docId,
				date: date,
				meetingLink: meetingLink
			});
			console.log(newApt);

			//Google cal implementation
			const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
			const TOKEN_PATH = "../token.json"
			fs.readFile('../configuration.json', (err, content) => {
			  if (err) return console.log('Error loading client secret file:', err);
			  // Authorize a client with credentials, then call the Google Calendar API.
			  authorize(JSON.parse(content), listEvents);
				function authorize(credentials, callback) {
					  const {client_secret, client_id, redirect_uris} = credentials.installed;
					  const oAuth2Client = new google.auth.OAuth2(
					      client_id, client_secret, redirect_uris[0]);

					  // Check if we have previously stored a token.
					  fs.readFile(TOKEN_PATH, (err, token) => {
					    if (err) return getAccessToken(oAuth2Client, callback);
					    oAuth2Client.setCredentials(JSON.parse(token));
					    callback(oAuth2Client);
					  });
					}
			});

			function getAccessToken(oAuth2Client, callback) {
				  const authUrl = oAuth2Client.generateAuthUrl({
				    access_type: 'offline',
				    scope: SCOPES,
				  });
				  console.log('Authorize this app by visiting this url:', authUrl);
				  const rl = readline.createInterface({
				    input: process.stdin,
				    output: process.stdout,
				  });
				  rl.question('Enter the code from that page here: ', (code) => {
				    rl.close();
				    oAuth2Client.getToken(code, (err, token) => {
				      if (err) return console.error('Error retrieving access token', err);
				      oAuth2Client.setCredentials(token);
				      // Store the token to disk for later program executions
				      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
				        if (err) return console.error(err);
				        console.log('Token stored to', TOKEN_PATH);
				      });
				      callback(oAuth2Client);
				    });
				  });
				}

			await newApt.save();

			res.status(200).send(newApt);
		} catch(err) {
			res.status(500).send(err);
		}
	},
	updateAptStatus : async (req, res) => {
		try{
			const { aptId, aptStatus } = req.params;
			const foundApt = await Appointments.findOne({ _id: mongoose.Schema.Types.Object(aptId) });

			if(!foundApt){
				res.status(404).send({ "message": `Appointment with ID ${aptId} not found!` });
			}else{
				foundApt.status = Number(aptStatus);
			}
			await foundApt.save();

			res.status(200).send(foundApt);
		} catch(err) {
			res.status(500).send({ "message": `No appointment with ID ${aptId} found!` });
		}
	},
	getApptsAccTypes : async (req, res) => {
		try {
			const { id, type } = req.params;

			if(Number(type) == 0){
				let fApts = await Appointments.find({ docId: mongoose.Types.Schema.ObjectId(id.toString()) });
			} else if (Number(type) == 1) {
				let fApts  = await Appointments.find({ userId: mongoose.Types.Schema.ObjectId(id.toString()) });
			} else {
				res.status(400).send({ "message" : `Invalid query type ${type}` });
			}

			res.status(200).send(fApts);
		}catch(err){
			res.status(500).send(err);
		}
	}
}
