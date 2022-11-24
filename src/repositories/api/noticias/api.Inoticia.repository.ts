import Noticia , {INoticia} from '../../../models/Noticia'

export default interface IApiNoticiaMongoRepository {
    findAll() : Promise<INoticia[]>;
    findByIdNoticia(id:String) : Promise<INoticia[]>;
    findByIdPeriodista(id:number) : Promise<INoticia[]>;
    save(noticia: INoticia) : Promise<INoticia[]>;
    delete(id: String) : Promise<INoticia[]>;
}