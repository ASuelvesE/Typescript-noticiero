import Noticia , {INoticia} from '../../../models/Noticia'
import IApiNoticiaMongoRepository from "./api.Inoticia.repository";


export default class ApiNoticiaMongoRepository implements IApiNoticiaMongoRepository {
    async findAll(): Promise<INoticia[]> {
        return Noticia.find({});
    }
    async findByIdNoticia(id: String): Promise<INoticia[]> {
        return Noticia.find({_id: id});
    }
    async findByIdPeriodista(id: String): Promise<INoticia[]> {
        return Noticia.find({periodistas:[{_id: id}]});
    }
    async save(noticia: INoticia): Promise<INoticia[]> {

        const newNoticia = new Noticia({
            titulo: noticia.titulo,
            texto: noticia.texto,
            periodistas: noticia.periodistas,
            recursos: noticia.recursos
        })
        newNoticia.save();
        return this.findAll();
    }
    async delete(id: String): Promise<INoticia[]> {
        throw new Error("Method not implemented.");
    } 
    
}