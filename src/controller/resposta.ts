import { Request, Response } from "express";
import { CreateResposta, ListRespostaFormulario, ListRespostaFormularioAluno } from "../service/resposta";

class CreateRespostaController {
    async execute(request: Request, response: Response) {
        let pergunta = [];
        const { respostas } = request.body;

        for(const item of respostas) {
            const { idPergunta, idFormulario, cpfCnpj, resposta } = item;

            const createResposta = new CreateResposta();
            pergunta = [...pergunta, await createResposta.execute(idPergunta, idFormulario, cpfCnpj, resposta)];
        }
        return response.json(pergunta);
    }
}

class ListRespostaFormularioController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const listResposta = new ListRespostaFormulario();
        const respostas    = await listResposta.execute(id);

        return response.json(respostas);
    }
}

class ListRespostaFormularioAlunoController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj, id } = request.params;

        const listResposta = new ListRespostaFormularioAluno();
        const respostas    = await listResposta.execute(id, cpfCnpj);

        return response.json(respostas);
    }
}

export { CreateRespostaController, ListRespostaFormularioController, ListRespostaFormularioAlunoController }