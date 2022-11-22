import Noticia from "../../../models//mysql/Noticia";

export default interface INoticiasRepository{
    findAll() : Promise<Noticia[]>;
    findByAutor(autor: string) : Promise<Noticia[]>;
}