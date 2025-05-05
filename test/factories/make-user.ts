import { UniqueEntityId } from "src/core/entities/unique-entity-id";
import { User, UserProps } from "src/domain/school-transport/entities/user";

export function MakeUser(
    props?: Partial<UserProps>,
    id?: number
) {
    return User.create({
        name: props?.name ?? 'Juliano',
        email: props?.email ?? 'juliano@gmail.com',
        phone: props?.phone ?? '47991587465',
        cpf: props?.cpf ?? '15684755896',
        address: props?.address ?? 'Rua 14 de Dezembro - Centro - Criciúma',
        password: props?.password ?? 'senha123',
        role: props?.role ?? 'ADMIN',
        status: props?.status ?? 'ATIVO'
    }, 
    new UniqueEntityId(id))
}