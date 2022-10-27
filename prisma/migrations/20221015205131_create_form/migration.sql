-- CreateTable
CREATE TABLE "formulario" (
    "id" TEXT NOT NULL,
    "idTurma" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "formulario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "formulario" ADD CONSTRAINT "formulario_idTurma_fkey" FOREIGN KEY ("idTurma") REFERENCES "turma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
