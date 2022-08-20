/*
  Warnings:

  - The primary key for the `aluno_turma` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "aluno_turma" DROP CONSTRAINT "aluno_turma_pkey",
ADD CONSTRAINT "aluno_turma_pkey" PRIMARY KEY ("id", "cpfCnpj");
