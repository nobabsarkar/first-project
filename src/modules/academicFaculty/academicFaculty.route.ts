import express from 'express';
import validateRequest from '../../app/middleweres/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.Validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/:facultyId', AcademicFacultyControllers.getAllAcademicFaculties);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateacademicFacultyValidationSchema,
  ),
);
AcademicFacultyControllers.updateAcademicFaculty;

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
