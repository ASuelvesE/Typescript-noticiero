
import { executeQuery } from '../../../db/mysql/mysql.connector'
import INoticiasRepository from './noticias.repository'
import Noticia from '../../../models/mysql/Noticia'
import Recurso from '../../../models/mysql/Recurso'

export default class NoticiasRepositoryMySQL implements INoticiasRepository {
    async findAll(): Promise<Noticia[]> {
        const sql:string = `select n.* FROM  noticias n`
        try{
            const noticiasData: any[] = await executeQuery<any[]>(sql)
            const noticias: Noticia [] = []

            for(let i = 0; i < noticiasData.length; i++){
                const sql2:string = `select r.*
                from recursos r 
                WHERE id in( 
                    select id_recurso
                    from noticiasRecursos nr 
                    WHERE id_noticia = ${noticiasData[i].id} order by id desc
                )`
                const recursosData: any[] = await executeQuery<any[]>(sql2)
                const recursos: Recurso [] = []
                for(let k = 0; k < recursosData.length; k++){
                    recursos.push(new Recurso(recursosData[k].id,recursosData[k].url))
                }
                noticias.push(new Noticia(noticiasData[i].id,noticiasData[i].titulo,noticiasData[i].texto,[],recursos))
            }
            //console.log(noticias)
            return noticias;

        }catch(error){
            console.error(error);
            return [];
        }
    }
    async findByAutor(autor: string): Promise<Noticia[]> {

        const sql:string = `select n.* FROM  noticias n
                            join noticiasPeriodistas np on np.id_noticia = n.id
                            where np.id_periodista in (
                                select id
                                from periodistas
                                where nombre = '${autor}'
                            )`
        try{
            const noticiasData: any[] = await executeQuery<any[]>(sql)
            const noticias: Noticia [] = []

            for(let i = 0; i < noticiasData.length; i++){
                const sql2:string = `select r.*
                from recursos r 
                WHERE id in( 
                    select id_recurso
                    from noticiasRecursos nr 
                    WHERE id_noticia = ${noticiasData[i].id} order by id desc
                )`
                const recursosData: any[] = await executeQuery<any[]>(sql2)
                const recursos: Recurso [] = []
                for(let k = 0; k < recursosData.length; k++){
                    recursos.push(new Recurso(recursosData[k].id,recursosData[k].url))
                }
                noticias.push(new Noticia(noticiasData[i].id,noticiasData[i].titulo,noticiasData[i].texto,[],recursos))
            }
            return noticias;

        }catch(error){
            console.error(error);
            return [];
        }
    }
}

