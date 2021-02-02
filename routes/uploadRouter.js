const express = require('express');
const bodyParser = require('body-Parser');
const authenticate = require('../authenticate');
const multer =  require('multer')

const storage =  multer.diskStorage(
    destination: (req,res,callback) = {
        callback(null, 'public/images');
    },
    filename: (req,file, callback) =>{
        callback(null, file.orginalname)
    }
);

const imageFileFilter = (req,file,callback) =>{
    if(!filke.orginalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return callback(new Error('You can upload only image files!'))
};


const uploadRouter =  express.Router();
uploadRouter.use(bodyParser.json())


//Endpoints without id
uploadRouter.route('/')

module.exports = uploadRouter;