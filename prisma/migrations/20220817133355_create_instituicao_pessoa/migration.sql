-- CreateTable
CREATE TABLE "instituicao" (
    "cpfCnpj" VARCHAR(16) NOT NULL,
    "nome" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "contato" TEXT NOT NULL,

    CONSTRAINT "instituicao_pkey" PRIMARY KEY ("cpfCnpj")
);

-- CreateTable
CREATE TABLE "professor" (
    "cpfCnpj" VARCHAR(16) NOT NULL,
    "cpfCnpjInstituicao" VARCHAR(16) NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,

    CONSTRAINT "professor_pkey" PRIMARY KEY ("cpfCnpj")
);

-- CreateIndex
CREATE UNIQUE INDEX "professor_matricula_key" ON "professor"("matricula");

-- AddForeignKey
ALTER TABLE "instituicao" ADD CONSTRAINT "instituicao_cpfCnpj_fkey" FOREIGN KEY ("cpfCnpj") REFERENCES "usuario"("cpfCnpj") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_cpfCnpj_fkey" FOREIGN KEY ("cpfCnpj") REFERENCES "usuario"("cpfCnpj") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professor" ADD CONSTRAINT "professor_cpfCnpjInstituicao_fkey" FOREIGN KEY ("cpfCnpjInstituicao") REFERENCES "instituicao"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
