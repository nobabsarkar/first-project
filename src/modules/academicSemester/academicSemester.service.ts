import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  // semester name --> semester code check and error handling
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Samester Code');
  }

  // create academic semester
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemestersFromDb = async () => {
  const result = await AcademicSemester.findOne();
  return result;
};

const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};

const updateAcademicSemesterIntoDb = async (
  id: string,
  payLoad: Partial<TAcademicSemester>,
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new Error('Invalid Semester Code');
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payLoad, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemestersFromDb,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterIntoDb,
};
