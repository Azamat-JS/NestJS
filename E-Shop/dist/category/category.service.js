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
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const category_schema_1 = require("../schemas/category.schema");
let CategoriesService = class CategoriesService {
    categoryModel;
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(createCategoryDto) {
        try {
            const category = await this.categoryModel.create(createCategoryDto);
            if (!category) {
                throw new common_1.HttpException('Category not created', common_1.HttpStatus.BAD_REQUEST);
            }
            return category;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        try {
            return this.categoryModel.find();
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const category = await this.categoryModel.findById(id);
            if (!category)
                throw new common_1.NotFoundException(`Category with id ${id} not found`);
            return category;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateCategoryDto) {
        try {
            const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true, runValidators: true });
            if (!category)
                throw new common_1.NotFoundException(`Category with id ${id} not found`);
            return category;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: 'Something went wrong' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const category = await this.categoryModel.findByIdAndDelete(id);
            if (!category) {
                throw new common_1.HttpException(`Category not found with id: ${id}`, common_1.HttpStatus.NOT_FOUND);
            }
            return `Category with id: ${id} deleted successfully`;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ message: "Something went wrong" }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async searchByName(name) {
        return this.categoryModel
            .find({ name: { $regex: new RegExp(name, 'i') } })
            .exec();
    }
};
exports.CategoriesService = CategoriesService;
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=category.service.js.map