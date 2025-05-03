import { HashedService } from "src/domain/school-transport/enterprise/encrypt/hashed-service";
import * as bcryptjs from 'bcryptjs';
import { Injectable } from "@nestjs/common";

@Injectable()
export class BcryptHashedService implements HashedService {

    async encrypt(password: string): Promise<string> {
        const SALT_NUMBER = 8
        return await bcryptjs.hash(password, SALT_NUMBER)
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcryptjs.compare(password, hash)
    }
}