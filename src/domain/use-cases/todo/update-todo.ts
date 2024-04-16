import { UpdateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../respositories/todo.repository";

export interface UpdateUseCase {
    excecute(updateTodoDto: UpdateTodoDto): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateUseCase {

    constructor(
        private readonly repository: TodoRepository,
    ) { }

    excecute(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.repository.updateById(updateTodoDto);
    }

}