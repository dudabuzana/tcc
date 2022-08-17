import { Router } from "express";
import { DeleteUsuarioController } from "./controller/usuario";
import { CreateInstituicaoController, UpdateInstituicaoController, ListInstituicaoController, GetInstituicaoController } from "./controller/instituicao";
import { CreateProfessorController, CreateAlunoController, UpdatePessoaController, ListProfessorController, ListAlunoController, GetProfessorController, GetAlunoController } from "./controller/pessoa";
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

const createInstituicao = new CreateInstituicaoController();
const updateInstituicao = new UpdateInstituicaoController();
const deleteUsuario     = new DeleteUsuarioController();
const listInstituicao   = new ListInstituicaoController();
const getInstituicao    = new GetInstituicaoController();

router.post  ("/instituicao"         , createInstituicao.execute);
router.put   ("/instituicao/:cpfCnpj", updateInstituicao.execute);
router.delete("/instituicao/:cpfCnpj", deleteUsuario.execute);
router.get   ("/instituicao"         , listInstituicao.execute);
router.get   ("/instituicao/:cpfCnpj", getInstituicao.execute);

const createProfessor = new CreateProfessorController();
const updatePessoa    = new UpdatePessoaController();
const listProfessor   = new ListProfessorController();
const getProfessor    = new GetProfessorController();

router.post  ("/professor"         , createProfessor.execute);
router.put   ("/professor/:cpfCnpj", updatePessoa.execute);
router.delete("/professor/:cpfCnpj", deleteUsuario.execute);
router.get   ("/professor"         , listProfessor.execute);
router.get   ("/professor/:cpfCnpj", getProfessor.execute);

const createAluno = new CreateAlunoController();
const listAluno   = new ListAlunoController();
const getAluno    = new GetAlunoController();

router.post  ("/aluno"         , createAluno.execute);
router.put   ("/aluno/:cpfCnpj", updatePessoa.execute);
router.delete("/aluno/:cpfCnpj", deleteUsuario.execute);
router.get   ("/aluno"         , listAluno.execute);
router.get   ("/aluno/:cpfCnpj", getAluno.execute);

export { router };
