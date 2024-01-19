const { Router } = require('express');
const authController = require('../controllers/authController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const User = require("../models/User");

const router = Router();

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/listRecords', requireAuth, authController.userRecords_get);
router.post('/listRecords', requireAuth, authController.userRecords_post);
// For updating a record
router.put('/editRecord/:id', requireAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, phone, profession } = req.body;
        const data = await User.findByIdAndUpdate(id, { email, phone, profession });
        res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            errors: err.message
        });
    }
});

// For deleting a record
router.delete('/deleteRecord/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const data = await User.findByIdAndDelete(id);
        res.status(200).json({ data: data });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            errors: err.message
        });
    }
});

module.exports = router;