-- CreateEnum
CREATE TYPE "UsuarioNivel" AS ENUM ('instituicao', 'professor', 'aluno');

-- CreateTable
CREATE TABLE "usuario" (
    "cpfCnpj" VARCHAR(16) NOT NULL,
    "senha" TEXT NOT NULL,
    "nivel" "UsuarioNivel" NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("cpfCnpj")
);
