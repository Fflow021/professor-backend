/* eslint-disable prettier/prettier */
import { Student } from "src/infra/schemas/student.shema";

export interface ToBeEvaluatedStudent {
  studentId: string;
  aulasLecionadas: number;
  aulasAtendidas: number;
  notaP1: number;
  notaP2: number;
}

export type student = Student; // type alias