-- DropForeignKey
ALTER TABLE "pergunta_formulario" DROP CONSTRAINT "pergunta_formulario_idFormulario_fkey";

-- AddForeignKey
ALTER TABLE "pergunta_formulario" ADD CONSTRAINT "pergunta_formulario_idFormulario_fkey" FOREIGN KEY ("idFormulario") REFERENCES "formulario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
