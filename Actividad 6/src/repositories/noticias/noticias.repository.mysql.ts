
import { executeQuery } from '../../db/mysql/mysql.connector'
import { SignJWT } from 'jose'
import * as jose from 'jose'
import INoticiasRepository from './noticias.repository'
import Noticia from '../../models/Noticia'
import Periodista from '../../models/Periodista'
import {montaHtmlNoticias} from '../../utils/plantillas'

export default class NoticiasRepositoryMySQL implements INoticiasRepository {
    async findAll(): Promise<string> {
        const sql:string = `select n.titulo,n.texto,r.url FROM  noticias n
                            join noticiasRecursos nr on n.id = nr.id_noticia 
                            join recursos r on r.id = nr.id_noticia`

        try{
            const data: Noticia[] = await executeQuery<Noticia[]>(sql)
            console.log(data)
            return montaHtmlNoticias(data);
        }catch(error){
            console.error(error);
            return '';
        }
    }
    async findByAutor(autor: string): Promise<string> {
        const sql:string = `select n.titulo,n.texto,r.url
        FROM  noticias n
        join noticiasRecursos nr on n.id = nr.id_noticia 
        join recursos r on r.id = nr.id_noticia 
        WHERE n.id in( 
            select id_noticia
            from noticiasPeriodistas np 
            WHERE id_periodista in(
                select id 
                from periodistas p 
                WHERE nombre = '${autor}'
            )
        ) `
        try{
            const data: Noticia[] = await executeQuery<Noticia[]>(sql)
            return montaHtmlNoticias(data);
        }catch(error){
            console.error(error);
            return '';
        }
    }
}

