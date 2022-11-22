
import { executeQuery } from '../../../../db/mysql/mysql.connector'

import IApiNoticiasRepository from './api.noticias.repository'
import Noticia from '../../../../models/mysql/Noticia'
import Periodista from '../../../../models/mysql/Periodista'
import Recurso from '../../../../models/mysql/Recurso'

export default class ApiNoticiasRepositoryMySQL implements IApiNoticiasRepository {
    async findAll(): Promise<Noticia[]> {
        const sql:string = `select * from noticias n`
        try{
            const data: Noticia[] = await executeQuery<Noticia[]>(sql)
            return data;
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async findByIdNoticia(id: number): Promise<Noticia[]> {
        const sql:string = `select n.titulo,n.texto,r.* 
        from noticias n 
        join noticiasRecursos nr on nr.id_noticia = n.id 
        join recursos r on r.id = nr.id_recurso 
        where n.id = ${id} `
        const sql2: string = `select * from periodistas p 
        WHERE p.id in(
            SELECT np.id_periodista
            from noticiasPeriodistas np 
            WHERE np.id_noticia =${id}
        )`
        try{
            const noticiasData: any[] = await executeQuery<Noticia[]>(sql)
            const periodistasData: any[] = await executeQuery<Noticia[]>(sql2)

            const noticia: Noticia = new Noticia(id,noticiasData[0].titulo,noticiasData[0].texto,[],[])
            const periodistas: Periodista[] = []
            const recursos: Recurso[] = []

            periodistasData.forEach((element,index) =>{
                periodistas.push(new Periodista(element.id,element.nombre,element.fechaNacimiento,[]))
            })
            noticiasData.forEach((element,index) =>{
                recursos.push(new Recurso(element.id,element.url))
            })
            noticia.periodistas = periodistas;
            noticia.recursos = recursos;
            
            return [noticia];
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async findByIdPeriodista(id: number): Promise<Noticia[]> {
        const sql:string = `select n.titulo,n.texto,r.url 
        from noticias n 
        join noticiasRecursos nr on nr.id_noticia = n.id 
        join recursos r on r.id = nr.id_recurso 
        where n.id in (
            SELECT np.id_noticia 
            from noticiasPeriodistas np 
            WHERE np.id_periodista = ${id}
        )`
        try{
            const data: Noticia[] = await executeQuery<Noticia[]>(sql)
            return data;
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async save(noticia: Noticia): Promise<Noticia[]> {
        const sql:string = `insert into noticias (titulo,texto) values ('${noticia.titulo}','${noticia.texto}')`
        try{
            await executeQuery<Noticia[]>(sql)
            noticia.recursos.forEach(async (recurso) => {
                const sql2:string = `insert into recursos (url) values ('${recurso.url}')`
                await executeQuery<Noticia[]>(sql2)
                const sql3:string = `insert into noticiasRecursos values ((select id from noticias where titulo = '${noticia.titulo}' order by id desc limit 1),(select id from recursos where url = '${recurso.url}' order by id desc limit 1))`
                await executeQuery<Noticia[]>(sql3)
            });
            noticia.periodistas.forEach(async (periodista) => {
                const sql4:string = `insert into noticiasPeriodistas values ((select id from noticias where titulo = '${noticia.titulo}' order by id desc limit 1),${periodista.id})`
                await executeQuery<Noticia[]>(sql4)
            });
            return this.findAll();
        }catch(error){
            console.error(error);
            return [];
        }
    }
    async delete(id: number): Promise<Noticia[]> {
        const sql:string = `delete FROM recursos r 
        WHERE r.id in (
            select nr.id_recurso 
            from noticiasRecursos nr 
            WHERE nr.id_noticia = ${id}
        )`
        const sql2:string = `delete from noticias n WHERE n.id = ${id}`
        try{
            await executeQuery<Noticia[]>(sql)
            await executeQuery<Noticia[]>(sql2)
            return this.findAll();
        }catch(error){
            console.error(error);
            return [];
        }
    }

}

