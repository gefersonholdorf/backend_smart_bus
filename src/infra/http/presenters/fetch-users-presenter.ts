import { PaginatedResponse } from "src/domain/school-transport/enterprise/use-cases/user/fetch-users-use-case";
import { User } from "src/domain/school-transport/entities/user";

export class FetchUserPresenter {
    static toHttp(users: PaginatedResponse<User>) {
        return {
            items: users.items.map(user => {
                return {
                    id: user.id.value,
                    name: user.name,
                    email: user.email,
                    cpf: user.cpf,
                    phone: user.phone,
                    address: user.address,
                    role: user.role,
                    status: user.status
                }
            }),
            totalResults: users.total,
            page: users.page,
            limit: users.limit,
            orderBy: users.orderBy,
            sortDirection: users.sortDirection
        }
    }
}

