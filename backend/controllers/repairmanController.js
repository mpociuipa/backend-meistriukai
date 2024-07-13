const asyncHandler = require('express-async-handler');

const Repairman = require('../models/repairmanModel');
const User = require('../models/userModel');

//@desc  Get repairmans
// @route  Get /api/repairmans
// @access Private
const getRepairman = asyncHandler( async (req,res)=>{
    const repairman = await Repairman.find({user: req.user.id});
    res.status(200).json(repairman)
})
//@desc  Set repairman
// @route  Post /api/repairmans
// @access Private
const setRepairman = asyncHandler(async (req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a tet field')
    }
    const repairman = await Repairman.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(repairman)
})
//@desc  Update repairman
// @route  Put /api/repairmans/:id
// @access Private
const updateRepairman = asyncHandler( async (req,res)=>{
    const repairman = await Repairman.findById(req.params.id);
    if(!repairman){
        res.status(400)
        throw new Error('repairman not found')
    }
    //Check for user
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
        //Make sure the logged in user matches the repairman user
    if(repairman.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    
    const updatedRepairman = await Repairman.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedRepairman)
})
//@desc  Delete repairman
// @route  Delete /api/repairmans/:id
// @access Private
const deleteRepairman = asyncHandler(async (req,res)=>{
   const repairman = await Repairman.findById(req.params.id);
   if(!repairman){
    res.status(400)
    throw new Error('repairman not found')
   }    
   //Check for user
   const user = await User.findById(req.user.id)
   if(!user){
       res.status(401)
       throw new Error('User not found')
   }
       //Make sure the logged in user matches the repairman user
   if(repairman.user.toString() !== req.user.id){
       res.status(401)
       throw new Error('User not authorized')
   }
    await repairman.deleteOne(); // Dokumento metodas
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getRepairman,
    setRepairman,
    updateRepairman,
    deleteRepairman,
}