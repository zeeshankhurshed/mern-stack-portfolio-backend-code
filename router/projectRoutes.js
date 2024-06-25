import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { addNewProject, deleteProject, updateProject,getAllProjects,getSigleProject } from '../controller/projectController.js';


const router=express.Router();

router.post('/add', isAuthenticated, addNewProject);
router.delete('/delete/:id', isAuthenticated, deleteProject);
router.put('/update/:id', isAuthenticated, updateProject);
router.get('/getAll', getAllProjects);
router.get('/getProject/:id', getSigleProject);

export default router;
