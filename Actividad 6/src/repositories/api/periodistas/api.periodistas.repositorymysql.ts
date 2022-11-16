
import { executeQuery } from '../../../db/mysql/mysql.connector'
import { SignJWT } from 'jose'
import * as jose from 'jose'

import IApiPeriodistasRepository from './api.periodistas.repository'
import Periodista from '../../../models/Periodista'

export default class ApiPeriodistasRepositoryMySQL implements IApiPeriodistasRepository {
 
    async findAll(): Promise<Periodista[]> {
        const sql:string = `select nombre,fechaNacimiento FROM periodistas`
        try{
            const data: Periodista[] = await executeQuery<Periodista[]>(sql)
            return data;
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async findById(id: number): Promise<Periodista[]> {
        const sql:string = `select n.titulo,n.texto,p.nombre ,p.fechaNacimiento 
        FROM noticias n 
        join noticiasPeriodistas np on n.id = np.id_noticia  
        join periodistas p on p.id = np.id_periodista 
        where p.id ='${id}'`
        try{
            const data: Periodista[] = await executeQuery<Periodista[]>(sql)
            return data;
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async save(periodista: Periodista): Promise<Periodista[]> {
        const sql:string = `insert into periodistas (nombre,fechaNacimiento) values('${periodista.nombre}','${periodista.fechaNacimiento}')`
        try{
            await executeQuery<Periodista[]>(sql)
            return [periodista];
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async update(periodista: Periodista, id:number): Promise<Periodista[]> {
        const sql:string = `update periodistas set nombre= '${periodista.nombre}',fechaNacimiento= '${periodista.fechaNacimiento}' where id = ${id}`
        try{
            await executeQuery<Periodista[]>(sql)
            return [periodista];
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async delete(id: number): Promise<Periodista[]> {
        const sql:string = `delete from periodistas where id = ${id}`
        try{
            await executeQuery<Periodista[]>(sql)
            return this.findAll();
        }catch(error){
            console.error(error);
            return [];
        }
    }
}
