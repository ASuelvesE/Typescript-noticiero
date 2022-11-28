import Noticia, {INoticia} from "./Noticia";


export default class Periodista{

    id: number
    nombre: string
    fechaNacimiento: Date
    noticias: INoticia[] | undefined

    constructor(id: number, nombre: string,fechaNacimiento: Date,noticias: INoticia[] | undefined){
        this.id = id;
        this.nombre = nombre;
        this.fechaNacimiento = fechaNacimiento;
        this.noticias = noticias;
    }
}