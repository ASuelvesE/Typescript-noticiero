
import { Schema, model} from 'mongoose';
import Periodista from '../mysql/Periodista';
import Recurso from '../mysql/Recurso';

interface INoticiaMongo {
    titulo: string
    texto: string
    periodistas: number[]
    recursos: number []
}

// https://mongoosejs.com/docs/guide.html
const userSchema = new Schema<INoticiaMongo>({
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

const NoticiaMongo = model<INoticiaMongo>('NoticiaMongo', userSchema);

export default NoticiaMongo;
export {INoticiaMongo};