import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, limit, query, startAfter, where } from '@angular/fire/firestore';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-seguro-list',
  templateUrl: './seguro-list.page.html',
  styleUrls: ['./seguro-list.page.scss'],
})
export class SeguroListPage implements OnInit {

  constructor(private readonly firestore: Firestore) { }

  listaSeguro = new Array();

  li = 10;
  lastVisible :any = null;

  isSearch : boolean = false;
  query="";

  ngOnInit() {

    console.log("ngOnInit");
    this.listaSeguro = new Array();
    this.lastVisible = null;
    this.listarSeguro();

  }

  ionViewWillEnter(){
    console.log("ion will enter..");
    this.listaSeguro = new Array();
    this.lastVisible = null;
    this.listarSeguro();
  }

  listarSeguroSinFiltro = () => {
    console.log("listar seguro");
    const seguroRef = collection(this.firestore, 'seguro');

    let q;
    if (!this.lastVisible) {
      q = query(seguroRef, limit(this.li));
    } else {
      q = query(seguroRef, limit(this.li), startAfter(this.lastVisible));
    }
    getDocs(q).then(re => {
      let total= re.docs.length;

      if(!re.empty){
        re.forEach(doc => {
        this.lastVisible = re.docs[re.docs.length - 1];
        let seguro: any = doc.data();
        seguro.id = doc.id;

        this.listaSeguro.push(seguro);

        let cantidadAlu = this.listaSeguro.length;
          
        });

      }

    });

  }

  listarSeguro = () =>{
    console.log("listar seguro");
    const seguroRef = collection(this.firestore, 'seguro');

    if ((this.query+"").length > 0){
      let q = undefined;
      if (this.lastVisible){
        q= query(seguroRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li),
          startAfter(this.lastVisible));
      } else {
        q= query(seguroRef,
          where ("nombre", ">=", this.query.toUpperCase()),
          where ("nombre", "<=", this.query.toLowerCase() + '\uf8ff'),
          limit(this.li));
      }

      getDocs(q).then(re => {
        if (!re.empty){
          let listaSeguro = new Array();

          //Retirar lo que no corresponde
          for (let i= 0; i < re.docs.length; i++){
            const doc : any = re.docs[i].data();
            if(doc.nombre.toUpperCase().
                  startsWith(
                      this.query.toUpperCase().charAt(0) 
            )){
              listaSeguro.push(re.docs[i])
            }

            
          }

          this.lastVisible = re.docs[listaSeguro.length-1];

            for(let i = 0; i < listaSeguro.length; i++){
              const doc : any = listaSeguro[i];
              //console.log("queryy", doc.id, "data", doc.data());
              let seguro : any = doc.data();
              seguro.id = doc.id;
              this.listaSeguro.push(seguro);
            };

        }
      });

    } else {
      this.listarSeguroSinFiltro();
    }
    
  }

  onIonInfinite(ev: any) {
    this.listarSeguro();
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

    this.listaSeguro = new Array();
    this.lastVisible = null;
    this.listarSeguro();
  }

  buscarSearch = (e:any) => {
    this.isSearch = false;
    this.query = e.target.value;

    this.listaSeguro = new Array();
    this.lastVisible = null;
    this.listarSeguro();
  }




}
