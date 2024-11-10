/* eslint-disable prettier/prettier */
import { Controller, Get, Header, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { StudentResponseBody } from './list-students-from-class-by-id.types';
import { ListStudentsFromClassByIdUsecaseFactory } from '../../../../infra/factories/usecases/list-students-from-class-by-id.usecase.factory';
import { ListStudentsFromClassByIdPortResult } from '../../../../domain/ports/list-students-from-class-by-id.port';

@Controller()
export class ListStudentsFromClassByIdController {
  constructor(private readonly usecaseFactory: ListStudentsFromClassByIdUsecaseFactory) {}

  @Get('/class/:id/students')
  @HttpCode(HttpStatus.OK)
  @Header('access-control-allow-origin', '*')
  async execute(@Param('id') classId: string): Promise<StudentResponseBody[]> {
    const usecase = this.usecaseFactory.getInstance();

    const students:ListStudentsFromClassByIdPortResult = await usecase.execute({ classId });

    return this.mapToResponseBody(students);
  }

  private mapToResponseBody(students: ListStudentsFromClassByIdPortResult): StudentResponseBody[] {
    return students.map((student) => ({
      name: student.name,
      id: student.id,
      status: student.status,
    }));
  }
}
