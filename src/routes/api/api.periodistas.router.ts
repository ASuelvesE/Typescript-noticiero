import express, { Request, Response } from 'express'
import ApiPeriodistasRepositoryMySQL from '../../repositories/api/periodistas/api.periodistas.repositorymysql'
import IApiPeriodistasRepository from '../../repositories/api/periodistas/api.periodistas.repository'
import ApiNoticiaMongoRepository from '../../repositories/api/noticias/api.noticia.repository.mongo'
import Periodista from '../../models/Periodista'
import ApiRecursosRepositoryMySQL from '../../repositories/api/recursos/api.recursos.repositorymysql'
import { INoticia } from '../../models/Noticia'

const router = express.Router()

const IApiPeriodistasRepository = new ApiPeriodistasRepositoryMySQL()
const ApinoticiasRepository = new ApiNoticiaMongoRepository();
const ApiRecursosRepository = new ApiRecursosRepositoryMySQL();

router.get('/', async (req: Request, res: Response) => {
    try {       
        const periodistas: Periodista[] = await IApiPeriodistasRepository.findAll();
        res.send(periodistas)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/:id', async (req: Request, res: Response) => {
    try {       
        const periodistas: Periodista[] = await IApiPeriodistasRepository.findById(Number(req.params.id))
        const noticias: any[] = await ApinoticiasRepository.findByIdPeriodista(periodistas[0].id);
        periodistas[0].noticias = noticias;
        res.send(periodistas[0])
    }
    catch (error) {
        res.send(error)
    }
})
router.post('/', async (req: Request, res: Response) => {
    try {       
        const periodistas: Periodista[] = await IApiPeriodistasRepository.save(req.body)
        res.send(periodistas)
    }
    catch (error) {
        res.send(error)
    }
})
router.put('/:id', async (req: Request, res: Response) => {
    try {       
        const periodistas: Periodista[] = await IApiPeriodistasRepository.update(req.body,Number(req.params.id))
        res.send(periodistas)
    }
    catch (error) {
        res.send(error)
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    try {       
        await IApiPeriodistasRepository.delete(Number(req.params.id))
        const noticiasPeriodistaDB: any[] = await ApinoticiasRepository.findByIdPeriodista(Number(req.params.id))

        for(let noticiaPeriodistaDB of noticiasPeriodistaDB){
            const noticia: INoticia = noticiaPeriodistaDB;

            for(let recurso of noticia.recursos){
                await ApiRecursosRepository.delete(Number(recurso));
            }
            await ApinoticiasRepository.delete(String(noticia.id));
        }
        const periodistas: Periodista[] = await IApiPeriodistasRepository.findAll();
        res.send(periodistas)
    }
    catch (error) {
        res.send(error)
    }
})
export { router as routerApiPeriodistas};