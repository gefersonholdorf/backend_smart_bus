import { BadRequestException, Body, ConflictException, Controller, HttpCode, Post, UsePipes } from "@nestjs/common";
import { CreateUserUseCase } from "src/domain/school-transport/enterprise/use-cases/user/create-user-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { ExistingUserError } from "src/core/exceptions/errors/existing-user-error";

const createUserSchema = z.object({
    name: z.string().min(4, {message: 'Mínimo de 4 caracteres'}).max(32, {message: 'Máximo de 32 caracteres'}),
    email: z.string().email({message: 'E-mail inválido'}),
    cpf: z.string().min(11, {message: 'CPF inválido'}).max(11, {message: 'CPF inválido'}),
    phone: z.string({message: 'Número de telefone inválido'}),
    address: z.string({message: 'Endereço inválido'}),
    password: z.string().min(6, {message: 'Mínimo de 6 caracteres'}),
    role: z.enum(['ADMIN', 'MOTORISTA', 'RESPONSÁVEL', 'SECRETARIA']),
    status: z.enum(['ATIVO', 'INATIVO'])
})

type CreateUserSchema = z.infer<typeof createUserSchema>

@Controller('/users')
export class CreateUserController{
    constructor(
        private readonly createUserUseCase: CreateUserUseCase
    ) {}

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createUserSchema))
    async handle(@Body() body: CreateUserSchema) {
        const {name, email, cpf, phone, address, password, role, status} = body

        const result = await this.createUserUseCase.execute({
            name, email, cpf, phone, address, password, role, status
        })

        if(result.isLeft()) {
            if(result.value instanceof ExistingUserError) {
                throw new ConflictException('Usuário já existente.')
            }

            throw new BadRequestException()
        }
    }
}