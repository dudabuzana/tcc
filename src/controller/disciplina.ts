import { Request, Response } from "express";
import { CreateDisciplina, UpdateDisciplina, DeleteDisciplina, ListDisciplina, GetDisciplina } from "../service/disciplina";

class CreateDisciplinaController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj, nome, curso } = request.body;
        
        const createDisciplina = new CreateDisciplina();
        const disciplina       = await createDisciplina.execute(cpfCnpj, nome, curso);

        return response.json(disciplina);
    }
}

class UpdateDisciplinaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;
        const { nome, curso } = request.body;
        
        const updateDisciplina = new UpdateDisciplina();
        const disciplina       = await updateDisciplina.execute(id, nome, curso);

        return response.json(disciplina);
    }
}

class DeleteDisciplinaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const deleteDisciplina = new DeleteDisciplina();
        await deleteDisciplina.execute(id);

        return response.json();
    }
}

class ListDisciplinaController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const listDisciplina = new ListDisciplina();
        const disciplinas    = await listDisciplina.execute(cpfCnpj);

        return response.json(disciplinas);
    }
}

class GetDisciplinaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const getDisciplina = new GetDisciplina();
        const disciplina    = await getDisciplina.execute(id);

        return response.json(disciplina);
    }
}

export { CreateDisciplinaController, UpdateDisciplinaController, DeleteDisciplinaController, ListDisciplinaController, GetDisciplinaController }