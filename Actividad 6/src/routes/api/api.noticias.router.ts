import express, { Request, Response } from 'express'
import { INoticiaMongo } from '../../models/mongo/NoticiaMongo';
import Noticia from '../../models/mysql/Noticia';
import Periodista from '../../models/mysql/Periodista';
import Recurso from '../../models/mysql/Recurso';
import ApiNoticiaMongoRepository from '../../repositories/api/noticias/mongo/api.noticiaMongo.repository';
import ApiPeriodistasRepositoryMySQL from '../../repositories/api/periodistas/api.periodistas.repositorymysql';

const router = express.Router()

const ApinoticiasRepository = new ApiNoticiaMongoRepository();
const IApiPeriodistasRepository = new ApiPeriodistasRepositoryMySQL()

router.get('/', async (req: Request, res: Response) => {
    try {       
        const allNoticias: Noticia[] = []
        const noticias: INoticiaMongo[] = await ApinoticiasRepository.findAll();
        let periodistas: Periodista[] = [];
        let recursos: Recurso[] = [];
        for(let i = 0; i< noticias.length; i++){
            const noticia = noticias[i];

            for(let k = 0; k< noticia.periodistas.length; k++){
                periodistas = await IApiPeriodistasRepository.findById(noticia.periodistas[k]);
            }
            allNoticias.push(new Noticia(0,noticia.titulo,noticia.texto,periodistas,noticia.recursos))
        }
       res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: INoticiaMongo[] = await ApinoticiasRepository.findByIdNoticia(req.params.id)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/periodista/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: INoticiaMongo[] = await ApinoticiasRepository.findByIdPeriodista(req.params.id)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.post('/', async (req: Request, res: Response) => {
    try {       
        const noticias: INoticiaMongo[] = await ApinoticiasRepository.save(req.body)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: INoticiaMongo[] = await ApinoticiasRepository.delete(req.params.id)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})


export { router as routerApiNoticias};