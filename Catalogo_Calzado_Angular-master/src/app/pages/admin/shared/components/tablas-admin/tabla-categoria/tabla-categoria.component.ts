import { Component, OnInit, Input } from '@angular/core';
import { ConexCategoriaService,categoria } from 'src/app/services/conexiones/conex-categoria/conex-categoria.service';


@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.css']
})
export class TablaCategoriaComponent implements OnInit {
  @Input() dataEntrante:any;
  @Input() dataEntrante2:any;
  index:number=0;
  ListaCategoria:categoria[]=[];
  index2:number=0;

  constructor(private Conexcategoria:ConexCategoriaService) { }
  ngOnInit(): void {
    this.listaCategoria();
  }
  listaCategoria()
{
  console.log("Servicio ULTIMA NOVEDAD");
  this.Conexcategoria.getCategoria().subscribe(
    res=>{
      console.log(res)
      this.ListaCategoria=<any>res;
           
    },
    err => console.log(err)
    
  );

  } 

  eliminar(id:string){
    this.Conexcategoria.deleteCategoria(id).subscribe(
    res=>{
      console.log('Usuario Eliminado');
      this.listaCategoria();
    },
    err => console.log(err)
      
    );
  }
  getNombres(id:string){
    this.dataEntrante = id;
    console.log("ID: ",id);
    this.Conexcategoria.disparadorDetalle.emit(this.dataEntrante)
  } 
  getIndex(id2:number){
    this.index=id2;
    this.dataEntrante2 = id2;
    console.log("ID: ",id2);
    this.Conexcategoria.disparadorDetalle.emit(this.dataEntrante2)
  }
  enviar(){
    
    for(let i=0;i<this.ListaCategoria.length;i++){
      this.index2 = this.ListaCategoria[i].id_categoria+1;
    }
    console.log(this.index2);
    this.getIndex(this.index2);
  }
}