const router = require('express').Router(),
    userController = require('../controller/userController'),
    check = require('express-validator').check,
    authJwt = require('../middleware/authJwt')

    
// get user profile
router.get('/profile',userController.getProfile)

// update user
router.put('/profile',[
    check('email','The system does not allow email updates.').isEmpty(),
    check(['firstName','lastName','birthDate'],'first name or last name or birthDate should not be empty').not().isEmpty(),
    check('password','Password should not be empty, minimum eight characters, at least one letter, one number and one special character').isLength({min: 8})
],userController.updateProfile)

// delete user
router.delete('/profile',authJwt.isAdmin,userController.deleteProfile)

module.exports = router;