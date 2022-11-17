-- CreateTable
CREATE TABLE "alerta" (
    "cpfCnpj" VARCHAR(16) NOT NULL,
    "response" BOOLEAN NOT NULL,
    "responseValue" INTEGER NOT NULL,
    "negative" BOOLEAN NOT NULL,
    "negativeValue" INTEGER NOT NULL,

    CONSTRAINT "alerta_pkey" PRIMARY KEY ("cpfCnpj")
);
