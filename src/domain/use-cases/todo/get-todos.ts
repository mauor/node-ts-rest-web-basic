import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../respositories/todo.repository";

export interface GetTodosUseCase {
    excecute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    excecute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }

}