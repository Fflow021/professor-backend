import { student, ToBeEvaluatedStudent } from './evaluate-then-update-student-by-id.types';
/* eslint-disable prettier/prettier */
import { UpdateStudentStatusPort } from "src/domain/ports/update-student-status.port";

// use case that validate the student scores and frequency, give him a grade then return an updated student object
export class EvaluateThenUpdateStudentUsecase {
    constructor(private readonly updateStudentStatusPort: UpdateStudentStatusPort) {}

    async execute({studentId, aulasLecionadas, aulasAtendidas, notaP1, notaP2}: ToBeEvaluatedStudent):Promise<student> {
        const media = notaP1 + notaP2 / 2
        const frequencia = aulasAtendidas / aulasLecionadas

        let newStatus: string = 'NAO_AVALIADO'
        if (media < 5.0) {
            newStatus = 'REPROVADO'
        } else if (media > 7.0 && frequencia > 0.75) {
            newStatus = 'APROVADO'
        } else if (media >= 5.0 && media < 7.0 && frequencia < 0.75) {
            newStatus = 'EM_EXAME'
        }
        
        const newStudent = await this.updateStudentStatusPort.execute({studentId, newStatus})
        return newStudent
    }    
}