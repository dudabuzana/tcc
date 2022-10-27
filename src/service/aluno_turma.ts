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
                Turma: {
                    include: {
                        Disciplina: true
                    }
                }
            }
        });
    }
}

class ListTurmaAlunoFormulario {
    async execute(cpfCnpj: string) {
        let list_turmas = [];
        list_turmas = await prisma.$queryRaw`
            SELECT a.*, t.*, d.*, t.id as turma, f.id as formulario
              FROM aluno_turma a
              JOIN turma t 
                ON a.id = t.id
              JOIN disciplina d 
                ON t."idDisciplina" = d.id
              JOIN formulario f 
                ON a.id = f."idTurma"
             WHERE NOT EXISTS (
                SELECT 1
                  FROM resposta r
                 WHERE f.id = r."idFormulario"
                   AND a."cpfCnpj" = r."cpfCnpj"
                   AND r."cpfCnpj" = ${cpfCnpj}
             )`;

        return list_turmas;
    }
}

export { CreateAlunoTurma, DeleteAlunoTurma, ListAlunoTurma, ListTurmaAluno, ListTurmaAlunoFormulario }