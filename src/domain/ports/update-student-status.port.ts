import { Action } from '../../types/action.type';
import { Student } from '../models/student.model';

export interface UpdateStudentStatusPortInput {
  studentId: string;
  newStatus: string;
}

export type UpdateStudentStatusPortResult = Student;

export type UpdateStudentStatusPort = Action<UpdateStudentStatusPortInput, Promise<UpdateStudentStatusPortResult>>; // this is implemented by mongoose adapter
