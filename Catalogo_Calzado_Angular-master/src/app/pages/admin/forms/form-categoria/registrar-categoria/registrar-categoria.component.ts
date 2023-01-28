import { Component, OnInit } from '@angular/core';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';


@Component({
  selector: 'app-registrar-categoria',
  templateUrl: './registrar-categoria.component.html',
  styleUrls: ['./registrar-categoria.component.css']
})
export class RegistrarCategoriaComponent implements OnInit {

  detalle:any={};
  
  categoria:categoria={

    pk_nombre_cat:'',
    id_categoria:0,
    descripcion:''
  };
  
  ListaCategoria:categoria[]=[];
  id:string='';

  constructor( private conexion:ConexCategoriaService) {     
    this.ListaCategoria=<any>  conexion.getCategoria();    

    this.conexion.disparadorDetalle.subscribe(data=>{
        this.detalle = data;
    })
  }

  ngOnInit(): void {
  }
  
  agregarCategoria(){
    this.categoria.id_categoria= (this.detalle)
    console.log(this.categoria);
    this.conexion.addCategoria(this.categoria).subscribe();  
  }

}
