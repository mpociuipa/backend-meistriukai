const asyncHandler = require('express-async-handler');

const Service = require('../models/serviceModel');
const User = require('../models/userModel');

//@desc  Get services
// @route  Get /api/services
// @access Private
const getService = asyncHandler( async (req,res)=>{
    const services = await Service.find({user: req.user.id});
    res.status(200).json(services)
})
//@desc  Set service
// @route  Post /api/services
// @access Private
const setService = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a tet field')
    }
    const service = await Service.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(service)
})
//@desc  Update service
// @route  Put /api/services/:id
// @access Private
const updateService = asyncHandler( async (req,res)=>{
    const service = await Service.findById(req.params.id);
    if(!service){
        res.status(400)
        throw new Error('service not found')
    }
    //Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
        //Make sure the logged in user matches the service user
    if(service.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const updatedService = await Service.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedService)
})
//@desc  Delete service
// @route  Delete /api/services/:id
// @access Private
const deleteService = asyncHandler(async (req,res)=>{
   const service = await Service.findById(req.params.id);
   if(!service){
    res.status(400)
    throw new Error('service not found')
   }    
   //Check for user
   const user = await User.findById(req.user.id)
   if(!user){
       res.status(401)
       throw new Error('User not found')
   }
       //Make sure the logged in user matches the service user
   if(service.user.toString() !== req.user.id){
       res.status(401)
       throw new Error('User not authorized')
   }
    await service.deleteOne(); // Dokumento metodas
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getService,
    setService,
    updateService,
    deleteService,
}