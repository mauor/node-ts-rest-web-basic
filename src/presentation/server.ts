import express from 'express';
import path from 'path';

interface Options{
    port: number;
    publicPath: string;
}

export class Server{

    private app = express();
    private readonly  port: number;
    private readonly  publicPath: string;

    constructor(options: Options) {
        this.port = options.port;
        this.publicPath = options.publicPath;
    }

    //middelwares

    //Public folder
    
    async start() {
        this.app.use(express.static( this.publicPath ));

        this.app.get('*', (req, res) => {
                const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
                res.sendFile(indexPath);
                return
        })
        
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        })
    }

}