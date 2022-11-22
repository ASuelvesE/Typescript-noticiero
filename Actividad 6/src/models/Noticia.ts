
import { Schema, model} from 'mongoose';
import Periodista from './Periodista';
import Recurso from './Recurso';

interface INoticia {
    id: number
    titulo: string
    texto: string
    periodistas: Periodista[]
    recursos: Recurso []
}

// https://mongoosejs.com/docs/guide.html
const userSchema = new Schema<INoticia>({
    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    periodistas: [Number],
    recursos: [Number],
});

const Noticia = model<INoticia>('Noticia', userSchema);

export default Noticia;
export {INoticia};