import NoticiaMongo,{INoticiaMongo} from "../../../models/mongo/NoticiaMongo"

export default interface INoticiaMongoRepository{
    findAll() : Promise<INoticiaMongo[]>;
    findByAutor(autor: string) : Promise<INoticiaMongo[]>;
}