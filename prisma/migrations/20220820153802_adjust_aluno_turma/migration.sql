/*
  Warnings:

  - A unique constraint covering the columns `[id,cpfCnpj]` on the table `aluno_turma` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "aluno_turma_id_cpfCnpj_key" ON "aluno_turma"("id", "cpfCnpj");
