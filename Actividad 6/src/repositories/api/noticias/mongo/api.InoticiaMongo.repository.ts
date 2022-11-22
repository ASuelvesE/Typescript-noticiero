import NoticiaMongo , {INoticiaMongo} from '../../../../models/mongo/NoticiaMongo'

export default interface IApiINoticiaMongoRepository {
    findAll() : Promise<INoticiaMongo[]>;
    findByIdNoticia(id:String) : Promise<INoticiaMongo[]>;
    findByIdPeriodista(id:String) : Promise<INoticiaMongo[]>;
    save(noticia: INoticiaMongo) : Promise<INoticiaMongo[]>;
    delete(id: String) : Promise<INoticiaMongo[]>;
}