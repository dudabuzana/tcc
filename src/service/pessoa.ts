import { prisma } from '../prisma'
import { MATRICULA_EXISTENTE } from '../errors'
import { UsuarioNivel } from '@prisma/client'
import { CreateUsuario, UpdateUsuario } from './usuario'

class CreatePessoa {
    async execute(cpfCnpj: string, senha: string, nivel: UsuarioNivel, cpfCnpjInstituicao: string, nome: string, matricula: string) {
        const err = await validate(matricula)
        if (err != null) {
            throw new Error(err)
        }

        return await prisma.$transaction(async () => {
            const createUsuario = new CreateUsuario();
            await createUsuario.execute(cpfCnpj, senha, nivel);

            return await prisma.pessoa.create({
                data: {
                    cpfCnpj,
                    cpfCnpjInstituicao,
                    nome,
                    matricula
                }
            });
        })
    }
}

class UpdatePessoa {
    async execute(cpfCnpj: string, senha: string, nome: string, matricula: string) {
        const err = await validate(matricula)
        if (err != null) {
            throw new Error(err)
        }
        return await prisma.$transaction(async () => {
            const updateUsuario = new UpdateUsuario();
            await updateUsuario.execute(cpfCnpj, senha);

            return await prisma.pessoa.update({
                where: {
                    cpfCnpj,
                },
                data: {
                    nome,
                    matricula
                }
            });
        });
    }
}

class ListPessoa {
    async execute(nivel: UsuarioNivel) {
        return await prisma.usuario.findMany({
          where: {
            nivel
          },
          include: {
            pessoa: true,
          },
          orderBy: {
            pessoa: {
                nome: 'asc'
            }
          },
        });
    }
}

class GetPessoa {
    async execute(cpfCnpj: string, nivel: UsuarioNivel) {
        return await prisma.usuario.findFirst({
          where: {
            nivel,
            cpfCnpj
          },
          include: {
            pessoa: true
          }
        });
    }
}

async function validate(matricula: string) {
    if (await existsPessoa(matricula)) {
        return MATRICULA_EXISTENTE;
    }
    return null
}

async function existsPessoa(matricula: string) {
    return await prisma.pessoa.findFirst({
        where: {
            matricula
        }
    });
}

export { CreatePessoa, UpdatePessoa, ListPessoa, GetPessoa }