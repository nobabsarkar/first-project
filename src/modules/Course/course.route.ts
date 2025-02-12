import express from 'express';
import validateRequest from '../../app/middleweres/validateRequest';
import { CourseValidations } from './course.validation';
import { CourseControllers } from './course.controller';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get('/:id', CourseControllers.getSingleCourses);

// router.patch(
//   '/:facultyId',
//   validateRequest(
//     AcademicFacultyValidation.updateacademicFacultyValidationSchema,
//   ),
//   AcademicFacultyControllers.updateAcademicFaculty,
// );

router.delete('/:id', CourseControllers.deleteCourse);

router.get('/', CourseControllers.getAllCourses);

export const CourseRoutes = router;
