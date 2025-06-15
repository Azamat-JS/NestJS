import { TaskEntity } from './entities/task.entity';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly taskRepo;
    constructor(taskRepo: Repository<TaskEntity>);
    getAll(): Promise<TaskEntity[]>;
    getById(id: number): Promise<TaskEntity | null>;
    doneTask(id: number): Promise<TaskEntity[] | null>;
    createTask(name: string): Promise<TaskEntity[] | null>;
    editTask(id: number, name: string): Promise<TaskEntity[] | null>;
    deleteTask(id: number): Promise<TaskEntity[] | null>;
}
