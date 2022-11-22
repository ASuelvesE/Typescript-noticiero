import Periodista from "./Periodista"
import Recurso from "./Recurso"

export default class Noticia{

    id: number
    titulo: string
    texto: string
    periodistas: Periodista[]
    recursos: Recurso []

    constructor(id: number, titulo: string, texto: string,periodistas: Periodista[],recursos: Recurso []){
        this.id = id;
        this.titulo = titulo;
        this.texto = texto;
        this.periodistas = periodistas;
        this.recursos = recursos;
    }
}