import { Model } from "mongoose";
import { StudentDocument } from "src/schema/bot-schema";
export declare class BotService {
    private studentModel;
    private bot;
    private readonly ownerId;
    constructor(studentModel: Model<StudentDocument>);
}
