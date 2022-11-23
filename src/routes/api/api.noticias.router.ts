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
        const noticiasDB: any[] = await ApinoticiasRepository.findByIdPeriodista(req.params.id);

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
        const noticias: INoticia[] = await ApinoticiasRepository.save(req.body)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: any[] = await ApinoticiasRepository.delete(req.params.id);
        for(let i = 0; i<noticias[0].recursos.length; i++){
            ApiRecursosRepository.delete(noticias[0].recursos[i])
        }
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})

export { router as routerApiNoticias};