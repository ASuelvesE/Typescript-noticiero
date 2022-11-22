import NoticiaMongo,{INoticiaMongo} from "../../../models/mongo/NoticiaMongo";
import INoticiaMongoRepository from "./InoticiaMongo.repository";

export default class NoticiaMongoRepository implements INoticiaMongoRepository{
    async findAll(): Promise<INoticiaMongo[]> {
        return NoticiaMongo.find({});
    }
    async findByAutor(autor: string): Promise<INoticiaMongo[]> {
        return NoticiaMongo.find({periodistas: [{nombre: autor}]})
    }

}