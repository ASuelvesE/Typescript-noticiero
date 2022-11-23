import Noticia,{INoticia} from "../../../models/Noticia"

export default interface INoticiaMongoRepository{
    findAll() : Promise<INoticia[]>;
    findByAutor(autor: string) : Promise<INoticia[]>;
}