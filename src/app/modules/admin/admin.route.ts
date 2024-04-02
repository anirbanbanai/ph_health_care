import express from 'express'
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/',adminController.getAllFromDb)
router.get('/:id',adminController.getByIdFromDb)
router.put('/:id',adminController.updateIntoDb)
router.delete('/:id',adminController.deleteIntoDb)
router.delete('/soft/:id',adminController.softDeleteIntoDb)

export const Adminroutes = router;