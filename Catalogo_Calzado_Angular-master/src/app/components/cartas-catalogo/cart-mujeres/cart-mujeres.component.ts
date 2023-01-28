import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';

@Component({
  selector: 'app-cart-mujeres',
  templateUrl: './cart-mujeres.component.html',
  styleUrls: ['./cart-mujeres.component.css']
})
export class CartMujeresComponent implements OnInit {

  @Input() dataEntrante:any;

  info_modal:boolean=false;

  ListaProducto:Producto[]=[];
  ListaMujeres:Producto[]=[];

  constructor(private canexproduc:ConexProductosService) { }

  ngOnInit(){
   
    this.listarProductos();
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
      this.ListaMujeres = this.ListaProducto.filter(item =>item.genero=='Mujer')   
           
    },
    err => console.log(err)
    
  );
}


  abrirmodal(){
  this.info_modal = true;
}

}
