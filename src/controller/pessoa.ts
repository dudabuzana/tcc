import { Request, Response } from "express"
import { CreatePessoa, UpdatePessoa, ListPessoa, GetPessoa } from "../service/pessoa"
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

class ListProfessorController {
    async execute(request: Request, response: Response) {
        return listPessoa(response, UsuarioNivel.professor)
    }
}

class ListAlunoController {
    async execute(request: Request, response: Response) {
        return listPessoa(response, UsuarioNivel.aluno)
    }
}

class GetProfessorController {
    async execute(request: Request, response: Response) {
        return getPessoa(request, response, UsuarioNivel.professor)
    }
}

class GetAlunoController {
    async execute(request: Request, response: Response) {
        return getPessoa(request, response, UsuarioNivel.aluno)
    }
}

async function createPessoa(request: Request, response: Response, nivel: UsuarioNivel) {
    const { cpfCnpj, senha, cpfCnpjInstituicao, nome, matricula } = request.body;
    
    const createPessoa  = new CreatePessoa();
    const pessoa        = await createPessoa.execute(cpfCnpj, senha, nivel, cpfCnpjInstituicao, nome, matricula);

    return response.json(pessoa);
}

async function listPessoa(response: Response, nivel: UsuarioNivel) {
    const listPessoa = new ListPessoa();
    const pessoas    = await listPessoa.execute(nivel);

    return response.json(pessoas);
}

async function getPessoa(request: Request, response: Response, nivel: UsuarioNivel) {
    const { cpfCnpj } = request.params;

    const getPessoa = new GetPessoa();
    const pessoa    = await getPessoa.execute(cpfCnpj, nivel);

    return response.json(pessoa);
}

export { CreateProfessorController, CreateAlunoController, UpdatePessoaController, ListProfessorController, ListAlunoController, GetProfessorController, GetAlunoController }