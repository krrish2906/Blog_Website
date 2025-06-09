import CrudRepository from "./CrudRepository.js";
import User from '../models/User.js';

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }
}

export default UserRepository;