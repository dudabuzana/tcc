import { prisma } from '../prisma'
import { PerguntaTipo } from '@prisma/client'

class CreatePergunta {
    async execute(idFormulario: string, titulo: string, descricao: string, tipo: PerguntaTipo) {
        return await prisma.perguntaFormulario.create({
            data: {
                idFormulario,
                titulo,
                descricao,
                tipo
            }
        });
    }
}

class ListPerguntaFormulario {
    async execute(idFormulario: string) {
        return await prisma.perguntaFormulario.findMany({
            where: {
                idFormulario
            },
            include: {
                Formulario: {
                    include: {
                        Turma: {
                            include: {
                                Disciplina: true
                            }
                        }
                    }
                }
            }
        });
    }
}

export { CreatePergunta, ListPerguntaFormulario }