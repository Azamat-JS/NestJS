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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const typeorm_2 = require("typeorm");
const mongodb_1 = require("mongodb");
let CommentsService = class CommentsService {
    commentRepository;
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async createComment(createCommentDto) {
        const { userId, postId, text } = createCommentDto;
        const comment = await this.commentRepository.create({ userId, postId, text });
        const result = this.commentRepository.save(comment);
        return result;
    }
    async findAllComments() {
        const comments = await this.commentRepository.find();
        return comments;
    }
    async findOneComment(id) {
        const comment = await this.commentRepository.findOne({
            where: { _id: new mongodb_1.ObjectId(id) }
        });
        if (!comment)
            throw new common_1.NotFoundException("comment not found");
        return comment;
    }
    async updateComment(id, updateCommentDto) {
        const comment = await this.findOneComment(id);
        comment.text = updateCommentDto.text;
        return await this.commentRepository.save(comment);
    }
    async removeComment(id) {
        const comment = await this.commentRepository.delete(id);
        if (comment.affected === 0)
            throw new common_1.NotFoundException("comment not found");
        return "Comment deleted successfully";
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentsService);
//# sourceMappingURL=comments.service.js.map