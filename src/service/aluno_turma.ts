import { prisma } from '../prisma'

class CreateAlunoTurma {
    async execute(id: string, cpfCnpj: string) {
        return await prisma.alunoTurma.create({
            data: {
                id,
                cpfCnpj
            }
        });
    }
}

class DeleteAlunoTurma {
    async execute(id: string, cpfCnpj: string) {
        return await prisma.alunoTurma.delete({
            where: {
                idCpfCnpj : {
                    id,
                    cpfCnpj,
                }
            }
        });
    }
}

class ListAlunoTurma {
    async execute(id: string) {
        return await prisma.alunoTurma.findMany({
            where: {
                id
            },
            include: {
                Pessoa: true
            }
        });
    }
}

class ListTurmaAluno {
    async execute(cpfCnpj: string) {
        return await prisma.alunoTurma.findMany({
            where: {
                cpfCnpj
            },
            include: {
                Turma: true
            }
        });
    }
}

export { CreateAlunoTurma, DeleteAlunoTurma, ListAlunoTurma, ListTurmaAluno }