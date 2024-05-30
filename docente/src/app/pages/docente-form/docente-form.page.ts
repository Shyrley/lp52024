import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Storage, StorageError, UploadTaskSnapshot, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-docente-form',
  templateUrl: './docente-form.page.html',
  styleUrls: ['./docente-form.page.scss'],
})
export class DocenteFormPage implements OnInit {

  id: any; //atributo que recibe el id del registro desde la ruta
  isNew : boolean = false;

  avatar : string = '';


  constructor(
    private readonly firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    console.log(this.isNew)
    this.route.params.subscribe((params:any)=>{
      console.log("params", params);
      this.id = params.id;
      if(params.id == 'new'){

      }else{
        this.obtenerDocente(this.id);
        this.isNew = true;
      }
    });
  }

  nuevoDocente = () =>{
    this.docente = {}
    this.router.navigate(["/docente-form/new"])
  }

  editarDocente = () => {
    console.log("Aqui edita en Firebase");
    const document = doc(this.firestore, "docente", this.id);

    updateDoc(document,{
      nombre : this.docente.nombre,
      edad : this.docente.edad,
      fecha : new Date(this.docente.fecha),
      materia : this.docente.materia,
      avatar: this.docente.avatar

    }).then(doc=>{
      console.log("Registro editado");
      alert("Registro Editado")
      this.router.navigate(['/docente-list'])
    }).catch(error=>{
      //informa al usuario
      console.log(error)
    });
  }

  guardarDocente = () => {
    if(!this.isNew){
      this.incluirDocente();
      
    }else{
      this.editarDocente();
    }
  }

  incluirDocente = () => {
    console.log("Aqui incluir en Firebase");
    let docenteRef = collection(this.firestore, "docente");

    addDoc(docenteRef, {
      nombre : this.docente.nombre,
      edad : this.docente.edad,
      fecha : new Date(this.docente.fecha),
      materia : this.docente.materia
     

    }).then(doc => {
      console.log("Registro Incluido");
      alert("registro guardado")
      this.router.navigate(['/docente-list']);
    }).catch(error => {
        console.log(error);
    });
  }


  eliminarDocente = () => {
    console.log("Aqui elimina en Firebase");
    const document = doc(this.firestore, "docente", this.id);

    deleteDoc(document).then(doc => {
      console.log("Registro Eliminado");
      this.router.navigate(['/docente-list']);
    }).catch(error =>{
      //informar al usuarios
    });
  }


  docente : any = [];
  obtenerDocente = (id: string) => {
    const document = doc(this.firestore, "docente", id);
    getDoc(document).then(doc =>{
      console.log("Registro a editar", doc.data());

      if (doc.data()){
        this.docente = doc.data();
        this.docente.fecha = this.docente.fecha?.toDate().toISOString().substring(0,10)+"";


        if(this.docente.avatar){
          this.obtenerAvatarDocente();
        }
      }else{
        this.docente = {};
      }

      
    })
  }


  uploadFile = (input: HTMLInputElement) => {

    if (!input.files) return
    
    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++){
      const file = files.item(i);

      if (file){
        console.log(file, file.name);
        const storageRef = ref(this.storage, `avatars/docente/${this.id}`);


        uploadBytesResumable(storageRef, file).on(
          'state_changed',
          this.onUploadChange,
          this.onUploadError,
          this.onUploadComplete,
        );
      }
    }

  }

  onUploadChange = (response:UploadTaskSnapshot) => {
    console.log('onUploadChange', response);
  }

  onUploadError = (error: StorageError) => {
    console.log('onUploadError', error);
  }

  onUploadComplete = () => {
    console.log('upload completo');
    this.editarAvatar();
    this.obtenerAvatarDocente();
    
  }


  editarAvatar = () => {
    const document = doc(this.firestore, "docente", this.id);
    updateDoc(document, {
      avatar : 'avatars/docente' + this.id
    }).then(doc => {
      console.log("Avatar Editado");
    });
  }

  obtenerAvatarDocente = () => {
    const storageRef = ref(this.storage, `avatars/docente/${this.id}`);

    getDownloadURL(storageRef).then(doc => {
      this.avatar = doc;
    })
  }

  removeAvatar() {
    this.docente.avatar = null; // or this.avatar = '';
  }



}
