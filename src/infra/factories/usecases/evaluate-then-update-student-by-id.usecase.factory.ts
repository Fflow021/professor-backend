import { EvaluateThenUpdateStudentUsecase } from './../../../domain/usecases/evaluate-then-update-student-by-id/evaluate-then-update-student-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluateThenUpdateStudentByIdUsecaseFactory {
  //port factory here

  getInstance(): EvaluateThenUpdateStudentUsecase {
    return new EvaluateThenUpdateStudentUsecase(); //port factory goes inside here
  }
}
