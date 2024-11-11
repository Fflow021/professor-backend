import { EvaluateThenUpdateStudentByIdUsecaseFactory } from './../../../../infra/factories/usecases/evaluate-then-update-student-by-id.usecase.factory';
import { Body, Controller, Header, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { input } from './evaluate-then-update-student-status-by-id.types';
import { StudentResponseBody } from '../list-students-from-class-by-id/list-students-from-class-by-id.types';
import { UpdateStudentStatusPortResult } from 'src/domain/ports/update-student-status.port';

@Controller()
export class UpdateStudentStatusByIdController {
  constructor(private readonly usecaseFactory: EvaluateThenUpdateStudentByIdUsecaseFactory) {}

  @Post('/students/:id/evaluation')
  @HttpCode(HttpStatus.OK)
  @Header('access-control-allow-origin', '*')
  async execute(@Param('id') id: string, @Body() input: input): Promise<StudentResponseBody> {
    const usecase = this.usecaseFactory.getInstance();

    const student = await usecase.execute({
      studentId: id,
      aulasLecionadas: input.aulasLecionadas,
      aulasAtendidas: input.aulasAtendidas,
      notaP1: input.notasP1,
      notaP2: input.notasP2,
    });

    return this.mapToResponseBody(student);
  }

  private mapToResponseBody(student: UpdateStudentStatusPortResult): StudentResponseBody {
    return {
      name: student.name,
      id: student.id,
      status: student.status,
    };
  }
}
