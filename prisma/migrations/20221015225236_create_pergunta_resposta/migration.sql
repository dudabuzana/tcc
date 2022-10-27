-- CreateEnum
CREATE TYPE "PerguntaTipo" AS ENUM ('likert', 'descritivo');

-- CreateTable
CREATE TABLE "pergunta_formulario" (
    "id" SERIAL NOT NULL,
    "idFormulario" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "tipo" "PerguntaTipo" NOT NULL,

    CONSTRAINT "pergunta_formulario_pkey" PRIMARY KEY ("id","idFormulario")
);

-- CreateTable
CREATE TABLE "resposta" (
    "idPergunta" INTEGER NOT NULL,
    "idFormulario" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "resposta" TEXT NOT NULL,

    CONSTRAINT "resposta_pkey" PRIMARY KEY ("idPergunta","idFormulario","cpfCnpj")
);

-- AddForeignKey
ALTER TABLE "pergunta_formulario" ADD CONSTRAINT "pergunta_formulario_idFormulario_fkey" FOREIGN KEY ("idFormulario") REFERENCES "formulario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta" ADD CONSTRAINT "resposta_cpfCnpj_fkey" FOREIGN KEY ("cpfCnpj") REFERENCES "pessoa"("cpfCnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "resposta" ADD CONSTRAINT "resposta_idPergunta_idFormulario_fkey" FOREIGN KEY ("idPergunta", "idFormulario") REFERENCES "pergunta_formulario"("id", "idFormulario") ON DELETE RESTRICT ON UPDATE CASCADE;
