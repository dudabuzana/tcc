import { Router } from "express";
import { DeleteUsuarioController, LoginUsuarioController } from "./controller/usuario";
import { CreateInstituicaoController, UpdateInstituicaoController, ListInstituicaoController, GetInstituicaoController } from "./controller/instituicao";
import { CreateProfessorController, CreateAlunoController, UpdatePessoaController, ListProfessorController, ListAlunoController, GetProfessorController, GetAlunoController } from "./controller/pessoa";
import { CreateDisciplinaController, UpdateDisciplinaController, DeleteDisciplinaController, ListDisciplinaController, GetDisciplinaController } from "./controller/disciplina";
import { CreateTurmaController, UpdateTurmaController, DeleteTurmaController, ListTurmaController, ListTurmaProfessorController, GetTurmaController } from "./controller/turma";
import { CreateAlunoTurmaController, DeleteAlunoTurmaController, ListAlunoTurmaController, ListTurmaAlunoController, ListTurmaAlunoFormularioController } from "./controller/aluno_turma";
import { CreateFormularioController, UpdateFormularioController, UpdateFormularioPerguntaController, DeleteFormularioController, ListFormularioTurmaController, ListFormularioController, ListFormularioProfessorController } from './controller/formulario';
import { CreatePerguntaController, ListPerguntaFormularioController } from './controller/pergunta_formulario';
import { CreateRespostaController, ListRespostaFormularioController, ListRespostaFormularioAlunoController } from './controller/resposta';
import authMiddleware from "./middlewares/authMiddleware";

const router = Router();

const createInstituicao = new CreateInstituicaoController();
const updateInstituicao = new UpdateInstituicaoController();
const deleteUsuario     = new DeleteUsuarioController();
const listInstituicao   = new ListInstituicaoController();
const getInstituicao    = new GetInstituicaoController();
const listDisciplina    = new ListDisciplinaController();

router.post  ("/instituicao"                    , createInstituicao.execute);
router.put   ("/instituicao/:cpfCnpj"           , authMiddleware, updateInstituicao.execute);
router.delete("/instituicao/:cpfCnpj"           , authMiddleware, deleteUsuario.execute);
router.get   ("/instituicao"                    , listInstituicao.execute);
router.get   ("/instituicao/:cpfCnpj"           , authMiddleware, getInstituicao.execute);
router.get   ("/instituicao/:cpfCnpj/disciplina", authMiddleware, listDisciplina.execute);

const createProfessor         = new CreateProfessorController();
const updatePessoa            = new UpdatePessoaController();
const listProfessor           = new ListProfessorController();
const getProfessor            = new GetProfessorController();
const listTurmaProfessor      = new ListTurmaProfessorController();
const listFormularioProfessor = new ListFormularioProfessorController();

router.post  ("/professor"                    , createProfessor.execute);
router.put   ("/professor/:cpfCnpj"           , authMiddleware, updatePessoa.execute);
router.delete("/professor/:cpfCnpj"           , authMiddleware, deleteUsuario.execute);
router.get   ("/professor"                    , authMiddleware, listProfessor.execute);
router.get   ("/professor/:cpfCnpj"           , authMiddleware, getProfessor.execute);
router.get   ("/professor/:cpfCnpj/turma"     , authMiddleware, listTurmaProfessor.execute);
router.get   ("/professor/:cpfCnpj/formulario", authMiddleware, listFormularioProfessor.execute);

const createAluno              = new CreateAlunoController();
const listAluno                = new ListAlunoController();
const getAluno                 = new GetAlunoController();
const listTurmaAluno           = new ListTurmaAlunoController();
const listTurmaAlunoFormulario = new ListTurmaAlunoFormularioController();
const listFormularioAluno      = new ListRespostaFormularioAlunoController();

router.post  ("/aluno"                          , authMiddleware, createAluno.execute);
router.put   ("/aluno/:cpfCnpj"                 , authMiddleware, updatePessoa.execute);
router.delete("/aluno/:cpfCnpj"                 , authMiddleware, deleteUsuario.execute);
router.get   ("/aluno"                          , authMiddleware, listAluno.execute);
router.get   ("/aluno/:cpfCnpj"                 , authMiddleware, getAluno.execute);
router.get   ("/aluno/:cpfCnpj/turma"           , authMiddleware, listTurmaAluno.execute);
router.get   ("/aluno/:cpfCnpj/turma/formulario", authMiddleware, listTurmaAlunoFormulario.execute);
router.get   ("/aluno/:cpfCnpj/formulario/:id"  , authMiddleware, listFormularioAluno.execute);

const createDisciplina = new CreateDisciplinaController();
const updateDisciplina = new UpdateDisciplinaController();
const deleteDisciplina = new DeleteDisciplinaController();
const getDisciplina    = new GetDisciplinaController();
const listTurma        = new ListTurmaController();

router.post  ("/disciplina"          , authMiddleware, createDisciplina.execute);
router.put   ("/disciplina/:id"      , authMiddleware, updateDisciplina.execute);
router.delete("/disciplina/:id"      , authMiddleware, deleteDisciplina.execute);
router.get   ("/disciplina"          , authMiddleware, listDisciplina.execute);
router.get   ("/disciplina/:id"      , authMiddleware, getDisciplina.execute);
router.get   ("/disciplina/:id/turma", authMiddleware, listTurma.execute);

const createTurma         = new CreateTurmaController();
const updateTurma         = new UpdateTurmaController();
const deleteTurma         = new DeleteTurmaController();
const getTurma            = new GetTurmaController();
const listAlunoTurma      = new ListAlunoTurmaController();
const listFormularioTurma = new ListFormularioTurmaController();

router.post  ("/turma"               , authMiddleware, createTurma.execute);
router.put   ("/turma/:id"           , authMiddleware, updateTurma.execute);
router.delete("/turma/:id"           , authMiddleware, deleteTurma.execute);
router.get   ("/turma"               , authMiddleware, listTurma.execute);
router.get   ("/turma/:id"           , authMiddleware, getTurma.execute);
router.get   ("/turma/:id/aluno"     , authMiddleware, listAlunoTurma.execute);
router.get   ("/turma/:id/formulario", authMiddleware, listFormularioTurma.execute);

const createAlunoTurma = new CreateAlunoTurmaController();
const deleteAlunoTurma = new DeleteAlunoTurmaController();

router.post  ("/aluno_turma"             , authMiddleware, createAlunoTurma.execute);
router.delete("/aluno_turma/:id/:cpfCnpj", authMiddleware, deleteAlunoTurma.execute);

const createFormulario         = new CreateFormularioController();
const updateFormulario         = new UpdateFormularioController();
const updateFormularioPergunta = new UpdateFormularioPerguntaController();
const deleteFormulario         = new DeleteFormularioController();
const listFormulario           = new ListFormularioController();
const listPerguntaFormulario   = new ListPerguntaFormularioController();
const listRespostaFormulario   = new ListRespostaFormularioController();

router.post  ("/formulario"             , authMiddleware, createFormulario.execute);
router.put   ("/formulario/:id"         , authMiddleware, updateFormulario.execute);
router.put   ("/formulario/:id/pergunta", authMiddleware, updateFormularioPergunta.execute);
router.delete("/formulario/:id"         , authMiddleware, deleteFormulario.execute);
router.get   ("/formulario"             , authMiddleware, listFormulario.execute);
router.get   ("/formulario/:id/pergunta", authMiddleware, listPerguntaFormulario.execute);
router.get   ("/formulario/:id/resposta", authMiddleware, listRespostaFormulario.execute);

const createPergunta = new CreatePerguntaController();

router.post("/pergunta", authMiddleware, createPergunta.execute);

const createResposta = new CreateRespostaController();

router.post("/resposta", authMiddleware, createResposta.execute);

const loginUsuario = new LoginUsuarioController();

router.post("/login", loginUsuario.execute);

export { router };
