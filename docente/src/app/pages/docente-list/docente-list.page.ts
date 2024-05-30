import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, limit, query, startAfter, where } from '@angular/fire/firestore';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-docente-list',
  templateUrl: './docente-list.page.html',
  styleUrls: ['./docente-list.page.scss'],
})
export class DocenteListPage implements OnInit {

  constructor(private readonly firestore: Firestore) { }


  listaDocente = new Array();

  li = 10;
  lastVisible :any = null;

  isSearch : boolean = false;
  query="";



  ngOnInit() {
    console.log("ngOnInit");
    this.listaDocente = new Array();
    this.lastVisible = null;
    this.listarDocente();
  }

  ionViewWillEnter(){
    console.log("ion will enter..");
    this.listaDocente = new Array();
    this.lastVisible = null;
    this.listarDocente();
  }

  listarDocenteSinFiltro = () => {
    console.log("listar docente");
    const docenteRef = collection(this.firestore, 'docente');

    let q;
    if (!this.lastVisible) {
      q = query(docenteRef, limit(this.li));
    } else {
      q = query(docenteRef, limit(this.li), startAfter(this.lastVisible));
    }
    getDocs(q).then(re => {
      let total= re.docs.length;

      if(!re.empty){
        re.forEach(doc => {
        this.lastVisible = re.docs[re.docs.length - 1];
        let docente: any = doc.data();
        docente.id = doc.id;

        this.listaDocente.push(docente);

        let cantidadAlu = this.listaDocente.length;
          
        });

      }

    });

  }


  listarDocente = () =>{
    console.log("listar docente");
    const docenteRef = collection(this.firestore, 'docente');

    if ((this.query+"").length > 0){
      let q = undefined;
      if (this.lastVisible){
        q= query(docenteRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li),
          startAfter(this.lastVisible));
      } else {
        q= query(docenteRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li));
      }

      getDocs(q).then(re => {
        if (!re.empty){
          let listaDocente = new Array();

          //Retirar lo que no corresponde
          for (let i= 0; i < re.docs.length; i++){
            const doc : any = re.docs[i].data();
            if(doc.nombre.toUpperCase().
                  startsWith(
                      this.query.toUpperCase().charAt(0) 
            )){
              listaDocente.push(re.docs[i])
            }

            
          }

          this.lastVisible = re.docs[listaDocente.length-1];

            for(let i = 0; i < listaDocente.length; i++){
              const doc : any = listaDocente[i];
              //console.log("queryy", doc.id, "data", doc.data());
              let docente : any = doc.data();
              docente.id = doc.id;
              this.listaDocente.push(docente);
            };

        }
      });

    } else {
      this.listarDocenteSinFiltro();
    }
    
  }

  onIonInfinite(ev: any) {
    this.listarDocente();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  clickSearch = () => {
    this.isSearch = true;
  }

  clearSearch = () => {
    this.isSearch = false;
    this.query = "";

    this.listaDocente = new Array();
    this.lastVisible = null;
    this.listarDocente();
  }

  buscarSearch = (e:any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaDocente = new Array();
    this.lastVisible = null;
    this.listarDocente();
  }





}
