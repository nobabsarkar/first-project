import { z } from 'zod';

const PreRequisiteCourseValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    prerequisiteCourses: z.array(PreRequisiteCourseValidationSchema).optional(),
  }),
});

export const CourseValidations = {
  createCourseValidationSchema,
};
