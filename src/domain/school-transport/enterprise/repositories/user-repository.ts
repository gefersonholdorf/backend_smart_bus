import type { PaginationParams } from "src/core/repositories/pagination-params";
import { User } from "../../entities/user";

export abstract class UserRepository {
    abstract create(user: User): Promise<void>
    abstract findById(id: number): Promise<User | null>
    abstract findByCpf(cpf: string): Promise<User | null>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findAll(paginationParams: PaginationParams): Promise<User[]>
    abstract save(id: number, user: User): Promise<void>
}