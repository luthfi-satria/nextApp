import * as fs from 'fs';
import { SERVERCONF } from '../data/constants';
import path, { resolve } from 'path';
import { rejects } from 'assert';

type FileUploaderConf = {
    dirPath: string,
    createDirIfNotExists: boolean,
    fileName: string,
    fileContent: any,
}

const initConf:FileUploaderConf = {
    dirPath: SERVERCONF.UPLOAD_PATH,
    createDirIfNotExists: true,
    fileName: '',
    fileContent: '',
}

export class FileUploader {
    protected config:FileUploaderConf;
    public results:any = {};

    constructor(defined:FileUploaderConf) {
        this.config = {
            ...initConf,
            ...defined,
            dirPath: initConf.dirPath + defined.dirPath,
        }
    }

    DirChecking = () => {
        console.log('# ========= DIR CHECKING =======', this.config.dirPath);
        if (!fs.existsSync(this.config.dirPath) && this.config.createDirIfNotExists) {
            fs.mkdirSync(this.config.dirPath, { recursive: true });
        }
    }

    WriteFile = () => {
        try{
            const filePath = this.config.dirPath + this.config.fileName;
            const fullPath = path.join(process.cwd(), filePath);
            console.log('# ========= WRITE FILE =======', filePath);
            fs.writeFile(fullPath, this.config.fileContent, (err) => {
                if(err) throw err;
            });
        }catch(err: any){
            console.log('# ========= WRITE FILE ERROR =======', err);
            return err;
        }

    }

    ReadFile = (filePath?: string) => new Promise((resolve, reject) => {
        const file = filePath ?? this.config.dirPath + this.config.fileName;
        console.log('# ========= READ FILE =======');
        fs.readFile(file, 'utf-8', (err, data) => {
            if(err){
                if(err.code == 'ENOENT'){
                    console.error("File is not found:", err.path);
                }else{
                    console.error('There something error occur when reading file', err);
                }
                return reject(err);
            }
            
            return resolve(data);
        });
    });
    /*
    ReadFile = (filePath?:string) => {
        try{
            return new Promise((resolve, reject) => {
                const file = filePath ?? this.config.dirPath + this.config.fileName;
                console.log('# ========= READ FILE =======', file);
                fs.readFile(file, 'utf-8', (err, data) => {
                    if(err){
                        if(err.code == 'ENOENT'){
                            console.error("File is not found:", err.path);
                        }else{
                            console.error('There something error occur when reading file', err);
                        }
                        return reject(err);
                    }
                    
                    this.results = data;
                    return resolve(this.results);
                });
            }) 
        }catch(err:any){
            console.log('# ========= READ FILE ERROR =======', err);
            return false;
        }
    }
    */

    UploadFile = () => {
        this.DirChecking();
        this.WriteFile();
    }
}