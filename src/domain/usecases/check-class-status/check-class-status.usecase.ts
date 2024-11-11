import { ListStudentsFromClassByIdPort } from '../../../domain/ports/list-students-from-class-by-id.port';
import { CheckClassStatusInput } from './check-class-status.types';

export class CheckClassStatusUsecase {
  constructor(private readonly listStudentsFromClassByIdPort: ListStudentsFromClassByIdPort) {}

  async execute({ classId }: CheckClassStatusInput): Promise<string> {
    const students = await this.listStudentsFromClassByIdPort.execute({
      classId,
    });
    if (students.length === 0) return 'ABERTA';

    const allStudentsEvaluated = students.filter((student) => student.status === 'NAO_AVALIADO').length === 0;

    if (allStudentsEvaluated) return 'FECHADA';

    const atLeastOneEvaluated = students.filter((student) => student.status !== 'NAO_AVALIADO').length > 0;

    if (atLeastOneEvaluated) {
      return 'EM_FECHAMENTO';
    } else {
      return 'ABERTA';
    }
  }
}
