import { Router, Request, Response } from "express";

import ProductoModel from '../models/producto'; 
import CategoriaModel from '../models/categoria'; 

class Producto{


    router : Router; 


    constructor(){

        this.router= Router(); 
        this.exponerRutas(); 

    }


    async getProducto(req:Request, res:Response){
        try{

            let productoBD = await ProductoModel.find({}).sort('nombre'); 
            CategoriaModel.populate(productoBD,{path: "categoria", select: 'nombre'}); 
            let conteo = await ProductoModel.countDocuments(); 

            res.json({
                productosAlmacenados: productoBD, 
                conteoProductos: conteo
            }); 

        }catch(error){
            res.status(400).json({
                errorGenerado : error 
            }); 
            
        }; 
    }

    async getProductoId(req: Request, res: Response){
        try{
            let idurl = req.params.id; 
            let productoBD = await ProductoModel.findById(idurl); 

            res.json({
                ok: true, 
                productoGenerado: productoBD
            }); 
        }catch(error){
            res.status(400).json({
                errorGenerado : error 
            }); 
        }
    }

    async postProducto(req: Request, res: Response){

        try{

            let bodycabecera = req.body; 
            let producto = new ProductoModel(
                {
                    nombre: bodycabecera.nombre,
                    precioUnitario: bodycabecera.precioUnitario, 
                    descripcion: bodycabecera.descripcion,
                    categoria: bodycabecera.categoria

                });
                
            let productoBD = await producto.save();
            
            res.json({
                productoCreado: productoBD
            });

        }catch(error){
            res.status(400).json({
                errorGenerado : error 
            }); 
        }

    }

    putProducto(){

    }

    async deleteProducto(req: Request, res: Response){

        try{
            let idurl = req.params.id; 
            let productoBD = await ProductoModel.findByIdAndRemove(idurl); 

            res.json({
                productoEliminado: productoBD
            });


        }catch(error){
            res.status(400).json({
                errorGenerado : error 
            }); 
        }
    }




    exponerRutas(){
        this.router.get('/', this.getProducto); 
        this.router.get('/:id', this.getProductoId); 
        this.router.post('/', this.postProducto); 
        this.router.put('/', this.putProducto); 
        this.router.delete('/', this.deleteProducto); 
    }


}




const producto = new  Producto();

export default producto.router; 

