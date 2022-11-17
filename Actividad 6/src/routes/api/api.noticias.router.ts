import express, { Request, Response } from 'express'
import Noticia from '../../models/Noticia';
import IApiNoticiasRepository from '../../repositories/api/noticias/api.noticias.repository';
import ApiNoticiasRepositoryMySQL from '../../repositories/api/noticias/api.noticias.repository.mysql';

const router = express.Router()

const IApiNoticiasRepository = new ApiNoticiasRepositoryMySQL();

router.get('/', async (req: Request, res: Response) => {
    try {       
        const noticias: Noticia[] = await IApiNoticiasRepository.findAll();
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: Noticia[] = await IApiNoticiasRepository.findByIdNoticia(Number(req.params.id))
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/periodista/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: Noticia[] = await IApiNoticiasRepository.findByIdPeriodista(Number(req.params.id))
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.post('/', async (req: Request, res: Response) => {
    try {       
        const noticias: Noticia[] = await IApiNoticiasRepository.save(req.body)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.delete('/:id', async (req: Request, res: Response) => {
    try {       
        const noticias: Noticia[] = await IApiNoticiasRepository.delete(Number(req.params.id))
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})


export { router as routerApiNoticias};