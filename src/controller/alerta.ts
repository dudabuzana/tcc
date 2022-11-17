import { Request, Response } from "express";
import { CreateAlerta, DeleteAlerta, GetAlerta } from "../service/alerta";

class CreateAlertaController {
    async execute(request: Request, resp: Response) {
        const { cpfCnpj, response, responseValue, negative, negativeValue } = request.body;
        
        const getAlerta = new GetAlerta();
        const alertaGet = await getAlerta.execute(cpfCnpj);

        if(alertaGet !== null) {
            const deleteAlerta = new DeleteAlerta();
            await deleteAlerta.execute(cpfCnpj);
        }

        const createAlerta = new CreateAlerta();
        const alerta       = await createAlerta.execute(cpfCnpj, response, responseValue, negative, negativeValue);

        return resp.json(alerta);
    }
}

class GetAlertaController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const getAlerta = new GetAlerta();
        const alerta    = await getAlerta.execute(cpfCnpj);

        return response.json(alerta);
    }
}

export { CreateAlertaController, GetAlertaController }