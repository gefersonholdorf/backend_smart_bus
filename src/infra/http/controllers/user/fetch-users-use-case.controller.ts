import { BadRequestException, Body, Controller, Get, HttpCode, Post, Query, UnauthorizedException, UsePipes } from "@nestjs/common";
import { CredentialsInvalidError } from "src/core/exceptions/errors/credentials-invalid-error";
import { z } from "zod";
import { ZodValidationPipe } from "../../pipes/zod-validation-pipe";
import { Public } from "src/infra/encrypt/auth/is-public";
import { FetchUsersUseCase } from "src/domain/school-transport/enterprise/use-cases/user/fetch-users-use-case";
import { FetchUserPresenter } from "../../presenters/fetch-users-presenter";

const paginationParamsSchema = z.object({
    page: z.coerce.number().optional().default(1),
    limit: z.coerce.number().optional().default(10),
    orderBy: z.string().optional().default('id'),
    sortDirection: z.enum(['asc', 'desc']).optional().default('desc')
})

type PaginationParams = z.infer<typeof paginationParamsSchema>

@Public()
@Controller('/users')
export class FetchUsersController{
    constructor(
        private readonly fetchUsersUseCase: FetchUsersUseCase
    ) {}

    @Get()
    @HttpCode(200)
    @UsePipes(new ZodValidationPipe(paginationParamsSchema))
    async handle(@Query() query: PaginationParams) {
        const {page, limit, orderBy, sortDirection} = query

        const result = await this.fetchUsersUseCase.execute({
            page, limit, orderBy, sortDirection
        })

        return FetchUserPresenter.toHttp(result.value.pagination_params)
    }
}