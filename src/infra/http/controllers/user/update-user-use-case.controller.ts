import { BadRequestException, Body, ConflictException, Controller, HttpCode, Param, ParseIntPipe, Put, UsePipes } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { UpdateUserUseCase } from "src/domain/school-transport/enterprise/use-cases/user/update-user-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";

const updateUserSchema = z.object({
    name: z.string().min(4, {message: 'Mínimo de 4 caracteres'}).max(32, {message: 'Máximo de 32 caracteres'}).optional(),
    phone: z.string({message: 'Número de telefone inválido'}).optional(),
    address: z.string({message: 'Endereço inválido'}).optional(),
    password: z.string().min(6, {message: 'Mínimo de 6 caracteres'}).optional(),
    role: z.enum(['ADMIN', 'MOTORISTA', 'RESPONSÁVEL', 'SECRETARIA']).optional(),
    status: z.enum(['ATIVO', 'INATIVO']).optional()
})

type UpdateUserSchema = z.infer<typeof updateUserSchema>

@Controller('/users/:id')
export class UpdateUserController{
    constructor(
        private readonly updateUserUseCase: UpdateUserUseCase
    ) {}

    @Put()
    @HttpCode(200)
    async handle(@Body(new ZodValidationPipe(updateUserSchema)) body: UpdateUserSchema, @Param('id', ParseIntPipe) userId: number) {
        const {name, phone, address, password, role, status} = body

        const result = await this.updateUserUseCase.execute({
            name, phone, address, password, role, status, userId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new ConflictException('Usuário não encontrado.')
            }

            throw new BadRequestException()
        }
    }
}