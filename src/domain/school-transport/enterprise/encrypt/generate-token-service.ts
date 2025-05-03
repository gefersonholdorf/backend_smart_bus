export abstract class GenerateTokenService {
    abstract encrypt(payload: Record<string, any>):Promise<string>
}