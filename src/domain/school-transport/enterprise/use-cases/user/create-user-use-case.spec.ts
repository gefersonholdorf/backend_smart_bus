import { beforeEach, describe, expect, it, Mocked, vi } from "vitest";
import { CreateUserUseCase } from "./create-user-use-case";
import { HashedService } from "../../encrypt/hashed-service";
import { UserRepository } from "../../repositories/user-repository";
import { MakeUser } from "test/factories/make-user";
import { ExistingUserError } from "src/core/exceptions/errors/existing-user-error";

describe('Create User Use-Case [UNIT]', () => {
    let hashedService: Partial<Mocked<HashedService>>
    let userRepository: Partial<Mocked<UserRepository>>
    let sut: CreateUserUseCase

    beforeEach(() => {
        hashedService = {
            encrypt: vi.fn()
        }

        userRepository = {
            create: vi.fn(),
            findByCpf: vi.fn(),
            findByEmail: vi.fn()
        }

        sut = new CreateUserUseCase(userRepository as UserRepository, hashedService as HashedService)
    })

    it('should be able to create a user', async() => {
        const user = MakeUser()

        userRepository.findByCpf!.mockResolvedValue(null)
        userRepository.findByEmail!.mockResolvedValue(null)
        userRepository.create!.mockResolvedValue()

        hashedService.encrypt!.mockResolvedValue('senha123-hash')

        const result = await sut.execute(user)

        expect(result.isRight()).toBe(true)
    })

    it('should be able to return an error if a user already exists by Email', async() => {
        const user = MakeUser()
        const existingUser = MakeUser({
            cpf: '10574585224'
        })

        userRepository.findByCpf!.mockResolvedValue(null)
        userRepository.findByEmail!.mockResolvedValue(existingUser)
        userRepository.create!.mockResolvedValue()

        hashedService.encrypt!.mockResolvedValue('senha123-hash')

        const result = await sut.execute(user)

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ExistingUserError)
    })

    it('should be able to return an error if a user already exists by CPF', async() => {
        const user = MakeUser()
        const existingUser = MakeUser({
            email: 'teste@gmail.com'
        })

        userRepository.findByCpf!.mockResolvedValue(existingUser)
        userRepository.findByEmail!.mockResolvedValue(null)
        userRepository.create!.mockResolvedValue()

        hashedService.encrypt!.mockResolvedValue('senha123-hash')

        const result = await sut.execute(user)

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(ExistingUserError)
    })
})