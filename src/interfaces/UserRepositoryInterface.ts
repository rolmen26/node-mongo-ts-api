import User from '../entity/User';

interface UserRepository {

    schema: any;

    save(user: User): Promise<User>;
    find(id: string): Promise<User>;
    findAll(): Promise<User[]>;
}

export default UserRepository;