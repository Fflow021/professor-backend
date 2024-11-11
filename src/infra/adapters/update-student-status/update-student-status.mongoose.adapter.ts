/* eslint-disable prettier/prettier */
import mongoose, { Model } from 'mongoose';
import {
  UpdateStudentStatusPort,
  UpdateStudentStatusPortInput,
  UpdateStudentStatusPortResult,
} from '../../../domain/ports/update-student-status.port';
import { StudentDocument } from '../../../infra/schemas/student.shema';

export class UpdateStudentStatusMongooseAdapter implements UpdateStudentStatusPort {
  constructor(private readonly StudentModel: Model<StudentDocument>) {}

  async execute({ studentId, newStatus }: UpdateStudentStatusPortInput): Promise<UpdateStudentStatusPortResult> {
    //const updatedStudent = (await this.StudentModel.findByIdAndUpdate(studentId, { status: newStatus }, { new: true })
    const updatedStudent = (await this.StudentModel.findOneAndUpdate({id: studentId}, {status: newStatus}, {new: true})
      .lean()
      .exec()) as StudentDocument | null;
    // From what I've researched findByIdAndUpdate target specifically for __id but we are using our customId so this wouldn't work
    // Tried casting to mongoose.ObjectId but didn't work too so, I'm changing the query method
    if (!updatedStudent) {
      throw new Error('Student not found');
    }

    return this.mapStudentToModel(updatedStudent);
  }

  private mapStudentToModel(student: StudentDocument): UpdateStudentStatusPortResult {
    return {
      id: student.id,
      name: student.name,
      status: student.status,
      classCodeList: student.classCodeList.map((classId) => classId.toString()),
    };
  }
}
