import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';

@Component({
  selector: 'app-cart-hombre',
  templateUrl: './cart-hombre.component.html',
  styleUrls: ['./cart-hombre.component.css']
})
export class CartHombreComponent implements OnInit {

  @Input() dataEntrante:any;

  info_modal:boolean=false;
  public load: Boolean  = false;

  ListaProducto:Producto[]=[];
  ListaHombe:Producto[]=[];

  constructor(private canexproduc:ConexProductosService) { }

  ngOnInit(){
    this.listarProductos();

    setTimeout(() => {
      this.load = true;
    }, 1000); 
  }

 

  getNombres(nombre:number){
    this.dataEntrante = nombre;
    console.log(this.dataEntrante);
    this.canexproduc.disparadorDetalle.emit(this.dataEntrante)
  }

listarProductos()
{
  console.log("Servicio ULTIMA NOVEDAD");
  this.canexproduc.getProdcuto().subscribe(
    res=>{
      console.log(res)
      this.ListaProducto=<any>res;
      this.ListaHombe = this.ListaProducto.filter(item =>item.genero=='Hombre')     
    },
    err => console.log(err)
    
  );

  
}
  abrirmodal(){
  this.info_modal = true;
}

}
