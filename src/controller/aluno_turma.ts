import { Request, Response } from "express";
import { CreateAlunoTurma, DeleteAlunoTurma, ListAlunoTurma, ListTurmaAluno, ListTurmaAlunoFormulario } from "../service/aluno_turma";

class CreateAlunoTurmaController {
    async execute(request: Request, response: Response) {
        const { id, cpfCnpj } = request.body;
        
        const createAlunoTurma = new CreateAlunoTurma();
        const alunoTurma       = await createAlunoTurma.execute(id, cpfCnpj);

        return response.json(alunoTurma);
    }
}

class DeleteAlunoTurmaController {
    async execute(request: Request, response: Response) {
        const { id, cpfCnpj } = request.params;

        const deleteAlunoTurma = new DeleteAlunoTurma();
        await deleteAlunoTurma.execute(id, cpfCnpj);

        return response.json();
    }
}

class ListAlunoTurmaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const listAlunoTurma = new ListAlunoTurma();
        const alunosTurma    = await listAlunoTurma.execute(id);

        return response.json(alunosTurma);
    }
}

class ListTurmaAlunoController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const listAlunoTurma = new ListTurmaAluno();
        const turmasAluno    = await listAlunoTurma.execute(cpfCnpj);

        return response.json(turmasAluno);
    }
}

class ListTurmaAlunoFormularioController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const listAlunoTurma = new ListTurmaAlunoFormulario();
        const turmasAluno    = await listAlunoTurma.execute(cpfCnpj);

        return response.json(turmasAluno);
    }
}

export { CreateAlunoTurmaController, DeleteAlunoTurmaController, ListAlunoTurmaController, ListTurmaAlunoController, ListTurmaAlunoFormularioController }