import express, { Request, Response } from 'express'
import NoticiasRepositoryMySQL from '../repositories/noticias/noticias.repository.mysql'
import INoticiasRepository from '../repositories/noticias/noticias.repository'
import Noticia from '../models/Noticia'

const router = express.Router()

const INoticiasRepository = new NoticiasRepositoryMySQL()

router.get('/', async (req: Request, res: Response) => {
    try {       
        const noticias: string = await INoticiasRepository.findAll();
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
router.get('/:periodista', async (req: Request, res: Response) => {
    try {       
        const noticias: string = await INoticiasRepository.findByAutor(req.params.periodista)
        res.send(noticias)
    }
    catch (error) {
        res.send(error)
    }
})
export { router as routerNoticias};