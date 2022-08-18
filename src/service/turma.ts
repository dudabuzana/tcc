import { prisma } from '../prisma'

class CreateTurma {
    async execute(idDisciplina: string, cpfCnpj: string, semestre: number) {
        return await prisma.turma.create({
            data: {
                idDisciplina,
                cpfCnpj,
                semestre
            }
        });
    }
}

class UpdateTurma {
    async execute(id: string, idDisciplina: string, cpfCnpj: string, semestre: number) {
        return await prisma.turma.update({
            where: {
                id,
            },
            data: {
                idDisciplina,
                cpfCnpj,
                semestre
            }
        });
    }
}

class DeleteTurma {
    async execute(id: string) {
        return await prisma.turma.delete({
            where: {
                id
            }
        });
    }
}

class ListTurma {
    async execute(idDisciplina: string) {
        return await prisma.turma.findMany({
            where: {
                idDisciplina
            }
        });
    }
}
class ListTurmaProfessor {
    async execute(cpfCnpj: string) {
        return await prisma.turma.findMany({
            where: {
                cpfCnpj
            }
        });
    }
}

export { CreateTurma, UpdateTurma, DeleteTurma, ListTurma, ListTurmaProfessor }