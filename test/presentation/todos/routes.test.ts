import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';

describe('routes.ts', () => {

    const todo1 = { text: 'todo número 1'}
    const todo2 = { text: 'todo número 2' }

    beforeAll( async() => {
        await testServer.start()
    })

    afterAll( () =>{
        testServer.close();
    })
    beforeEach( async() => {
        await prisma.todo.deleteMany();
    })

    test('should return TODOs api/todos', async() => {
        await prisma.todo.createMany({
            data: [ todo1, todo2]
        });

        const { body } = await request(testServer.app)
            .get('/api/todos')
            .expect(200)
        
        expect(body).toBeInstanceOf( Array );
        expect(body.length).toBe(2);
        expect(body[0].text).toBe(todo1.text);
        expect(body[1].text).toBe(todo2.text);
        expect(body[0].completedAt).toBeNull();
    })

    test('shoul return a TODO api/todos/:id', async() => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
            .get(`/api/todos/${todo.id}`)
            .expect(200)

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: todo.completedAt,
        })
    })

    test('should a 404 not found if to do dont exist', async() => {
        const id = 999;
        const { body } = await request(testServer.app)
            .get(`/api/todos/${id}`)
            .expect(404)
        expect(body).toEqual( {error: `Todo with id ${id} not found`} );
    })

    test('should return a new todo', async() => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send(todo1)
            .expect(201)

        expect(body).toEqual({
            id: expect.any(Number),
            text: todo1.text,
            completedAt: null,
        })
    })

    test('should return an error when text is not valid new todo', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({})
            .expect(400)

        expect(body).toEqual({ error: "text is required" })
    })

    test('should return an error when text is empty', async () => {
        const { body } = await request(testServer.app)
            .post('/api/todos')
            .send({
                text: ''
            })
            .expect(400)

        expect(body).toEqual({ error: "text is required" })
    })

    test('shuold return an updated todo', async() => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
            .put(`/api/todos/${todo.id}`)
            .send({ text: 'todo text updated', completedAt: '2024-04-17' })
            .expect(200)

        expect(body).toEqual({
            id: todo.id,
            text: 'todo text updated',
            completedAt: '2024-04-17T00:00:00.000Z',
        })    

    });

    test('should return 404 if TODO not found', async() => {
        const id = 999;
        const { body } = await request(testServer.app)
            .put(`/api/todos/${id}`)
            .send({ text: 'todo text updated', completedAt: '2024-04-17' })
            .expect(404);
        expect(body).toEqual( {error: `Todo with id ${id} not found`} );
    });

    test('should return an updated todo only the completedAt', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
           .put(`/api/todos/${todo.id}`)
           .send({ completedAt: '2024-04-17' })
           .expect(200)

        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: '2024-04-17T00:00:00.000Z',
        })
    });

    test('shoul delete a todo', async () => {
        const todo = await prisma.todo.create({
            data: todo1
        });

        const { body } = await request(testServer.app)
           .delete(`/api/todos/${todo.id}`)
           .expect(200);
        
        expect(body).toEqual({
            id: todo.id,
            text: todo.text,
            completedAt: null
        });
    });

    test('should return 404 if todo dont exist', async () => {
        const id = 999;
        const{ body } = await request(testServer.app)
        .delete(`/api/todos/${id}`)
        .expect(404);

        expect(body).toEqual( {error: `Todo with id ${id} not found`} );
    })
})