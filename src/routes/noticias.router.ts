import express, { Request, Response } from 'express'
import ApiNoticiaMongoRepository from '../repositories/api/noticias/api.noticia.repository.mongo'
import Noticia, { INoticia } from '../models/Noticia'
import ApiPeriodistasRepositoryMySQL from '../repositories/api/periodistas/api.periodistas.repositorymysql'
import ApiRecursosRepositoryMySQL from '../repositories/api/recursos/api.recursos.repositorymysql'
import Recurso from '../models/Recurso'
import Periodista from '../models/Periodista'

const router = express.Router()


const noticiasRepository = new ApiNoticiaMongoRepository()
const IApiPeriodistasRepository = new ApiPeriodistasRepositoryMySQL()
const ApiRecursosRepository = new ApiRecursosRepositoryMySQL()

router.get('/', async (req: Request, res: Response) => {
    try {
        const noticiasDB: any[] = await noticiasRepository.findAll();
        const noticias: INoticia[] = [];
        for (let noticiaDB of noticiasDB) {
            const noticia: INoticia = {
                id: noticiaDB._id,
                titulo: noticiaDB.titulo,
                texto: noticiaDB.texto,
                periodistas: [],
                recursos: []
            }
            for (let recurso of noticiaDB.recursos) {
                const recursos: Recurso[] = await ApiRecursosRepository.findById(Number(recurso))
                for (let recurso of recursos) {

                    noticia.recursos.push(new Recurso(recurso.id, recurso.url))
                }
            }
            for (let periodista of noticiaDB.periodistas) {
                const periodistas: Periodista[] = await IApiPeriodistasRepository.findById(Number(periodista))
                for (let periodista of periodistas) {
                    const nuevo: Periodista = new Periodista(0,periodista.nombre,periodista.fechaNacimiento,undefined)
                   noticia.periodistas.push(nuevo)
                }
            }
            noticias.push(noticia)
        }
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
        const noticiasDB: any[] = await noticiasRepository.findByIdPeriodista(Number(req.params.periodista))
        const noticias: INoticia[] = [];
        for (let noticiaDB of noticiasDB) {
            const noticia: INoticia = {
                id: noticiaDB._id,
                titulo: noticiaDB.titulo,
                texto: noticiaDB.texto,
                periodistas: [],
                recursos: []
            }
            for (let recurso of noticiaDB.recursos) {
                const recursos: Recurso[] = await ApiRecursosRepository.findById(Number(recurso))
                for (let recurso of recursos) {

                    noticia.recursos.push(new Recurso(recurso.id, recurso.url))
                }
            }
            for (let periodista of noticiaDB.periodistas) {
                const periodistas: Periodista[] = await IApiPeriodistasRepository.findById(Number(periodista))
                for (let periodista of periodistas) {
                    const nuevo: Periodista = new Periodista(0,periodista.nombre,periodista.fechaNacimiento,undefined)
                   noticia.periodistas.push(nuevo)
                }
            }
            noticias.push(noticia)
        }
        res.render('pages/noticiasPeriodista', {
            noticias
        })
    }
    catch (error) {
        res.send(error)
    }
})
export { router as routerNoticias };