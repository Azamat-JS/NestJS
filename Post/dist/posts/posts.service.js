"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_entity_1 = require("./entities/post.entity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
let PostService = class PostService {
    postRepository;
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async createPost(createPostDto) {
        const { content, title, userId } = createPostDto;
        const post = await this.postRepository.create({ title, content, userId });
        const result = this.postRepository.save(post);
        return result;
    }
    async findAllPosts() {
        const posts = await this.postRepository.find();
        return posts;
    }
    async findOnePost(id) {
        const post = await this.postRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(id) }
        });
        if (!post)
            throw new common_1.NotFoundException("post not found");
        return post;
    }
    async updatePost(id, updatePostDto) {
        const post = await this.findOnePost(id);
        post.title = updatePostDto.title || post.title;
        post.content = updatePostDto.content || post.content;
        return await this.postRepository.save(post);
    }
    async removePost(id) {
        const post = await this.postRepository.delete(id);
        if (post.affected === 0)
            throw new common_1.NotFoundException("post not found");
        return "post deleted successfully";
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostService);
//# sourceMappingURL=posts.service.js.map