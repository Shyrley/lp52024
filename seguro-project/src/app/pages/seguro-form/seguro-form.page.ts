import { Component, OnInit, ViewChild } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-seguro-form',
  templateUrl: './seguro-form.page.html',
  styleUrls: ['./seguro-form.page.scss'],
})
export class SeguroFormPage implements OnInit {

  @ViewChild('fecha') fechaInput!: NgModel;

  id: any; //atributo que recibe el id del registro desde la ruta
  isNew : boolean = false;

  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit() {
    console.log(this.isNew)
    this.route.params.subscribe((params:any)=>{
      console.log("params", params);
      this.id = params.id;
      if(params.id == 'new'){

      }else{
        this.obtenerSeguro(this.id);
        this.isNew = true;
      }
    });

  }


  nuevoSeguro = () =>{
    this.seguro = {}
    this.router.navigate(["/seguro-form/new"])
  }

  editarSeguro = () => {
    console.log("Aqui edita en Firebase");
    const document = doc(this.firestore, "seguro", this.id);

    updateDoc(document,{

      nombre : this.seguro.nombre,
      fecha : this.seguro.fecha,
      monto : this.seguro.monto,
      bien : this.seguro.bien
      
    }).then(doc=>{
      console.log("Registro editado");
      alert("Registro Editado")
      this.router.navigate(['/seguro-list'])
    }).catch(error=>{
      //informa al usuario
      console.log(error)
    });
  }

  guardarSeguro = () => {
    if(!this.isNew){
      this.incluirSeguro();
      
    }else{
      this.editarSeguro();
    }
  }

  incluirSeguro = () => {
    console.log("Aqui incluir en Firebase");
    let seguroRef = collection(this.firestore, "seguro");

    addDoc(seguroRef, {

      nombre : this.seguro.nombre,
      fecha : this.seguro.fecha,
      monto : this.seguro.monto,
      bien : this.seguro.bien

    }).then(doc => {
      console.log("Registro Incluido");
      alert("registro guardado")
      this.router.navigate(['/seguro-list']);
    }).catch(error => {
        console.log(error);
    });
  }

  eliminarSeguro = () => {
    console.log("Aqui elimina en Firebase");
    const document = doc(this.firestore, "seguro", this.id);

    deleteDoc(document).then(doc => {
      console.log("Registro Eliminado");
      this.router.navigate(['/seguro-list']);
    }).catch(error =>{
      //informar al usuarios
    });
  }

  seguro : any = [];
  obtenerSeguro = (id: string) => {
    const document = doc(this.firestore, "seguro", id);
    getDoc(document).then(doc =>{
      console.log("Registro a editar", doc.data());

      if (doc.data()){
        this.seguro = doc.data();
        this.seguro.fecha = this.seguro.fecha?.toDate().toISOString().substring(0,10)+"";

        
      }else{
        this.seguro = {};
      }

      
    })
  }




}
