const crudModel = require('../models/crudApi.models')
const fs = require('fs')

class crudcontroller{
// welcome status 

    async welcomeStatus(req,res){
        try{
            res.status(200).json({
                msg:"welcome"
            })

        }catch(err){
            throw err
        }

    }

//   insert Data 

    async insertData(req,res){
        try{
            if (_.isEmpty(req.body.name)) {
                res.status(400).json({
                    msg:"name is required",
                    data:[]
                })
                
            }

            if (_.isEmpty(req.body.email)) {
                res.status(400).json({
                    msg:"email is required",
                    data:[]
                })
                
            }

            if (_.isEmpty(req.body.age)) {
                res.status(400).json({
                    msg:"age is required",
                    data:[]
                })
                
            }

            if (_.isEmpty(req.body.sex)) {
                res.status(400).json({
                    msg:"sex is required",
                    data:[]
                })
                
            }

            let is_email_exists = await crudModel.findOne({email:req.body.email})
            if (!_.isEmpty(is_email_exists)) {
                res.status(400).json({
                    msg:"this email is already exists",
                    data:[]
                })
            }

            // req.body.image = req.file.filename

            if (req.file) {
                req.body.image = req.file.filename
            }

            let save_data = await crudModel.create(req.body)

            if (!_.isEmpty(save_data) && save_data._id) {
                res.status(200).json({
                    msg:"data saved successfully",
                    data:save_data
                })

                
            }else{
                res.status(400).json({
                    msg:'something went wrong',
                    data:[]
                })
            }




        }catch(err){
            throw err
        }

    }

    // listing data 

    async listData(req,res){
        try{
            let allData = await crudModel.find({isDeleted:false})
            if (!_.isEmpty(allData)) {
                res.status(200).json({
                    message:" Data Fetching sucessfully ",
                    data:allData
                })
                
            }else{
                res.status(400).json({
                    message:"something went wrong "
                })
            }


        }catch(err){
            throw err
        }
    }

    //  single data fetching 

    async singleData(req,res){
        try{
            let singleData = await crudModel.findOne({_id:req.params.id})

            if (singleData) {
                res.status(200).json({
                    msg:"single data fetching sucessfully ",
                    data:singleData
                })
            }

            else{
                res.status(400).json({
                    msg:"something went wrong",
                    data:[]
                })
            }

        

        }catch(err){
            throw err
        }

    }

    //  update data 
    async updateData(req,res){
        try{

            let userDetails = await crudModel.findOne({_id:req.params.id})
            console.log(" User Details ",userDetails);
           
           let  updatedObj = {
                name:req.body.name,
                email:req.body.email,
                sex: req.body.sex,
                age: req.body.age,

            }
            // if (!_.isEmpty(req.file)) {
            //     updatedObj.image = req.file.filename
            //     fs.unlinkSync(`./public/uploads/${userDetails.image}`)
            // }

            let updatedData = await crudModel.findByIdAndUpdate(req.params.id,updatedObj)
            console.log("updated data", updatedData);

            if (updatedData) {
                res.status(200).json({
                    msg:"Data updated sucessfully",
                    data:updatedData
                })
                
            } else{
                res.status(400).json({
                    message:"bad credentials",
                    data:[]
                })
            }
        }catch(err){
            throw err

        }

    }

    async delete(req,res){
        try{
            let deleted_obj = {
                isDeleted:true
            }

            let deletedData = await crudModel.findByIdAndUpdate(req.params.id,deleted_obj)
            if (deletedData) {
                res.status(200).json({
                    message:" data has been deleted",
                    data:deletedData

                })
                
            }

            



        }catch(err){
            throw err
        }


    }








}
module.exports = new crudcontroller()