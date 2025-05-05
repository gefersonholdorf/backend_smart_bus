import { EntityBase } from "src/core/entities/entity-base";
import { EntityStatus } from "src/core/entities/entity-status";
import { UniqueEntityId } from "src/core/entities/unique-entity-id";

export type ROLE = 'ADMIN' | 'MOTORISTA' | 'RESPONSÁVEL' | 'SECRETARIA'

export interface UserProps {
    id ?: UniqueEntityId
    name: string
    email: string
    cpf: string
    phone: string
    address: string
    password: string
    role: ROLE
    status?: EntityStatus
}

export class User extends EntityBase<UserProps> {

    get name() {
        return this.props.name
    }

    set name(name: string) {
        this.props.name = name
    }

    get email() {
        return this.props.email
    }

    get cpf() {
        return this.props.cpf
    }

    get phone() {
        return this.props.phone
    }

    set phone(phone: string) {
        this.props.phone = phone
    }

    get address() {
        return this.props.address
    }

    set address(address: string) {
        this.props.address = address
    }

    get password() {
        return this.props.password
    }

    set password(password: string) {
        this.props.password = password
    }

    get role() {
        return this.props.role
    }

    set role(role: ROLE) {
        this.props.role = role
    }

    get status() {
        return this.props.status!
    }

    set status(status: EntityStatus) {
        this.props.status = status
    }

    static create(
        props: UserProps,
        id?: UniqueEntityId
    ) {
        return new User(
            {
                name: props.name,
                email: props.email,
                cpf: props.cpf,
                phone: props.phone,
                address: props.address,
                password: props.password,
                role: props.role,
                status: props.status ?? 'ATIVO'
            },
            id
        )
    }
}