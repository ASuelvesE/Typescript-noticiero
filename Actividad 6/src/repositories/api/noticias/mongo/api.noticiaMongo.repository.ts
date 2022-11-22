import NoticiaMongo, { INoticiaMongo } from "../../../../models/mongo/NoticiaMongo";
import IApiINoticiaMongoRepository from "./api.InoticiaMongo.repository";



export default class ApiNoticiaMongoRepository implements IApiINoticiaMongoRepository {
    async findAll(): Promise<INoticiaMongo[]> {
        return NoticiaMongo.find({});
    }
    async findByIdNoticia(id: String): Promise<INoticiaMongo[]> {
        return NoticiaMongo.find({_id: id});
    }
    async findByIdPeriodista(id: String): Promise<INoticiaMongo[]> {
        return NoticiaMongo.find({periodistas:[{_id: id}]});
    }
    async save(noticia: INoticiaMongo): Promise<INoticiaMongo[]> {

        const newNoticia = new NoticiaMongo({
            titulo: noticia.titulo,
            texto: noticia.texto,
            periodistas: noticia.periodistas,
            recursos: noticia.recursos
        })
        newNoticia.save();
        return this.findAll();
    }
    async delete(id: String): Promise<INoticiaMongo[]> {
        throw new Error("Method not implemented.");
    } 
    
}