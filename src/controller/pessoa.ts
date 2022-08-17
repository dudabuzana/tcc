import { Request, Response } from "express"
import { CreatePessoa, UpdatePessoa } from "../service/pessoa"
import { UsuarioNivel } from '@prisma/client'

class CreateProfessorController {
    async execute(request: Request, response: Response) {
        return createPessoa(request, response, UsuarioNivel.professor)
    }
}

class CreateAlunoController {
    async execute(request: Request, response: Response) {
        return createPessoa(request, response, UsuarioNivel.aluno)
    }
}

class UpdatePessoaController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;
        const { senha, nome, matricula } = request.body;
        
        const updatePessoa  = new UpdatePessoa();
        const pessoa        = await updatePessoa.execute(cpfCnpj, senha, nome, matricula);

        return response.json(pessoa);
    }
}

async function createPessoa(request: Request, response: Response, nivel: UsuarioNivel) {
    const { cpfCnpj, senha, cpfCnpjInstituicao, nome, matricula } = request.body;
    
    const createPessoa  = new CreatePessoa();
    const pessoa        = await createPessoa.execute(cpfCnpj, senha, nivel, cpfCnpjInstituicao, nome, matricula);

    return response.json(pessoa);
}

export { CreateProfessorController, CreateAlunoController, UpdatePessoaController }