import { Request, Response } from "express"

let todos = [
    { id: 1, name: 'buy milk', createdAt: new Date() },
    { id: 2, name: 'buy bread', createdAt: new Date() },
    { id: 3, name: 'buy fruit', createdAt: new Date() },
];

export class TodosController{
    
    constructor(){}

    public getTodos = (req:Request, res:Response) => {
        return res.json(todos);
    }

    public getTodoById = (req:Request, res:Response) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: `Id argument must be a number` });

        const todo = todos.find( todo => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id: ${id} not found` });

    }

    public createTodo = (req:Request, res:Response) => {
        const { name } = req.body;

        if(!name ) return res.status(400).json({ error: `Name property is required` });

        const newTodo = {
            id: todos.length + 1,
            name,
            createdAt: new Date(),
        };
        todos.push(newTodo);

        res.status(201).json(newTodo);
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        
        if (isNaN(id)) return res.status(400).json({ error: `Id argument must be a number` });
        
        const todo = todos.find(todo => todo.id === id);
        
        if(!todo)
            res.status(404).json({ error: `Todo with id: ${id} not found` });
        
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: `Name property is required` });
        
        //*SE MODIFICA POR REFERENCIA
        todo!.name = name || todo!.name;

        res.json(todo);
    }

    public deleteTodo = (req:Request, res:Response) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: `Id argument must be a number` });

        const todo = todos.find(todo => todo.id === id);

        if (!todo)
            res.status(404).json({ error: `Todo with id: ${id} not found` });

        todos.splice( todos.indexOf( todo! ), 1);
        res.json(todo);
    }
}