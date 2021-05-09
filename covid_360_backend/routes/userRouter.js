const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/allUsers', userController.getUsers);
router.post('/userAuth', userController.loginUser);

module.exports = router;
 
