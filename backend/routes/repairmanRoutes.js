const express = require('express');
const router = express.Router();
const {getRepairman,setRepairman,updateRepairman,deleteRepairman} = require('../controllers/repairmanController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getRepairman).post(protect,setRepairman)
router.route('/:id').put(protect,updateRepairman).delete(protect,deleteRepairman)


module.exports = router;