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
        if (idDisciplina !== null) {
            return await prisma.turma.findMany({
                where: {
                    idDisciplina
                },
                include: {
                    Disciplina: true,
                    Pessoa: true,
                },
            });    
        }
        return await prisma.turma.findMany();
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

class GetTurma {
    async execute(id: string) {
        return await prisma.turma.findFirst({
            where: {
                id
            },
            include: {
                Pessoa: true
            }
        });
    }
}

export { CreateTurma, UpdateTurma, DeleteTurma, ListTurma, ListTurmaProfessor, GetTurma }