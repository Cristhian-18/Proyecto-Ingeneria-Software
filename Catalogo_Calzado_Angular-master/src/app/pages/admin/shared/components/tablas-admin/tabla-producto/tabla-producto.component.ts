import { Component, OnInit,Input  } from '@angular/core';
import { ConexProductosService,Producto} from 'src/app/services/conexiones/conex-productos/conex-productos.service';

@Component({
  selector: 'app-tabla-producto',
  templateUrl: './tabla-producto.component.html',
  styleUrls: ['./tabla-producto.component.css']
})
export class TablaProductoComponent implements OnInit {

  @Input() dataEntrante:any;
  @Input() dataEntrante2:any;

  ListaProducto:Producto[]=[];
  index:number=0;
  index2:number=0;
  constructor(private ConexProdcutoService:ConexProductosService) {
    this.listarProductos();
   }

  ngOnInit(): void {
    
  }
  
  listarProductos()
{
  console.log("Servicio PRODUCTOS TABLAS");
  this.ConexProdcutoService.getProdcuto().subscribe(
    res=>{
      
      console.log(res)
      this.ListaProducto=<any>res;
      console.log("Servicio ULTIMA AA");
    },
    err => console.log(err)
    
  );
  
  } 
  eliminar(id:number){
    console.log(id);
    this.ConexProdcutoService.deletproducto(id).subscribe(
    res=>{
      console.log('Usuario Eliminado');
      this.listarProductos();
    },
    err => console.log(err)
      
    );
  }
  getNombres(id:number){
    this.dataEntrante = id;
    console.log("ID: ",id);
    this.ConexProdcutoService.disparadorDetalle.emit(this.dataEntrante)
  } 
  getIndex(id2:number){
    this.index=id2;
    this.dataEntrante2 = id2;
    console.log("ID: ",id2);
    this.ConexProdcutoService.disparadorDetalle.emit(this.dataEntrante2)
  }
  enviar(){
    
    for(let i=0;i<this.ListaProducto.length;i++){
      this.index2 = this.ListaProducto[i].pk_id_producto+1;
    }
    console.log(this.index2);
    this.getIndex(this.index2);
  }
}
