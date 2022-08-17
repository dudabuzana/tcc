import { Request, Response } from "express";
import { DeleteUsuario } from "../service/usuario";

class DeleteUsuarioController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const deleteUsuario = new DeleteUsuario();
        await deleteUsuario.execute(cpfCnpj);

        return response.json();
    }
}

export { DeleteUsuarioController }