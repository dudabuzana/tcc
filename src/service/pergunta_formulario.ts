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

class UpdatePergunta {
    async execute(id: number, idFormulario: string, titulo: string, descricao: string, tipo: PerguntaTipo) {
        return await prisma.$queryRaw`
            UPDATE pergunta_formulario
               SET "titulo" = ${titulo},
                   "descricao" = ${descricao},
                   "tipo" = ${tipo}
             WHERE "id" = ${id}
               AND "idFormulario" = ${idFormulario}
             `;
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

export { CreatePergunta, ListPerguntaFormulario, UpdatePergunta }