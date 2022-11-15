
import { executeQuery } from '../../db/mysql/mysql.connector'
import { SignJWT } from 'jose'
import * as jose from 'jose'
import INoticiasRepository from './noticias.repository'
import Noticia from '../../models/Noticia'
import Periodista from '../../models/Periodista'

export default class NoticiasRepositoryMySQL implements INoticiasRepository {
    async findAll(): Promise<Noticia[]> {
        const sql:string = `select n.titulo,n.texto FROM  noticias n`
        const sql2 = `select n.*,nr.id_noticia,r.url 
        from noticias n
        join noticiasRecursos nr on n.id = nr.id_noticia 
        join recursos r on r.id = nr.id_noticia `
        try{
            const data: Noticia[] = await executeQuery<Noticia[]>(sql)
            return data;
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async findByAutor(autor: string): Promise<Noticia[]> {
        const sql:string = `select n.titulo,n.texto
        FROM  noticias n 
        WHERE id in( 
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
            return data;
        }catch(error){
            console.error(error);
            return [];
        }
    }
}

