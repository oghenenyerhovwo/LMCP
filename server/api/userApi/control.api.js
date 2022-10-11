import express from "express";

import { getAllUsers, deleteAllUsers, getUser, getUserById, deleteUser, updateUser }from "./controllers/index.js";
import { isAuth } from "../../utils/index.js"

const router = express.Router();

router.get(
    "/", 
    isAuth,
    async(req, res) => {
        getUser(req, res)
    }
);

router.get(
    "/:id",
    isAuth,
    async(req, res) => {
        getUserById(req, res)
    }
);

router.put(
    "/:id",
    isAuth,
    async(req, res) => {
        updateUser(req, res)
    }
);

router.delete(
    "/:id",
    isAuth,
    async(req, res) => {
        deleteUser(req, res)
    }
);

// remove all users
router.get(
    "/getallusers", 
    async(req, res) => {
        getAllUsers(req,res)
    }
);

// get all users
router.get(
    "/deleteallusers",
    async(req, res) => {
        deleteAllUsers(req,res)
    }
);

// git subtree push --prefix server heroku master

export default router;