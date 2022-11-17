import { Formulario, Resposta } from "@prisma/client";
import { Request, Response } from "express";
import { CreateResposta, ListRespostaFormulario, ListRespostaFormularioAluno, GetQuantidadeRespostasFormulario } from "../service/resposta";
import { GetFormulario } from "../service/formulario";
import { GetAlerta } from "../service/alerta";
import { ListAlunoTurma } from "../service/aluno_turma";
import { sendMail } from "./mail";

class CreateRespostaController {
    async execute(request: Request, response: Response) {
        let pergunta = [];
        const { respostas } = request.body;

        for(const item of respostas) {
            const { idPergunta, idFormulario, cpfCnpj, resposta } = item;

            const createResposta = new CreateResposta();
            pergunta = [...pergunta, await createResposta.execute(idPergunta, idFormulario, cpfCnpj, resposta)];
        }
        VerificaEnvioEmailController(respostas[0]);
        return response.json(pergunta);
    }
}

class ListRespostaFormularioController {
    async execute(request: Request, response: Response) {
        const { id } = request.params;

        const listResposta = new ListRespostaFormulario();
        const respostas    = await listResposta.execute(id);

        return response.json(respostas);
    }
}

class ListRespostaFormularioAlunoController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj, id } = request.params;

        const listResposta = new ListRespostaFormularioAluno();
        const respostas    = await listResposta.execute(id, cpfCnpj);

        return response.json(respostas);
    }
}

async function VerificaEnvioEmailController(resposta: Resposta ) {
    const getFormulario = new GetFormulario();
    const formulario    = await getFormulario.execute(resposta.idFormulario);

    const getAlerta = new GetAlerta();
    const alerta    = await getAlerta.execute(formulario.Turma.Pessoa.cpfCnpj);
    console.log('ALERTA', alerta);

    if(alerta !== null) {
        const percentual = alerta.responseValue;

        if(percentual > 0) {
            const listResposta = new GetQuantidadeRespostasFormulario();
            const respostas    = await listResposta.execute(resposta.idFormulario);
            const qtdRespostas = respostas[0].quantidade;
            console.log('RESPOSTA', qtdRespostas);
            
            const listAlunos = new ListAlunoTurma();
            const alunos     = await listAlunos.execute(formulario.Turma.id);
            const qtdAlunos  = alunos.length;
            console.log('ALUNOS', alunos);

            const verify = (qtdAlunos * percentual) / 100;

            console.log('VERIFY', verify);

            if(qtdRespostas >= verify) {
                console.log('ENTROU');
                //enviaEmail
                sendMail();
            }
        }
    }
}

export { CreateRespostaController, ListRespostaFormularioController, ListRespostaFormularioAlunoController }