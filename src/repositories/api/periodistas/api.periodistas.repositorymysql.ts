
import { executeQuery } from '../../../db/mysql/mysql.connector'

import IApiPeriodistasRepository from './api.periodistas.repository'
import Periodista from '../../../models/Periodista'
import Noticia from '../../../models/Noticia'

export default class ApiPeriodistasRepositoryMySQL implements IApiPeriodistasRepository {


    async findAll(): Promise<Periodista[]> {
        const sql: string = `select * FROM periodistas`
        try {
            const data: Periodista[] = await executeQuery<Periodista[]>(sql)
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async findById(id: number): Promise<Periodista[]> {
        const sql: string = `select * 
        FROM periodistas
        where id ='${id}'`
        try {
            const data: Periodista[] = await executeQuery<Periodista[]>(sql)
            return data;
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
        const sql: string = `delete from periodistas p WHERE p.id = ${id}`
        try {
            await executeQuery<Periodista[]>(sql)
            return this.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}
