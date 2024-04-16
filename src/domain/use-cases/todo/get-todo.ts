import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../respositories/todo.repository";

export interface GetTodoUseCase {
    excecute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    excecute(id: number): Promise<TodoEntity> {
        return this.repository.findById(id);
    }

}