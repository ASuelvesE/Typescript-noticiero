import Periodista from "../../../models/Periodista"

export default interface IApiPeriodistasRepository{
    findAll() : Promise<Periodista[]>;
    findById(id:number) : Promise<Periodista[]>;
    save(periodista: Periodista) : Promise<Periodista[]>;
    update(periodista: Periodista,id: number) : Promise<Periodista[]>;
    delete(id: number) : Promise<Periodista[]>;
}