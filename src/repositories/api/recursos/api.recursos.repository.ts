import Recurso from "../../../models/Recurso"

export default interface IApiRecursosRepository{
    findAll() : Promise<Recurso[]>;
    findById(id:number) : Promise<Recurso[]>;
    findByUrl(url:string) : Promise<Recurso[]>;
    save(periodista: Recurso) : Promise<Recurso[]>;
    delete(id: number) : Promise<Recurso[]>;
}