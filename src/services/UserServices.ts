import User from '../entity/User';
import UserRepository from '../repository/UserRepository';

class UserService {

    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Service to create a new user
     * 
     * @param param0 
     * @returns 
     */
    async createUser({ email, password, name }: { email: string, password: string, name: string }): Promise<User> {

        try {
            const user = new User(email, password, name, new Date());
            await user.hashPassword();
            return await this.userRepository.save(user);
        } catch (error: object | any) {
            throw ({ message: error.message, status: error.status })
        }
    }

    async getUsers() {
        return this.userRepository.findAll();
    }

    async getUserByUuid(uuid: string) {
        return this.userRepository.find(uuid);
    }
}

export default UserService;