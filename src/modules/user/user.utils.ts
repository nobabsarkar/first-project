import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // const currentId = (await findLastStudentId()) || (0).toString();
  // console.log(currentId);
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentSemesteryear = lastStudentId?.substring(0, 4);
  const currentStudentSemesterCode = payLoad.code;
  const currentStudentSemesterYear = payLoad.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentSemesteryear === currentStudentSemesterYear
  ) {
    currentId = lastStudentId.substring(6);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
  return incrementId;
};
