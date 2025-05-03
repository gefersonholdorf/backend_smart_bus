import { User } from "src/domain/school-transport/entities/user";

export class UserPresenter {
    static toHttp(user: User) {
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
    }
}