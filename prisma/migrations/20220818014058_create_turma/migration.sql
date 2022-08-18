-- CreateTable
CREATE TABLE "turma" (
    "id" TEXT NOT NULL,
    "idDisciplina" TEXT NOT NULL,
    "cpfCnpj" VARCHAR(16) NOT NULL,
    "semestre" INTEGER NOT NULL,

    CONSTRAINT "turma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_cpfCnpj_fkey" FOREIGN KEY ("cpfCnpj") REFERENCES "pessoa"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "turma" ADD CONSTRAINT "turma_idDisciplina_fkey" FOREIGN KEY ("idDisciplina") REFERENCES "disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
