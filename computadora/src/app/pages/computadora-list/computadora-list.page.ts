import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, limit, query, startAfter, where } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-computadora-list',
  templateUrl: './computadora-list.page.html',
  styleUrls: ['./computadora-list.page.scss'],
})
export class ComputadoraListPage implements OnInit {

  constructor(private readonly firestore: Firestore) { }

  listaComputadora = new Array();

  li = 10;
  lastVisible :any = null;

  isSearch : boolean = false;
  query="";

  ngOnInit() {

    console.log("ngOnInit");
    this.listaComputadora = new Array();
    this.lastVisible = null;
    this.listarComputadora();

  }

  ionViewWillEnter(){
    console.log("ion will enter..");
    this.listaComputadora = new Array();
    this.lastVisible = null;
    this.listarComputadora();
  }

  listarComputadoraSinFiltro = () => {
    console.log("listar computadora");
    const computadoraRef = collection(this.firestore, 'computadora');

    let q;
    if (!this.lastVisible) {
      q = query(computadoraRef, limit(this.li));
    } else {
      q = query(computadoraRef, limit(this.li), startAfter(this.lastVisible));
    }
    getDocs(q).then(re => {
      let total= re.docs.length;

      if(!re.empty){
        re.forEach(doc => {
        this.lastVisible = re.docs[re.docs.length - 1];
        let computadora: any = doc.data();
        computadora.id = doc.id;

        this.listaComputadora.push(computadora);

        let cantidadAlu = this.listaComputadora.length;
          
        });

      }

    });

  }

  listarComputadora = () =>{
    console.log("listar computadora");
    const computadoraRef = collection(this.firestore, 'computadora');

    if ((this.query+"").length > 0){
      let q = undefined;
      if (this.lastVisible){
        q= query(computadoraRef,
          where ("modelo", ">=", this.query.toUpperCase()),
          where ("modelo", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li),
          startAfter(this.lastVisible));
      } else {
        q= query(computadoraRef,
          where ("modelo", ">=", this.query.toUpperCase()),
          where ("modelo", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li));
      }

      getDocs(q).then(re => {
        if (!re.empty){
          let listaComputadora = new Array();

          //Retirar lo que no corresponde
          for (let i= 0; i < re.docs.length; i++){
            const doc : any = re.docs[i].data();
            if(doc.modelo.toUpperCase().
                  startsWith(
                      this.query.toUpperCase().charAt(0) 
            )){
              listaComputadora.push(re.docs[i])
            }

            
          }

          this.lastVisible = re.docs[listaComputadora.length-1];

            for(let i = 0; i < listaComputadora.length; i++){
              const doc : any = listaComputadora[i];
              //console.log("queryy", doc.id, "data", doc.data());
              let computadora : any = doc.data();
              computadora.id = doc.id;
              this.listaComputadora.push(computadora);
            };

        }
      });

    } else {
      this.listarComputadoraSinFiltro();
    }
    
  }


  onIonInfinite(ev: any) {
    this.listarComputadora();
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

    this.listaComputadora = new Array();
    this.lastVisible = null;
    this.listarComputadora();
  }

  buscarSearch = (e:any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaComputadora = new Array();
    this.lastVisible = null;
    this.listarComputadora();
  }




  
}
