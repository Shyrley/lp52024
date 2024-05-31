import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-computadora-form',
  templateUrl: './computadora-form.page.html',
  styleUrls: ['./computadora-form.page.scss'],
})
export class ComputadoraFormPage implements OnInit {

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
        this.obtenerComputadora(this.id);
        this.isNew = true;
      }
    });

  }

  nuevoComputadora = () =>{
    this.computadora = {}
    this.router.navigate(["/computadora-form/new"])
  }



  editarComputadora = () => {
    console.log("Aqui edita en Firebase");
    const document = doc(this.firestore, "computadora", this.id);

    updateDoc(document,{
       
      fecha : new Date(this.computadora.fecha),
      precio : this.computadora.precio,
      modelo : this.computadora.modelo
     

    }).then(doc=>{
      console.log("Registro editado");
      alert("Registro Editado")
      this.router.navigate(['/computadora-list'])
    }).catch(error=>{
      //informa al usuario
      console.log(error)
    });
  }

  guardarComputadora = () => {
    if(!this.isNew){
      this.incluirComputadora();
      
    }else{
      this.editarComputadora();
    }
  }

  incluirComputadora = () => {
    console.log("Aqui incluir en Firebase");
    let computadoraRef = collection(this.firestore, "computadora");

    addDoc(computadoraRef, {

      fecha : new Date(this.computadora.fecha),
      precio : this.computadora.precio,
      modelo : this.computadora.modelo

    }).then(doc => {
      console.log("Registro Incluido");
      alert("registro guardado")
      this.router.navigate(['/computadora-list']);
    }).catch(error => {
        console.log(error);
    });
  }

  eliminarComputadora = () => {
    console.log("Aqui elimina en Firebase");
    const document = doc(this.firestore, "computadora", this.id);

    deleteDoc(document).then(doc => {
      console.log("Registro Eliminado");
      this.router.navigate(['/computadora-list']);
    }).catch(error =>{
      //informar al usuarios
    });
  }


  computadora : any = [];
  obtenerComputadora = (id: string) => {
    const document = doc(this.firestore, "computadora", id);
    getDoc(document).then(doc =>{
      console.log("Registro a editar", doc.data());

      if (doc.data()){
        this.computadora = doc.data();
        this.computadora.fecha = this.computadora.fecha?.toDate().toISOString().substring(0,10)+"";


        
      }else{
        this.computadora = {};
      }

      
    })
  }



}
