import { CreateTodoDto, UpdateTodoDto } from './../../domain/dtos';
import { Request, Response } from "express"
import { CreateTodo, CustomError, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from '../../domain';

export class TodosController{
    
    private handleError = (res: Response, error: unknown) => {
        if( error instanceof CustomError ){
            res.status(error.statusCode).json( { error: error.message } );
            return;
        }
        else{
            res.status(500).json({error: 'Internal server error check logs'});
        }
    }

    constructor(
        private readonly todoRepository: TodoRepository
    ){}

    public createTodo = (req:Request, res:Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({ error })
        
        new CreateTodo( this.todoRepository )
            .excecute( createTodoDto! )
            .then( todo => res.status(201).json(todo) )
            .catch( error => this.handleError(res, error))
    }
    
    public getTodos = (req:Request, res:Response) => {
        new GetTodos( this.todoRepository )
            .excecute()
            .then( todos => res.json(todos) )
            .catch(error => this.handleError(res, error) );
    }

    public getTodoById = (req:Request, res:Response) => {
        const id = +req.params.id;
        new GetTodo( this.todoRepository )
            .excecute(id)
            .then( todo => res.json(todo) )
            .catch(error => this.handleError(res, error) );
    }


    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto ] = UpdateTodoDto.create({
            ...req.body,
            id
        })
        if (error) return res.status(400).json({ error })
        new UpdateTodo( this.todoRepository )
            .excecute( updateTodoDto! )
            .then( todo => res.json(todo) )
            .catch(error => this.handleError(res, error) )
    }

    public deleteTodo = (req:Request, res:Response) => {
        const id = +req.params.id;
        new DeleteTodo( this.todoRepository )
            .excecute( id )
            .then( todo => res.json(todo) )
            .catch(error => this.handleError(res, error))
    }

}