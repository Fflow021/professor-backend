import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../../../infra/schemas/student.shema';
import { UpdateStudentStatusMongooseAdapter } from '../../../infra/adapters/update-student-status/update-student-status.mongoose.adapter';
export class UpdateStudentStatusPortFactory {
  constructor(@InjectModel(Student.name) private readonly model: Model<StudentDocument>) {}

  getInstance() {
    return new UpdateStudentStatusMongooseAdapter(this.model); // this instantiate an object that work as a repository
  }
}
