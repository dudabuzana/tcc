import { Request, Response } from "express";
import { CreateTurma, UpdateTurma, DeleteTurma, ListTurma, ListTurmaProfessor, GetTurma } from "../service/turma";

class CreateTurmaController {
    async execute(request: Request, response: Response) {
        const { idDisciplina, cpfCnpj, semestre } = request.body;
        
        const createTurma = new CreateTurma();
        const turma       = await createTurma.execute(idDisciplina, cpfCnpj, semestre);

        return response.json(turma);
    }
}

class UpdateTurmaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;
        const { idDisciplina, cpfCnpj, semestre } = request.body;
        
        const updateTurma = new UpdateTurma();
        const turma       = await updateTurma.execute(id, idDisciplina, cpfCnpj, semestre);

        return response.json(turma);
    }
}

class DeleteTurmaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const deleteTurma = new DeleteTurma();
        await deleteTurma.execute(id);

        return response.json();
    }
}

class ListTurmaController {
    async execute(request: Request, response: Response) {
        const { idDisciplina } = request.params;

        const listTurma = new ListTurma();
        const turmas    = await listTurma.execute(idDisciplina);

        return response.json(turmas);
    }
}

class ListTurmaProfessorController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const listTurma = new ListTurmaProfessor();
        const turmas    = await listTurma.execute(cpfCnpj);

        return response.json(turmas);
    }
}

class GetTurmaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const getTurma = new GetTurma();
        const turma    = await getTurma.execute(id);

        return response.json(turma);
    }
}

export { CreateTurmaController, UpdateTurmaController, DeleteTurmaController, ListTurmaController, ListTurmaProfessorController, GetTurmaController }