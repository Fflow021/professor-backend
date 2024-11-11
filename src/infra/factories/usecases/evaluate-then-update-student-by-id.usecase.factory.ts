import { UpdateStudentStatusPortFactory } from '../ports/update-studant-status.port.factory';
import { EvaluateThenUpdateStudentUsecase } from './../../../domain/usecases/evaluate-then-update-student-by-id/evaluate-then-update-student-by-id';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluateThenUpdateStudentByIdUsecaseFactory {
  constructor(private readonly updateStudentStatusPortFactory: UpdateStudentStatusPortFactory) {}

  getInstance(): EvaluateThenUpdateStudentUsecase {
    return new EvaluateThenUpdateStudentUsecase(this.updateStudentStatusPortFactory.getInstance());
  }
}
