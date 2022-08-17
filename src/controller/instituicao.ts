import { Request, Response } from "express";
import { CreateInstituicao, UpdateInstituicao, ListInstituicao, GetInstituicao } from "../service/instituicao";
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

class ListInstituicaoController {
    async execute(request: Request, response: Response) {
        const listInstituicao = new ListInstituicao();
        const instituicoes    = await listInstituicao.execute();

        return response.json(instituicoes);
    }
}

class GetInstituicaoController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const getInstituicao = new GetInstituicao();
        const instituicao    = await getInstituicao.execute(cpfCnpj);

        return response.json(instituicao);
    }
}

export { CreateInstituicaoController, UpdateInstituicaoController, ListInstituicaoController, GetInstituicaoController };