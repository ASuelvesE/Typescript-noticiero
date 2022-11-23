import Recurso from "../../../models/Recurso"

export default interface IApiRecursosRepository{
    findAll() : Promise<Recurso[]>;
    findById(id:number) : Promise<Recurso[]>;
    save(periodista: Recurso) : Promise<Recurso[]>;
    update(periodista: Recurso,id: number) : Promise<Recurso[]>;
    delete(id: number) : Promise<Recurso[]>;
}