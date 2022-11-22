import express, { Request, Response } from 'express'
import { INoticiaMongo } from '../../models/mongo/NoticiaMongo';
import ApiNoticiaMongoRepository from '../../repositories/api/noticias/mongo/api.noticiaMongo.repository';

const router = express.Router()

const ApinoticiasRepository = new ApiNoticiaMongoRepository();

router.get('/', async (req: Request, res: Response) => {
    try {       
        const noticias: INoticiaMongo[] = await ApinoticiasRepository.findAll();
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