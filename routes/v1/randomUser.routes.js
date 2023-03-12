const express= require('express');
const userApi= require('../../controllers/user.controller');
const router = express.Router();


router.route('/random').get(userApi.getRandomUser);
router.route('/all').get(userApi.getAllUser);
router.route('/save').post(userApi.saveAUser);
router.route('/update').patch(userApi.updateUser);
router.route('/bulk-update').patch(userApi.updateMultipleUsers);
router.route('/delete').delete(userApi.deleteAUser);

module.exports = router;