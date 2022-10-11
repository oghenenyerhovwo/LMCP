import User from "../../../models/userModel.js"
import Story from "../../../models/storyModel.js";
import Comment from "../../../models/commentModel.js";

import { findUser } from "./userFunctions.js"

import { isAdmin, isAuthor } from "../../../utils/index.js"

const deleteActivitiesOfAccount = async (Model, account) => {
    const allActivities = await Model.find().populate("author")
    allActivities.forEach(async activity => {
            if(activity.author && (String(activity.author._id )=== String(account._id))){
                await Model.findByIdAndDelete(activity._id);
            }
        });
}

export const getUser = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        
        if(!foundUser){
            return res.status(404).send({message: "User Not Found"})
        }
        res.status(200).send({user: foundUser})    
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not find all users"})
    }
}


export const getAllUsers = async(req, res) => {
    try {
        const allUsers= await User.find();
        res.json(allUsers);       
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not find all users"})
    }
}

export const deleteAllUsers = async(req, res) => {
    try {
        const allUsers= await User.deleteMany({});
        res.json(allUsers);       
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not find all users"})
    }
}

export const getUserById = async(req, res) => {
    try {
        const foundUser= await User.findById(req.params.id);
        res.json({user: foundUser});       
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not get profile"})
    }
}

export const deleteUser = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        const foundAuthor = await   findUser({_id: req.params.id})

        if(!foundUser || !foundAuthor){
            return res.status(404).send({message: "Invalid account"})
        } 
        
        if(!isAuthor(foundUser, foundAuthor) && !isAdmin(foundUser)){
            return res.status(404).send({message: "Only admins or owner of account is allowed"})
        } 
        
        await deleteActivitiesOfAccount(Story, foundUser)
        await deleteActivitiesOfAccount(Comment, foundUser)


        const deletedUser= await User.findByIdAndDelete(req.params.id);
         res.json(deletedUser._id); 
              
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not delete account"})
    }
}

export const updateUser = async(req, res) => {
    try {
        const foundUser = await findUser({email: req.user.email})
        const foundAuthor = await   findUser({_id: req.params.id})

        if(!foundUser || !foundAuthor){
            return res.status(404).send({message: "Invalid account"})
        } 
        
        if(isAuthor(foundUser, foundAuthor)){
            const updatedUser= await User.findByIdAndUpdate(req.params.id, req.body);
            return res.json({id: updatedUser._id}); 
        } 
        res.status(404).send({message: "Only admins or owner of account is allowed"})
              
    } catch (error) {
        console.log(error)
        res.status(404).send({message: "Server error: Could not delete account"})

    }
}     