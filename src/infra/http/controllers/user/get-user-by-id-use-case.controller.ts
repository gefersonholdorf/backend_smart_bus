import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, ParseIntPipe } from "@nestjs/common";
import { ResourceNotFoundError } from "src/core/exceptions/errors/resource-not-found-error";
import { GetUserByIdUseCase } from "src/domain/school-transport/enterprise/use-cases/user/get-user-by-id-use-case";
import { Public } from "src/infra/encrypt/auth/is-public";
import { UserPresenter } from "../../presenters/user-presenter";

@Public()
@Controller('/users/:id')
export class GetUserByIdController{
    constructor(
        private readonly getUserByIdUseCase: GetUserByIdUseCase
    ) {}

    @Get()
    @HttpCode(200)
    async handle(@Param('id', ParseIntPipe) userId: number) {

        const result = await this.getUserByIdUseCase.execute({
            userId
        })

        if(result.isLeft()) {
            if(result.value instanceof ResourceNotFoundError) {
                throw new NotFoundException('Recurso não encontrado.')
            }

            throw new BadRequestException()
        }

        return UserPresenter.toHttp(result.value.user)
    }
}