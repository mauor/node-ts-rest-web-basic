import { TodoEntity } from "../entities/todo.entity";
import { CreateTodoDto, UpdateTodoDto } from '../dtos';

export abstract class TodoDatasource{

    abstract create( CreateTodoDto: CreateTodoDto): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id:number): Promise<TodoEntity>;
    abstract updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>
    abstract deleteById(id: number): Promise<TodoEntity>;
}