import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../respositories/todo.repository";

export interface CreateTodoUseCase{
    excecute(dto: CreateTodoDto): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase{

    constructor(
        private readonly repository: TodoRepository,
    ){}

    excecute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create( dto );
    }

}