import { Component, OnInit } from '@angular/core';
import { ConexMarcaService,Marca } from 'src/app/services/conexiones/conex-marca/conex-marca.service';
import { ConexProductosService, Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  detalle:any={};
  
  cargar:any={
    
      pk_id_producto:0,
      codigo_producto:'', 
      img:'', 
      nombre_producto:'', 
      descripcion:'',
      fk_marca:'',
      modelo:'',
      genero:'',
      talla:'',
      costo:'',
      oferta:'',
      fk_nombre_categoria:''
    
    
  };



  ListaMarca:Marca[]=[];

  modal_admin:boolean  = false;

  constructor(private ConexProdcutoService:ConexProductosService, private ConexMarca:ConexMarcaService) {
    
    this.ConexProdcutoService.disparadorDetalle.subscribe(data=>{
      this.ConexProdcutoService.getUnProducto(data).subscribe(
       res=>{
               
         this.cargar=<any>res;               
       },
       err => console.log('Hola')
      );
 
    })


   }

  ngOnInit(): void {
    this.listarMarcas();
  }
  /*
  listarMarcas()
  {
  console.log("Servicio Componente Modificar");
  this.ConexMarca.getMarcas().subscribe(
    res=>{
     
      this.ListaMarca=<any>res;
           
    },
    err => console.log(err)  
  );
  } */
  async listarMarcas() {
    console.log("Servicio Modificar PRODUCTOS TABLAS");
    try {
      const response =  await this.ConexProdcutoService.getProdcuto().subscribe();
      this.ListaMarca = <any> response;
    } catch (error) {
      console.log(error);
    }
  }
}
