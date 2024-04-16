import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../respositories/todo.repository";

export interface DeleteTodoUseCase {
    excecute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    excecute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById( id );
    }

}