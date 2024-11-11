import { Module } from '@nestjs/common';
import { ListProfessorClassesByFilterController } from './controllers/list-professor-classes-by-filter/list-professor-classes-by-filter.controller';
import { InfraModule } from '../../infra/infra.module';
import { ListStudentsFromClassByIdController } from './controllers/list-students-from-class-by-id/list-students-from-class-by-id.controller';
import { CheckClassStatusController } from './controllers/check-class-status/check-class-status.controller';
import { UpdateStudentStatusByIdController } from './controllers/evaluate-then-update-student-status-by-id/evaluate-then-update-student-status-by-id.controller';

@Module({
  controllers: [
    ListProfessorClassesByFilterController,
    ListStudentsFromClassByIdController,
    CheckClassStatusController,
    UpdateStudentStatusByIdController, //made hundreds of tests through postman and forgot this
  ],
  imports: [InfraModule],
})
export class RestModule {}
