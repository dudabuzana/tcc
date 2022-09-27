import { Request, Response } from "express";
import { DeleteUsuario, LoginUsuario, SetTokenUsuario } from "../service/usuario";

class DeleteUsuarioController {
    async execute(request: Request, response: Response) {
        const { cpfCnpj } = request.params;

        const deleteUsuario = new DeleteUsuario();
        await deleteUsuario.execute(cpfCnpj);

        return response.json();
    }
}

class LoginUsuarioController {
    async execute(request: Request, response: Response) {
        const { login, senha } = request.body;

        const loginUsuario = new LoginUsuario();
        const { token, usuario } = await loginUsuario.execute(login.match(/\d/g).join(""), senha);

        new SetTokenUsuario().execute(usuario.cpfCnpj, token);

        return response.json({'token':token, 'cpfCnpj': usuario.cpfCnpj, 'nivel': usuario.nivel});
    }
}

export { DeleteUsuarioController, LoginUsuarioController }