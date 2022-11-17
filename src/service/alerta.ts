import { prisma } from '../prisma'

class CreateAlerta {
    async execute(cpfCnpj: string, response: boolean, responseValue: number, negative: boolean, negativeValue: number) {
        return await prisma.alerta.create({
            data: {
                cpfCnpj,
                response,
                responseValue,
                negative,
                negativeValue
            }
        });
    }
}

class DeleteAlerta {
    async execute(cpfCnpj: string) {
        return await prisma.alerta.delete({
            where: {
                cpfCnpj
            }
        });
    }
}

class GetAlerta {
    async execute(cpfCnpj: string) {
        return await prisma.alerta.findFirst({
            where: {
                cpfCnpj
            }
        });
    }
}

export { CreateAlerta, DeleteAlerta, GetAlerta }