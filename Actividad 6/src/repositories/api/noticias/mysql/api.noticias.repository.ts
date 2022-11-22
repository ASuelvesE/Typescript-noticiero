import Noticia from "../../../../models/mysql/Noticia";

export default interface IApiNoticiasRepository{
    findAll() : Promise<Noticia[]>;
    findByIdNoticia(id:number) : Promise<Noticia[]>;
    findByIdPeriodista(id:number) : Promise<Noticia[]>;
    save(noticia: Noticia) : Promise<Noticia[]>;
    delete(id: number) : Promise<Noticia[]>;
}