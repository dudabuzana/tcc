-- CreateTable
CREATE TABLE "disciplina" (
    "id" TEXT NOT NULL,
    "cpfCnpj" VARCHAR(16) NOT NULL,
    "nome" TEXT NOT NULL,
    "curso" TEXT NOT NULL,

    CONSTRAINT "disciplina_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "disciplina" ADD CONSTRAINT "disciplina_cpfCnpj_fkey" FOREIGN KEY ("cpfCnpj") REFERENCES "instituicao"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
