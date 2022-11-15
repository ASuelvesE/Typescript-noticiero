import Noticia from "../../models/Noticia";
import Periodista from "../../models/Periodista";

export default interface INoticiasRepository{
    findAll() : Promise<Noticia[]>;
    findByAutor(autor: string) : Promise<Noticia[]>;
}