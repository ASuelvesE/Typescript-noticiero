import INoticia from "./Noticia";


export default class Periodista{

    id: number
    nombre: string
    fechaNacimiento: Date
    noticias: typeof INoticia[]

    constructor(id: number, nombre: string,fechaNacimiento: Date,noticias: typeof INoticia[]){
        this.id = id;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.noticias = noticias;
    }
}