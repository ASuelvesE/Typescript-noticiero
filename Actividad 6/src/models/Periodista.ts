import Noticia from "./Noticia"
import Recurso from "./Recurso"

export default class Periodista{

    id: number
    nombre: string
    fechaNacimiento: Date
    noticias: Noticia[]

    constructor(id: number, nombre: string,fechaNacimiento: Date,noticias: Noticia[]){
        this.id = id;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.noticias = noticias;
    }
}