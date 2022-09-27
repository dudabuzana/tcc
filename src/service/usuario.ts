import { prisma } from '../prisma'
import { hash } from "bcryptjs"
import { cpf, cnpj } from 'cpf-cnpj-validator'
import { UsuarioNivel } from '@prisma/client'
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
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

class LoginUsuario {
    async execute(login: string, senha: string) {
        const usuario = await existsUsuario(login)
        if (!usuario) {
            throw new Error("Email/Senha incorretos");
        }
        const passwordMatch = await compare(senha, usuario.senha);

        if (!passwordMatch) {
            throw new Error("Email/Senha incorretos");
        }

        const token = sign(
            {
                id: usuario.cpfCnpj,
            },
            "4f93ac9d10cb751b8c9c646bc9dbccb9",
            {
                subject: usuario.cpfCnpj,
                expiresIn: "5d",
            }
        );

      return { token, usuario };
    }
}
class SetTokenUsuario {
    async execute(cpfCnpj: string, token: string) {
        const usuario = await prisma.usuario.update({
            where: {
                cpfCnpj,
            },
            data: {
                token,
            },
        });
        return usuario;
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

export { CreateUsuario, UpdateUsuario, DeleteUsuario, LoginUsuario, SetTokenUsuario }
