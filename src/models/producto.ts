import {Schema, model } from 'mongoose'; 
let productoSchema = new Schema({

    nombre :{
        type: String, required:[true, 'El nobre es requerido']
    } , 
    precioUnitario:{
        type: Number, required:[true, 'El precio es requerido']
    },
    descripcion: {
        type: String, required:[false]
    },
    disponible: {
        type:Boolean, required:true, default:true
    },
    categoria: {
        type:Schema.Types.ObjectId, required:true, ref: 'Categoria'
    }



});

//para que pueda ser consumido donde sea 
export default model('Producto', productoSchema); 

