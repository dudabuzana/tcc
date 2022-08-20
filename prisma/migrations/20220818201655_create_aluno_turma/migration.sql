-- CreateTable
CREATE TABLE "aluno_turma" (
    "id" TEXT NOT NULL,
    "cpfCnpj" VARCHAR(16) NOT NULL,

    CONSTRAINT "aluno_turma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aluno_turma" ADD CONSTRAINT "aluno_turma_cpfCnpj_fkey" FOREIGN KEY ("cpfCnpj") REFERENCES "pessoa"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aluno_turma" ADD CONSTRAINT "aluno_turma_id_fkey" FOREIGN KEY ("id") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
