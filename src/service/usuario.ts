import { prisma } from '../prisma'
import { hash } from "bcryptjs"
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { UsuarioNivel } from '@prisma/client'
import { CPF_CNPJ_INVALIDO, SENHA_CURTA, CPF_CNPJ_EXISTENTE } from '../errors'

class CreateUsuario {
    async execute(cpfCnpj: string, senha: string, nivel: UsuarioNivel) {
        const err = await validate(cpfCnpj, senha)
        if (err != null) {
            throw new Error(err)
        }
        return await prisma.usuario.create({
            data: {
                cpfCnpj,
                senha: await hash(senha, 8),
                nivel
            }
        });
    }
}

class UpdateUsuario {
    async execute(cpfCnpj: string, senha: string) {
        if (senha.length < 8) {
            throw new Error(SENHA_CURTA)   
        }
        return await prisma.usuario.update({
            where: {
                cpfCnpj,
            },
            data: {
                senha: await hash(senha, 8)
            }
        });
    }
}

class DeleteUsuario {
    async execute(cpfCnpj: string) {
        return await prisma.usuario.delete({
            where: {
                cpfCnpj
            }
        });
    }
}

async function validate(cpfCnpj: string, senha: string) {
    var err = null
    if (cpfCnpj.length > 11 && !cnpj.isValid(cpfCnpj)) {
        err = CPF_CNPJ_INVALIDO
    } else if (!cpf.isValid(cpfCnpj)) {
        err = CPF_CNPJ_INVALIDO
    } else if (senha.length < 8) {
        err = SENHA_CURTA
    } else if (await existsUsuario(cpfCnpj)) {
        err = CPF_CNPJ_EXISTENTE;
    }
    return err
}

async function existsUsuario(cpfCnpj: string) {
    return await prisma.usuario.findFirst({
        where: {
            cpfCnpj: cpfCnpj
        }
    });
}

export { CreateUsuario, UpdateUsuario, DeleteUsuario }
