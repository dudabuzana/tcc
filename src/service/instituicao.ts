import { prisma } from '../prisma'
import { UsuarioNivel } from '@prisma/client'
import { CreateUsuario, UpdateUsuario } from './usuario'

class CreateInstituicao {
    async execute(cpfCnpj: string, senha: string, nivel: UsuarioNivel, nome: string, endereco: string, contato: string) {
        return await prisma.$transaction(async () => {
            const createUsuario = new CreateUsuario();
            await createUsuario.execute(cpfCnpj, senha, nivel);
            
            return await prisma.instituicao.create({
                data: {
                    cpfCnpj,
                    nome,
                    endereco,
                    contato
                }
            });
        })
    }
}

class UpdateInstituicao {
    async execute(cpfCnpj: string, senha: string, nome: string, endereco: string, contato: string) {
        return await prisma.$transaction(async () => {
            const updateUsuario = new UpdateUsuario();
            await updateUsuario.execute(cpfCnpj, senha);

            return await prisma.instituicao.update({
                where: {
                    cpfCnpj,
                },
                data: {
                    nome,
                    endereco,
                    contato
                }
            });
        });
    }
}

class ListInstituicao {
    async execute() {
        return await prisma.usuario.findMany({
          where: {
            nivel: UsuarioNivel.instituicao
          },
          include: {
            instituicao: true
          }
        });
    }
}

class GetInstituicao {
    async execute(cpfCnpj: string) {
        return await prisma.usuario.findFirst({
          where: {
            nivel: UsuarioNivel.instituicao,
            cpfCnpj
          },
          include: {
            instituicao: true
          }
        });
    }
}

export { CreateInstituicao, UpdateInstituicao, ListInstituicao, GetInstituicao }