import Noticia , {INoticia} from '../../../models/Noticia'
import IApiNoticiaMongoRepository from "./api.Inoticia.repository";


export default class ApiNoticiaMongoRepository implements IApiNoticiaMongoRepository {
    async findAll(): Promise<INoticia[]> {
        return Noticia.find({});
    }
    async findByIdNoticia(id: String): Promise<INoticia[]> {
        return Noticia.find({_id: id});
    }
    async findByIdPeriodista(id: number): Promise<INoticia[]> {
        return Noticia.find({periodistas: id});
    }
    async save(noticia: INoticia): Promise<INoticia[]> {
        const recursos:number[] = [];
        for(let recurso of noticia.recursos){
            recursos.push(recurso.id);
        }
        const newNoticia = new Noticia({
            titulo: noticia.titulo,
            texto: noticia.texto,
            periodistas: noticia.periodistas,
            recursos: recursos
        })
        await newNoticia.save();
        return await this.findAll();
    }
    async delete(id: String): Promise<INoticia[]> {
        const deleted: INoticia[] = await this.findByIdNoticia(id);
        await Noticia.deleteOne({_id: id});
        return deleted;
    } 
    
}