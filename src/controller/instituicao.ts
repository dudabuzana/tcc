import { Request, Response } from "express";
import { CreateInstituicao, UpdateInstituicao } from "../service/instituicao";
import { UsuarioNivel } from '@prisma/client';

class CreateInstituicaoController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj, senha, nome, endereco, contato } = request.body;
        
        const createInstituicao = new CreateInstituicao();
        const instituicao       = await createInstituicao.execute(cpfCnpj, senha, UsuarioNivel.instituicao, nome, endereco, contato);

        return response.json(instituicao);
    }
}

class UpdateInstituicaoController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;
        const { senha, nome, endereco, contato } = request.body;

        const updateInstituicao = new UpdateInstituicao();
        const instituicao       = await updateInstituicao.execute(cpfCnpj, senha, nome, endereco, contato);

        return response.json(instituicao);
    }
}

export { CreateInstituicaoController, UpdateInstituicaoController };