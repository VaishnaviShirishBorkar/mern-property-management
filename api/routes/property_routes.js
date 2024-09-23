import express from 'express'
import { createProperty,
    getPropertyList,
    updateProperty,
    deleteProperty,
    getPropertyById
} from '../controllers/property_controller.js';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,path.join('routes','../images'));
    },

    filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage : storage});

router.post('/create',upload.single('file'),createProperty);
router.get('/get-properties',getPropertyList);
router.put('/update/:id',upload.single('file'),updateProperty);
router.get('/:id', getPropertyById); // New route to get property by ID
router.delete('/delete/:id',deleteProperty);

export default router