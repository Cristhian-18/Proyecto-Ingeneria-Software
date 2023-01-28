import { Component, Input, OnInit } from '@angular/core';
import { ConexProductosService,Producto } from 'src/app/services/conexiones/conex-productos/conex-productos.service';

@Component({
  selector: 'app-cart-ninos',
  templateUrl: './cart-ninos.component.html',
  styleUrls: ['./cart-ninos.component.css']
})
export class CartNinosComponent implements OnInit {

  @Input() dataEntrante:any;
  ListaProducto:Producto[]=[];
  ListaNino:Producto[]=[];

  info_modal:boolean=false;

  constructor(private canexproduc:ConexProductosService) { }

  ngOnInit(): void {
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
        this.ListaNino = this.ListaProducto.filter(item =>item.genero=='Niños')          
      },
      err => console.log(err)
      
    );
  }

  abrirmodal(){
  this.info_modal = true;
  }

}
