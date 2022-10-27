import { prisma } from '../prisma'

class CreateResposta {
    async execute(idPergunta: number, idFormulario: string, cpfCnpj: string, resposta: string) {
        return await prisma.resposta.create({
            data: {
                idPergunta,
                idFormulario,
                cpfCnpj,
                resposta,
            }
        });
    }
}

class ListRespostaFormulario {
    async execute(idFormulario: string) {
        return await prisma.resposta.findMany({
            where: {
                idFormulario
            },
            include: {
                PerguntaFormulario: true
            }
        });
    }
}

class ListRespostaFormularioAluno {
    async execute(idFormulario: string, cpfCnpj: string) {
        return await prisma.resposta.findMany({
            where: {
                idFormulario,
                cpfCnpj
            },
            include: {
                PerguntaFormulario: {
                    include: {
                        Formulario: true
                    }
                }
            }
        });
    }
}

export { CreateResposta, ListRespostaFormulario, ListRespostaFormularioAluno }