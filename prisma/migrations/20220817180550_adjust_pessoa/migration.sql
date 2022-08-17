/*
  Warnings:

  - You are about to drop the `professor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "professor" DROP CONSTRAINT "professor_cpfCnpj_fkey";

-- DropForeignKey
ALTER TABLE "professor" DROP CONSTRAINT "professor_cpfCnpjInstituicao_fkey";

-- DropTable
DROP TABLE "professor";

-- CreateTable
CREATE TABLE "pessoa" (
    "cpfCnpj" VARCHAR(16) NOT NULL,
    "cpfCnpjInstituicao" VARCHAR(16) NOT NULL,
    "nome" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("cpfCnpj")
);

-- CreateIndex
CREATE UNIQUE INDEX "pessoa_matricula_key" ON "pessoa"("matricula");

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_cpfCnpj_fkey" FOREIGN KEY ("cpfCnpj") REFERENCES "usuario"("cpfCnpj") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pessoa" ADD CONSTRAINT "pessoa_cpfCnpjInstituicao_fkey" FOREIGN KEY ("cpfCnpjInstituicao") REFERENCES "instituicao"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;
