import CrudRepository from "./CrudRepository.js";
import Blog from '../models/Blog.js';

class BlogRepository extends CrudRepository {
    constructor() {
        super(Blog);
    }
}

export default BlogRepository;