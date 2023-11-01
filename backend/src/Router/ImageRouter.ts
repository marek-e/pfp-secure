import { Router } from 'express'
import upload from "../Middleware/ImageConfig";
import * as imageController from '../Controller/ImageController';

const router = Router();

router.get('/test', imageController.test);
router.get('/get-file/:id', imageController.getImage);
router.post('/upload', upload.single('file'), imageController.postImage);
router.get('/root', imageController.getRoot);

export default router