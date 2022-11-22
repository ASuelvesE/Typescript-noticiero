
import { executeQuery } from '../../../db/mysql/mysql.connector'
import { SignJWT } from 'jose'
import * as jose from 'jose'

import IApiPeriodistasRepository from './api.periodistas.repository'
import Periodista from '../../../models//mysql/Periodista'
import Noticia from '../../../models//mysql/Noticia'

export default class ApiPeriodistasRepositoryMySQL implements IApiPeriodistasRepository {

    async findAll(): Promise<Periodista[]> {
        const sql: string = `select nombre,fechaNacimiento FROM periodistas`
        try {
            const data: Periodista[] = await executeQuery<Periodista[]>(sql)
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async findById(id: number): Promise<Periodista[]> {
        const sql: string = `select n.titulo,n.texto,p.nombre ,p.fechaNacimiento 
        FROM noticias n 
        join noticiasPeriodistas np on n.id = np.id_noticia  
        join periodistas p on p.id = np.id_periodista 
        where p.id ='${id}'`
        try {
            const data: any[] = await executeQuery<Periodista[]>(sql)
            const noticias : Noticia[] = [];
            data.forEach((element,index) =>{
                noticias.push(new Noticia(element.id,element.titulo,element.texto,[],[]))
            })
            return [new Periodista(0,data[0].nombre,data[0].fechaNacimiento,noticias)];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async save(periodista: Periodista): Promise<Periodista[]> {
        const sql: string = `insert into periodistas (nombre,fechaNacimiento) values('${periodista.nombre}','${periodista.fechaNacimiento}')`
        try {
            await executeQuery<Periodista[]>(sql)
            return [periodista];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async update(periodista: Periodista, id: number): Promise<Periodista[]> {
        const sql: string = `update periodistas set nombre= '${periodista.nombre}',fechaNacimiento= '${periodista.fechaNacimiento}' where id = ${id}`
        try {
            await executeQuery<Periodista[]>(sql)
            return [periodista];
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async delete(id: number): Promise<Periodista[]> {
        const sql: string = `delete FROM recursos r 
        WHERE r.id in (
            select nr.id_recurso 
            from noticiasRecursos nr 
            WHERE nr.id_noticia in (
                select n.id
                from noticias n 
                WHERE n.id in(
                    SELECT np.id_noticia 	
                    from noticiasPeriodistas np  
                    WHERE np.id_periodista = ${id}
                )
            )
        )`
        const sql2: string = `delete from noticias n 
        WHERE n.id in(
            SELECT np.id_noticia 	
            from noticiasPeriodistas np  
            WHERE np.id_periodista = ${id}
        )`
        const sql3: string = `delete from periodistas p WHERE p.id = ${id}`
        try {
            await executeQuery<Periodista[]>(sql)
            await executeQuery<Periodista[]>(sql2)
            await executeQuery<Periodista[]>(sql3)
            return this.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
