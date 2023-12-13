const router = require('express').Router()
const { Router } = require('express');
const multer = require('multer')
const path = require('path')
const crudController = require('../controller/crudApi.controller')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file, "fileeeeeeeeee");
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + 'anupam_mishra' + uniqueSuffix + path.extname(file.originalname))
    }
});

// const maxSize = 1024;

const uploads = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('only jpg, jpeg, png are allowed'))
        }
    },
    // limits: maxSize
})

router.get('/',crudController.welcomeStatus)
router.post('/add',uploads.single('image'),crudController.insertData)
router.get('/list',crudController.listData)
router.get('/:id',crudController.singleData)
router.put('/:id',crudController.updateData)
router.delete('/:id',crudController.delete)




module.exports = router


