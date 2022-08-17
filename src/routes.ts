import { Router } from "express";
import { DeleteUsuarioController } from "./controller/usuario";
import { CreateInstituicaoController, UpdateInstituicaoController } from "./controller/instituicao";
import { CreateProfessorController, CreateAlunoController, UpdatePessoaController } from "./controller/pessoa";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

const createInstituicao = new CreateInstituicaoController();
const updateInstituicao = new UpdateInstituicaoController();
const deleteUsuario     = new DeleteUsuarioController();

router.post  ("/instituicao"         , createInstituicao.execute);
router.put   ("/instituicao/:cpfCnpj", updateInstituicao.execute);
router.delete("/instituicao/:cpfCnpj", deleteUsuario.execute);

const createProfessor = new CreateProfessorController();
const updatePessoa    = new UpdatePessoaController();

router.post  ("/professor"         , createProfessor.execute);
router.put   ("/professor/:cpfCnpj", updatePessoa.execute);
router.delete("/professor/:cpfCnpj", deleteUsuario.execute);

const createAluno = new CreateAlunoController();

router.post  ("/aluno"         , createAluno.execute);
router.put   ("/aluno/:cpfCnpj", updatePessoa.execute);
router.delete("/aluno/:cpfCnpj", deleteUsuario.execute);

export { router };
