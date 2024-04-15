import { CreateTodoDto, UpdateTodoDto } from './../../domain/dtos';
import { Request, Response } from "express"
import { prisma } from "../../dat/postgres";

export class TodosController{
    
    constructor(){}

    public getTodos = async(req:Request, res:Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    }

    public getTodoById = async(req:Request, res:Response) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: `Id argument must be a number` });

        const todo = await prisma.todo.findUnique({ 
            where: { id } 
         });

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id: ${id} not found` });

    }

    public createTodo = async (req:Request, res:Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({ error })

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.status(201).json(todo);
    }

    public updateTodo = async(req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto ] = UpdateTodoDto.create({
            ...req.body,
            id
        })
        if (error) return res.status(400).json({ error});
        
        const todo = await prisma.todo.findUnique({
            where: { id }
        });
        
        if(!todo)
            res.status(404).json({ error: `Todo with id: ${id} not found` });
        
        

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        });

        res.json(updatedTodo);
    }

    public deleteTodo = async(req:Request, res:Response) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: `Id argument must be a number` });

        const todo = await prisma.todo.findUnique({
            where: { id }
        });

        if (!todo)
            res.status(404).json({ error: `Todo with id: ${id} not found` });

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        res.json({todo, deleted});
    }
}