import Noticia,{INoticia} from "../../../models/Noticia";
import INoticiaMongoRepository from "./InoticiaMongo.repository";

export default class NoticiaMongoRepository implements INoticiaMongoRepository{
    async findAll(): Promise<INoticia[]> {
        return Noticia.find({});
    }
    async findByAutor(autor: string): Promise<INoticia[]> {
        return Noticia.find({periodistas: [{nombre: autor}]})
    }

}