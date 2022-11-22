
import { Schema, model} from 'mongoose';

interface INoticiaMongo {
    titulo: string
    texto: string
    periodistas: string[]
    recursos: string []
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
    periodistas: {
        type: [ 
            { 
                nombre: {
                    type: String,
                    required: true
                },
            }
        ],
        required: true
    },
    recursos: {
        type: [ 
            {  
                url: {
                    type: String,
                    required: true
                },
            }
        ],
        required: true
    }
});

const NoticiaMongo = model<INoticiaMongo>('NoticiaMongo', userSchema);

export default NoticiaMongo;
export {INoticiaMongo};