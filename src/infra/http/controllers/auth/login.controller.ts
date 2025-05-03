import { BadRequestException, Body, Controller, HttpCode, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { CredentialsInvalidError } from "src/core/exceptions/errors/credentials-invalid-error";
import { LoginUseCase } from "src/domain/school-transport/enterprise/use-cases/auth/login-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { Public } from "src/infra/encrypt/auth/is-public";

const loginSchema = z.object({
    cpf: z.string().min(11, {message: 'CPF inválido'}).max(11, {message: 'CPF inválido'}),
    password: z.string()
})

type LoginSchema = z.infer<typeof loginSchema>

@Public()
@Controller('/login')
export class LoginController{
    constructor(
        private readonly loginUseCase: LoginUseCase
    ) {}

    @Post()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(loginSchema))
    async handle(@Body() body: LoginSchema) {
        const {cpf, password} = body

        const result = await this.loginUseCase.execute({
            cpf, password
        })

        if(result.isLeft()) {
            if(result.value instanceof CredentialsInvalidError) {
                throw new UnauthorizedException('Credenciais inválidas.')
            }

            throw new BadRequestException()
        }

        return result.value
    }
}