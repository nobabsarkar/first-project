import Joi from 'joi';

const userValidationSchema = Joi.object({
  firstName: Joi.string()
    .max(20)
    .required()
    .trim()
    .pattern(/^[A-Z][a-z]*$/, 'capitalize'),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .required()
    .pattern(/^a-zA-Z+$/, 'alpha'),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required(),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required(),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),
  motherName: Joi.string().required(),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

const studentValidatoinSchema = Joi.object({
  id: Joi.string().required(),
  name: userValidationSchema.required(),
  gender: Joi.string().required().valid('male', 'female', 'others'),
  dateOfBirth: Joi.string(),
  email: Joi.string()
    .required()
    .email()
    .message('"{{#label}}" is not a valid email type'),
  contactNo: Joi.string().required(),
  emergencyNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().allow(''),
  isActive: Joi.string().valid('active', 'inActive').default('active'),
});

export default studentValidatoinSchema;
