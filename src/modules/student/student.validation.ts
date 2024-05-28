import validator from 'validator';
import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(10, 'First Name cannot be more than 10 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First Name is not in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z.string().refine((value) => validator.isAlpha(value), {
    message: 'Last Name is not valid',
  }),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Student schema
export const studentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'others']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyNo: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'inActive']).default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchema;
