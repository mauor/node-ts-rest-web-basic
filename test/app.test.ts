import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';

jest.mock('../src/presentation/server');

describe('app.ts', () => {

    test('should call server with arguments and start', async() => {
        
        await import('../src/app');

        expect(Server).toHaveBeenCalledTimes(1);
        expect(Server).toHaveBeenLastCalledWith({
            port: envs.PORT,
            publicPath: envs.PUBLIC_PATH,
            routes: expect.any(Function)
        });
        expect(Server.prototype.start).toHaveBeenCalledWith();

    });

})