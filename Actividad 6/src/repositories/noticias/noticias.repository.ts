import Noticia from "../../models/Noticia";
import Periodista from "../../models/Periodista";

export default interface INoticiasRepository{
    findAll() : Promise<string>;
    findByAutor(autor: string) : Promise<string>;
}