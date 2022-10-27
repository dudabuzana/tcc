import { Request, Response } from "express";
import { CreateFormulario, UpdateFormulario, DeleteFormulario, ListFormularioTurma } from "../service/formulario";

class CreateFormularioController {
    async execute(request: Request, response: Response) {
        const { idTurma, status } = request.body;
        
        const createFormulario = new CreateFormulario();
        const formulario       = await createFormulario.execute(idTurma, status);

        return response.json(formulario);
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

export { CreateFormularioController, UpdateFormularioController, DeleteFormularioController, ListFormularioTurmaController }