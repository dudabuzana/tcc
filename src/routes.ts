import { Router } from "express";
import { DeleteUsuarioController } from "./controller/usuario";
import { CreateInstituicaoController, UpdateInstituicaoController, ListInstituicaoController, GetInstituicaoController } from "./controller/instituicao";
import { CreateProfessorController, CreateAlunoController, UpdatePessoaController, ListProfessorController, ListAlunoController, GetProfessorController, GetAlunoController } from "./controller/pessoa";
import { CreateDisciplinaController, UpdateDisciplinaController, DeleteDisciplinaController, ListDisciplinaController, GetDisciplinaController } from "./controller/disciplina";
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

const createDisciplina = new CreateDisciplinaController();
const updateDisciplina = new UpdateDisciplinaController();
const deleteDisciplina = new DeleteDisciplinaController();
const listDisciplina   = new ListDisciplinaController();
const getDisciplina    = new GetDisciplinaController();

router.post  ("/disciplina"         , createDisciplina.execute);
router.put   ("/disciplina/:id"     , updateDisciplina.execute);
router.delete("/disciplina/:id"     , deleteDisciplina.execute);
router.get   ("/disciplina/:cpfCnpj", listDisciplina.execute);
router.get   ("/disciplina/:id"     , getDisciplina.execute);

export { router };
