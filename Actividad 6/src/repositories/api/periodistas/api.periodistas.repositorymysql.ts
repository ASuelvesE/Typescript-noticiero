import Periodista from "./../../../models/Periodista"

export default interface IApiPeriodistasRepository{
    findAll() : Promise<Periodista[]>;
    findById(id:number) : Promise<Periodista[]>;
    save(periodista: Periodista) : void;
    update(periodista: Periodista) : Promise<Periodista[]>;
    delete(periodista: Periodista) : Promise<Periodista[]>;
}