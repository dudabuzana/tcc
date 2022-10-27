import { Request, Response } from "express";
import { CreatePergunta, ListPerguntaFormulario } from "../service/pergunta_formulario";

class CreatePerguntaController {
    async execute(request: Request, response: Response) {
        const { idFormulario, titulo, descricao, tipo } = request.body;
        
        const createPergunta = new CreatePergunta();
        const pergunta       = await createPergunta.execute(idFormulario, titulo, descricao, tipo);

        return response.json(pergunta);
    }
}

class ListPerguntaFormularioController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const listPergunta = new ListPerguntaFormulario();
        const alunosTurma    = await listPergunta.execute(id);

        return response.json(alunosTurma);
    }
}

export { CreatePerguntaController, ListPerguntaFormularioController }