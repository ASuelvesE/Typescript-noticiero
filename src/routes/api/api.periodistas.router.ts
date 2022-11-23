import express, { Request, Response } from 'express'
import ApiPeriodistasRepositoryMySQL from '../../repositories/api/periodistas/api.periodistas.repositorymysql'
import IApiPeriodistasRepository from '../../repositories/api/periodistas/api.periodistas.repository'
import Periodista from '../../models/Periodista'


const router = express.Router()

const IApiPeriodistasRepository = new ApiPeriodistasRepositoryMySQL()

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
        res.send(periodistas)
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
        const periodistas: Periodista[] = await IApiPeriodistasRepository.delete(Number(req.params.id))
        res.send(periodistas)
    }
    catch (error) {
        res.send(error)
    }
})
export { router as routerApiPeriodistas};