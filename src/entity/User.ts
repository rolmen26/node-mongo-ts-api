import { v5 as uuidv5 } from 'uuid';
import { hash } from 'bcrypt';

class User {

    uuid?: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt?: Date;

    constructor(email: string, password: string, name: string, createdAt: Date, updatedAt?: Date) {
        this.uuid = uuidv5(email, uuidv5.DNS);
        this.email = email;
        this.password = password;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    async hashPassword() {
        this.password = await hash(this.password, 10);
    }
}

export default User;