import { prisma } from '../prisma'
import { hash } from "bcryptjs";
import { cpf, cnpj } from 'cpf-cnpj-validator';

class CreateUsuario {
    async execute(cpfCnpj: string, senha: string, nivel: string) {
        const err = validate(cpfCnpj, senha)
        if (err != null) {
            throw new Error(err)
        }
        return await prisma.usuario.create({
            data: {
                cpfCnpj,
                senha: await hash(senha, 8),
                nivel: "professor"
            }
        });
    }
}

class UpdateUsuario {
    async execute(cpfCnpj: string, senha: string) {
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

function validate(cpfCnpj: string, senha: string) {
    var err = null
    if (cpfCnpj.length > 11 && !cnpj.isValid(cpfCnpj)) {
        err = CPF_CNPJ_INVALIDO
    } else if (cpf.isValid(cpfCnpj)) {
        err = CPF_CNPJ_INVALIDO
    } else if (senha.length < 8) {
        err = SENHA_CURTA
    } else if (existsUsuario(cpfCnpj)) {
        err = CPF_CNPJ_EXISTENTE;
    }
    return err
}

function existsUsuario(cpfCnpj: string) {
    return prisma.usuario.findFirst({
        where: {
            cpfCnpj
        }
    });
}

export { CreateUsuario, UpdateUsuario, DeleteUsuario }
