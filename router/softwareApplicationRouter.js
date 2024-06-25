import express from 'express'
import { addNewApplication,deleteApplication,getAllApplication} from '../controller/softwareApplicationController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router=express.Router();

router.post('/add', isAuthenticated,addNewApplication);
router.delete('/delete/:id',isAuthenticated, deleteApplication);
router.get('/getAll', getAllApplication);

export default router;

//3:51:45