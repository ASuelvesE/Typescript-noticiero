import express, { Request, Response } from 'express'
import { INoticia } from '../../models/Noticia';
import Noticia from '../../models/Noticia';
import Periodista from '../../models/Periodista';
import Recurso from '../../models/Recurso';
import ApiNoticiaMongoRepository from '../../repositories/api/noticias/api.noticia.repository.mongo';
import ApiPeriodistasRepositoryMySQL from '../../repositories/api/periodistas/api.periodistas.repositorymysql';
import ApiRecursosRepositoryMySQL from '../../repositories/api/recursos/api.recursos.repositorymysql';

const router = express.Router()

const ApinoticiasRepository = new ApiNoticiaMongoRepository();
const IApiPeriodistasRepository = new ApiPeriodistasRepositoryMySQL()
const ApiRecursosRepository = new ApiRecursosRepositoryMySQL()

router.get('/', async (req: Request, res: Response) => {
    try {       
        const allNoticias: INoticia[] = []
        const noticiasDB: any[] = await ApinoticiasRepository.findAll();

        for(let i = 0; i< noticiasDB.length; i++){ //Recorro las noticias de mongodb
            const noticiaDB = noticiasDB[i];

            const noticia : INoticia = {
                id: noticiaDB._id,
                titulo: noticiaDB.titulo,
                texto: noticiaDB.texto,
                periodistas: [],
                recursos: []
            }
            for(let k = 0; k< noticiaDB.periodistas.length; k++){ //Me traigo los periodistas
                let periodistas: Periodista[] = await IApiPeriodistasRepository.findById(noticiaDB.periodistas[k]);
                for(let j = 0; j< periodistas.length; j++){ 
                    noticia.periodistas.push(new Periodista(periodistas[j].id,periodistas[j].nombre,periodistas[j].fechaNacimiento,[]))
                }
            }    
            for(let n = 0; n< noticiaDB.recursos.length; n++){ //Me traigo los recursos
                let recursos: Recurso[] = await ApiRecursosRepository.findById(noticiaDB.recursos[n]);
                for(let j = 0; j< recursos.length; j++){ 
                    noticia.recursos.push(new Recurso(recursos[j].id,recursos[j].url));
                }
            }
           allNoticias.push(noticia);           
        }
       res.send(allNoticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/:id', async (req: Request, res: Response) => {
    try {       
        const allNoticias: INoticia[] = []
        const noticiasDB: any[] = await ApinoticiasRepository.findByIdNoticia(req.params.id);

        for(let i = 0; i< noticiasDB.length; i++){ //Recorro las noticias de mongodb
            const noticiaDB = noticiasDB[i];

            const noticia : INoticia = {
                id: noticiaDB._id,
                titulo: noticiaDB.titulo,
                texto: noticiaDB.texto,
                periodistas: [],
                recursos: []
            }
            for(let k = 0; k< noticiaDB.periodistas.length; k++){ //Me traigo los periodistas
                let periodistas: Periodista[] = await IApiPeriodistasRepository.findById(noticiaDB.periodistas[k]);
                for(let j = 0; j< periodistas.length; j++){ 
                    noticia.periodistas.push(new Periodista(periodistas[j].id,periodistas[j].nombre,periodistas[j].fechaNacimiento,[]))
                }
            }    
            for(let n = 0; n< noticiaDB.recursos.length; n++){ //Me traigo los recursos
                let recursos: Recurso[] = await ApiRecursosRepository.findById(noticiaDB.recursos[n]);
                for(let j = 0; j< recursos.length; j++){ 
                    noticia.recursos.push(new Recurso(recursos[j].id,recursos[j].url));
                }
            }
           allNoticias.push(noticia);           
        }
       res.send(allNoticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/periodista/:id', async (req: Request, res: Response) => {
    try {       
        const allNoticias: INoticia[] = []
        const noticiasDB: any[] = await ApinoticiasRepository.findByIdPeriodista(Number(req.params.id));

        for(let i = 0; i< noticiasDB.length; i++){ //Recorro las noticias de mongodb
            const noticiaDB = noticiasDB[i];

            const noticia : INoticia = {
                id: noticiaDB._id,
                titulo: noticiaDB.titulo,
                texto: noticiaDB.texto,
                periodistas: [],
                recursos: []
            }
            for(let n = 0; n< noticiaDB.recursos.length; n++){ //Me traigo los recursos
                let recursos: Recurso[] = await ApiRecursosRepository.findById(noticiaDB.recursos[n]);
                for(let j = 0; j< recursos.length; j++){ 
                    noticia.recursos.push(new Recurso(recursos[j].id,recursos[j].url));
                }
            }
            allNoticias.push(noticia);     
        }
        res.send(allNoticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.post('/', async (req: Request, res: Response) => {
    try {       
        const noticia : INoticia = {
            id: 0,
            titulo: req.body.titulo,
            texto: req.body.texto,
            periodistas: req.body.periodistas,
            recursos: []
        }
        for(let recurso of req.body.recursos){
            await ApiRecursosRepository.save(new Recurso(recurso.id,recurso.url)); //Guardo el recurso completo en mysql
            const recursos:Recurso[] = await ApiRecursosRepository.findByUrl(recurso.url); //Busco el Recurso con su ID por su url
            noticia.recursos.push(new Recurso(recursos[0].id,recursos[0].url)) //Introducto el recurso con su ID autogenerada
        }
        const noticias: INoticia[] = await ApinoticiasRepository.save(noticia)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: any[] = await ApinoticiasRepository.delete(req.params.id);
        for(let noticia of noticias){
            for(let recurso of noticia.recursos){
                await ApiRecursosRepository.delete(recurso)
            }
        }
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})

export { router as routerApiNoticias};