import { BadRequestException, Body, Controller, HttpCode, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, UsePipes } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { ChangePasswordUseCase } from "src/domain/school-transport/enterprise/use-cases/user/change-password-use-case";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";

const changePasswordSchema = z.object({
    password: z.string().min(6, {message: 'Mínimo de 6 caracteres'}),
})

type ChangePasswordSchema = z.infer<typeof changePasswordSchema>

@Controller('/change-password')
export class ChangePasswordController{
    constructor(
        private readonly changePasswordUseCase: ChangePasswordUseCase
    ) {}

    @Put('/:id')
    @HttpCode(200)
    async handle(@Body(new ZodValidationPipe(changePasswordSchema)) body: ChangePasswordSchema,
                 @Param('id', ParseIntPipe) userId: number) {
        const { password } = body

        const result = await this.changePasswordUseCase.execute({
            password, userId: 1
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Usuário não encontrado.')
            }

            throw new BadRequestException()
        }
    }
}