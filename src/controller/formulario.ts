import { Request, Response } from "express";
import { CreateFormulario, UpdateFormulario, DeleteFormulario, ListFormularioTurma, ListFormulario, ListFormularioProfessor } from "../service/formulario";
import { CreatePergunta, UpdatePergunta } from "../service/pergunta_formulario";

class CreateFormularioController {
    async execute(request: Request, response: Response) {
        const { idTurma, status, perguntas } = request.body;
        
        const createFormulario = new CreateFormulario();
        const formulario       = await createFormulario.execute(idTurma, status);

        let perguntaResponse = [];

        for(const item of perguntas) {
            const { titulo, descricao, tipo } = item;
        
            const createPergunta = new CreatePergunta();
            perguntaResponse = [...perguntaResponse, await createPergunta.execute(formulario.id, titulo, descricao, tipo)];
        }
        return response.json(perguntaResponse);
    }
}

class UpdateFormularioController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;
        const { idTurma, status } = request.body;
        
        const updateFormulario = new UpdateFormulario();
        const formulario       = await updateFormulario.execute(id, idTurma, status);

        return response.json(formulario);
    }
}
class UpdateFormularioPerguntaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;
        const { idTurma, status, perguntas } = request.body;
        
        const updateFormulario = new UpdateFormulario();
        const formulario       = await updateFormulario.execute(id, idTurma, status);

        let perguntaResponse = [];

        for(const item of perguntas) {
            const { id, titulo, descricao, tipo } = item;
        
            const createPergunta = new UpdatePergunta();
            perguntaResponse = [...perguntaResponse, await createPergunta.execute(id, formulario.id, titulo, descricao, tipo)];
        }
        return response.json(perguntaResponse);
    }
}

class DeleteFormularioController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const deleteFormulario = new DeleteFormulario();
        await deleteFormulario.execute(id);

        return response.json();
    }
}

class ListFormularioTurmaController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;
        
        const updateFormulario = new ListFormularioTurma();
        const formulario       = await updateFormulario.execute(id);

        return response.json(formulario);
    }
}

class ListFormularioController {
    async execute(request: Request, response: Response) {
        const updateFormulario = new ListFormulario();
        const formulario       = await updateFormulario.execute();

        return response.json(formulario);
    }
}

class ListFormularioProfessorController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const updateFormulario = new ListFormularioProfessor();
        const formulario       = await updateFormulario.execute(cpfCnpj);

        return response.json(formulario);
    }
}

export { CreateFormularioController, UpdateFormularioController, UpdateFormularioPerguntaController, DeleteFormularioController, ListFormularioTurmaController, ListFormularioController, ListFormularioProfessorController }