import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TixInterface } from '../../models/tix-interface'; 

@Component({
  selector: 'app-fruittopbar',
  templateUrl: './fruittopbar.component.html',
  styleUrls: ['./fruittopbar.component.css']
})
export class FruittopbarComponent implements OnInit {
  info:any={};
  constructor(
 public _uw:UserWService,
 private dataApi: DataApiService,
  public router: Router,
  public location: Location
  	) { }
    public tixToAdd:TixInterface;
   loadAPI = null;  
   url = "assets/assetsfruit/js/popper.min.js";
  loadInfo(){
    this.dataApi
    .getInfo()
    .subscribe((res:any) => {
      if (res[0] === undefined){
       }else{
        this.info=res;
        this._uw.info=this.info;
        }
     });
  }
  remove(i){
  this._uw.subTotal=this._uw.subTotal-(this._uw.car[i].quantity*this._uw.car[i].globalPrice);
  this._uw.car.splice(i, 1);
  this._uw.numProd=this._uw.numProd-1;
}


  public initQuan(){
    this._uw.tixPreview.quantity=1;
  }
  public initQuan2(){
    this.router.navigate(['/']);
  }
  public addToBag(){
     this._uw.numProd=this._uw.numProd+1;
     this._uw.tixPreview.id=this._uw.numProd;
     this.tixToAdd=this._uw.tixPreview;
     this._uw.subTotal=this._uw.subTotal+(this._uw.tixPreview.quantity*this._uw.tixPreview.globalPrice);
     this._uw.car.push(this.tixToAdd);
  }
  public minus(){
    if(this._uw.tixPreview.quantity>1){      
    this._uw.tixPreview.quantity=this._uw.tixPreview.quantity-1;
    }
  }
  public plus(){
    this._uw.tixPreview.quantity=this._uw.tixPreview.quantity+1;
  }
  setColp(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].colp;
  }
  setBs(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].bs;
  }
   setUsd(){
    this.loadInfo();
    this._uw.currency=this._uw.info[0].usd;
  }

  ngOnInit() {
  	 if (this._uw.loaded==true){
          this.loadAPI = new Promise(resolve => {
            // this.loadScript();
            this.loadInfo();
          });
        }
        this._uw.loaded=true;
  }
      public loadScript() {
      let node = document.createElement("script");
      node.src = this.url;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
}
