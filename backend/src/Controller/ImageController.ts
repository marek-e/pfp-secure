import { Response, Request } from 'express'
import { exec } from 'child_process';
import fs from 'fs';

class TreeNode {
    public path: string;
    public children: Array<TreeNode>;

    constructor(path: string) {
        this.path = path;
        this.children = [];
    }
}

function buildTree(rootPath: string) {
    const root = new TreeNode(rootPath);

    const stack = [root];

    while (stack.length) {
        const currentNode = stack.pop();

        if (currentNode) {
            const children = fs.readdirSync(currentNode.path);

            for (let child of children) {
                const childPath = `${currentNode.path}/${child}`;
                const childNode = new TreeNode(childPath);
                currentNode.children.push(childNode);

                if (fs.statSync(childNode.path).isDirectory()) {
                    stack.push(childNode);
                }
            }
        }
    }

    return root;
}

export const postImage = async(req: Request, res: Response) => {
    console.log(req);
    console.log(req.file);
    res.json(req.file);
}

export const getRoot = async(req: Request, res: Response) => {
    try{
        res.send(buildTree('home')).status(200)
    }catch(err){
        console.log(err);
        res.send(err).status(500)
    }
}

export const getImage = async(req: Request, res: Response) => {
    console.log('=============================================');

    let fileName = req.params.id;
    console.log(fileName);
    exec('pwd',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
    fs.readFile(`home/uploads/${fileName}`, (err, data) => {
        if(err){
            console.log(err);
        }
        console.log(data.toString());
        // res.send(data.toString());
        
    })
    // res.send(`/Users/mareke/Documents/Projects/pfp-secure/backend/home/uploads/${fileName}`)
    // res.json(`/Users/mareke/Documents/Projects/pfp-secure/backend/home/uploads/${fileName}`)
    res.download(`/Users/mareke/Documents/Projects/pfp-secure/backend/home/uploads/${fileName}`)
    // res.end(`/Users/mareke/Documents/Projects/pfp-secure/backend/home/uploads/${fileName}`)
    // fs.exists('C://UserPicture/'+fileName, (exists:boolean) => {
    //     if(exists){
    //         fs.readFile('C://UserPicture/' + fileName, (err ,data) =>{
    //             try{
    //                 res.end(data)
    //             }catch{
    //                 console.log(err);
    //             }
    //         });
    //     }else{
    //         fs.readFile('C://NoImage/noimage.jpg', (err ,data) =>{
    //             try{
    //                 console.log('asdf');
                    
    //                 res.end(data)
    //             }catch{
    //                 console.log(err);
    //             }
    //         });
    //     }
    // });
    console.log('=============================================');
}

export const test = async(req: Request, res: Response) => {
    res.send('test')
}