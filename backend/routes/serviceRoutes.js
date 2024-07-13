const express = require('express');
const router = express.Router();
const {getService,setService,updateService,deleteService} = require('../controllers/serviceController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getService).post(protect,setService)
router.route('/:id').put(protect,updateService).delete(protect,deleteService)


module.exports = router;