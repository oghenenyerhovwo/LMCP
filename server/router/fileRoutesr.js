import express from "express"

//  importing objects and functions
import { upload } from '../connections/storageConnection.js'
import { cloudinary } from '../connections/cloudinary.js'

const router = express.Router()


// create product route
router.post("/", 
    upload.single('image'),
    async (req, res) => {
        try {
            if (!req.file){
                return res.status(400).send({message: "Select image"})
            }
            try {
                await cloudinary.v2.uploader.upload(
                    req.file.path, {
                        folder: "Yelp",
                        resource_type: "image",
                    },)
                .then(data => {res.send(data.secure_url)})
                .catch(err =>res.status(404).send({message: err.message}) )
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }    
    }
);


export default router