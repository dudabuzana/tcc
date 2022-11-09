import { prisma } from '../prisma'

class CreateFormulario {
    async execute(idTurma: string, status: string) {
        return await prisma.formulario.create({
            data: {
                idTurma,
                status,
            }
        });
    }
}

class UpdateFormulario {
    async execute(id: string, idTurma: string, status: string) {
        return await prisma.formulario.update({
            where: {
                id,
            },
            data: {
                idTurma,
                status,
            }
        });
    }
}

class DeleteFormulario {
    async execute(id: string) {
        return await prisma.formulario.delete({
            where: {
                id
            }
        });
    }
}

class ListFormularioTurma {
    async execute(idTurma: string) {
        return await prisma.formulario.findMany({
            where: {
                idTurma
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
class ListFormulario {
    async execute() {
        return await prisma.formulario.findMany({
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

class ListFormularioProfessor {
    async execute(cpfCnpj: string) {
        return await prisma.formulario.findMany({
            where: {
                Turma: {
                    cpfCnpj
                }
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

export { CreateFormulario, UpdateFormulario, DeleteFormulario, ListFormularioTurma, ListFormulario, ListFormularioProfessor }