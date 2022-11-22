import express, { Request, Response } from 'express'
import NoticiaMongoRepository from '../repositories/noticias/mongo/noticiaMongoRepository'
import NoticiaMongo, { INoticiaMongo } from '../models/mongo/NoticiaMongo'

const router = express.Router()


const noticiasRepository = new NoticiaMongoRepository()

router.get('/', async (req: Request, res: Response) => {
    try {       
        const noticias : INoticiaMongo[] = await noticiasRepository.findAll();
        res.render('pages/noticias', {
            noticias
        });
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/:periodista', async (req: Request, res: Response) => {
    try {       
        const noticias : INoticiaMongo[] = await noticiasRepository.findByAutor(req.params.periodista)
        res.render('pages/noticias', {
            noticias: noticias
        });
    }
    catch (error) {
        res.send(error)
    }
})
export { router as routerNoticias};