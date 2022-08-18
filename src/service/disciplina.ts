import { prisma } from '../prisma'

class CreateDisciplina {
    async execute(cpfCnpj: string, nome: string, curso: string) {
        return await prisma.disciplina.create({
            data: {
                cpfCnpj,
                nome,
                curso
            }
        });
    }
}

class UpdateDisciplina {
    async execute(id: string, nome: string, curso: string) {
        return await prisma.disciplina.update({
            where: {
                id,
            },
            data: {
                nome,
                curso
            }
        });
    }
}

class DeleteDisciplina {
    async execute(id: string) {
        return await prisma.disciplina.delete({
            where: {
                id
            }
        });
    }
}

class ListDisciplina {
    async execute(cpfCnpj: string) {
        return await prisma.disciplina.findMany({
          where: {
            cpfCnpj
          }
        });
    }
}

class GetDisciplina {
    async execute(id: string) {
        return await prisma.disciplina.findFirst({
          where: {
            id
          },
        });
    }
}

export { CreateDisciplina, UpdateDisciplina, DeleteDisciplina, ListDisciplina, GetDisciplina }