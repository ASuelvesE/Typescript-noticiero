
import { executeQuery } from '../../../db/mysql/mysql.connector'
import Recurso from '../../../models/Recurso'

import IApiRecursosRepository from './api.recursos.repository'


export default class ApiRecursosRepositoryMySQL implements IApiRecursosRepository {
 
    async findAll(): Promise<Recurso[]> {
        const sql: string = `select * 
        FROM periodistas`
        try {
            const data: Recurso[] = await executeQuery<Recurso[]>(sql)
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async findById(id: number): Promise<Recurso[]> {
        const sql: string = `select * 
        FROM recursos
        where id =${id}`
        try {
            const data: Recurso[] = await executeQuery<Recurso[]>(sql);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async findByUrl(url: string): Promise<Recurso[]> {
        const sql: string = `select * 
        FROM recursos
        where url ="${url}"`
        try {
            const data: Recurso[] = await executeQuery<Recurso[]>(sql);
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async save(recurso: Recurso): Promise<Recurso[]> {
        const sql: string = `insert into recursos (url) values("${recurso.url}")`
        try {
            await executeQuery<Recurso[]>(sql);
            return this.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async delete(id: number): Promise<Recurso[]> {
        const sql: string = `delete 
        FROM recursos
        where id =${id}`
        try {
            await executeQuery<Recurso[]>(sql);
            return this.findAll();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

}
