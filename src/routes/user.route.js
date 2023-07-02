import express from 'express';
import {protectRoute , acess} from '../config/auth.js'
import {getAll , getME , deleteUser} from '../controller/user.controller.js'
const router = express.Router();


// @desc       Show All Users
// @route      POST /api/v1/users
// @access     Private
router.route('/').get(protectRoute , acess , getAll);



// @desc       get User Profile
// @route      POST /api/v1/user?me
// @access     Private - Need Token
router.route('/:me').get(protectRoute , getME);



// @desc       Delete User
// @route      Delete /api/v1/user?me
// @access     Private 
router.route('/:id').delete(protectRoute  , acess, deleteUser);
export default router;