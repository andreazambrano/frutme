import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
import { DataApiService } from '../../services/data-api.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { TixInterface } from '../../models/tix-interface'; 
import { OrderInterface } from '../../models/order-interface';
import { SaleInterface } from '../../models/sale-interface'; 
import { FormBuilder, FormGroup,  Validators } from '@angular/forms';
import { ScrollTopService }  from '../../services/scroll-top.service';
// import { ValidationError } from '../../../assets/file-picker/src/lib/validation-error.model';
import { isError } from "util";
// import { FilePickerComponent } from '../../../assets/file-picker/src/lib/file-picker.component';

@Component({
  selector: 'app-fruitcart',
  templateUrl: './fruitcart.component.html',
  styleUrls: ['./fruitcart.component.css']
})
export class FruitcartComponent implements OnInit {

  constructor(
    public scrollTopService:ScrollTopService,
  	public _uw:UserWService,
  	private dataApi: DataApiService,
  	private router: Router,
  	private location: Location,
    private formBuilder: FormBuilder
  	) { }
    loadAPI = null;  
    url4="assets/assetsfruit/js/jquery.parallax-scroll.js";
    url5 = "assets/assetsfruit/js/scripts.js";
   
  public aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
  }
    stepUno=true;
    stepDos=false;
    stepTres=false;
    public setStepDos(){
      this.scrollTopService.setScrollTop();
      this.stepDos=true;
      this.stepUno=false;
      this.stepTres=false;
    }
    public setStepUno(){
      this.scrollTopService.setScrollTop();
      this.stepDos=false;
      this.stepUno=true;
      this.stepTres=false;
    }
    public setStepTres(){
      this.scrollTopService.setScrollTop();
      this.stepDos=false;
      this.stepUno=false;
      this.stepTres=true;
    }

    public sale : SaleInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
      id:"",
      personaContacto:"",
      total:0
    };
    public order : OrderInterface ={
      car:[],
      email:"",
      status:"",
      metodo:"",
      direccion:"",
      id:"",
      steeps:[
        {steep:true},
        {steep:false},
        {steep:false},
        {steep:false}
      ],
      personaContacto:"",
      total:0
    };

    ngFormSendSale: FormGroup;
    ngFormSendOrder: FormGroup;
    submitted = false;

    url = "assets/assetsfruit/js/magnific-popup.min.js";
    url2 = "assets/assetsfruit/js/popper.min.js";
    url3 = "assets/assetsfruit/js/scripts.js";

    ngOnInit() {
      this.stepUno=true;
      if(this._uw.numProd<1){
      this.router.navigate(['/']);
    }
    this.ngFormSendSale = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      personaContacto: ['', [Validators.required]],
      metodo:['',[Validators.required]],
      email: ['', [Validators.required]],
      total: [0,[Validators.required]]
    });

    this.ngFormSendOrder = this.formBuilder.group({
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      personaContacto: ['', [Validators.required]],
      metodo:['',[Validators.required]],
      email: ['', [Validators.required]],
      total: [0,[Validators.required]]
    });

  	if(this._uw.numProd<1){
  	// this.router.navigate(['/']);
    }

  	if (this._uw.loaded==true){
  	    this.loadAPI = new Promise(resolve => {
          this.loadScript();
          this.loadScript2();
          this.loadScript4();
          this.loadScript3();
          });
        }
      this._uw.loaded=true;
    }

    public loadScript4() {
      let node = document.createElement("script");
      node.src = this.url4;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
    public loadScript5() {
      let node = document.createElement("script");
      node.src = this.url5;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }

    public currencyBit(){}
    public currencyPaypal(){}
    public okOrder(){
      this.submitted = true;
        if (this.ngFormSendOrder.invalid) {
          this._uw.errorFormSendOrder=true;
        return;
            } 
      this._uw.errorFormSendOrder=false;
      this.order = this.ngFormSendOrder.value;
      this.order.status="new";
      this.order.npedido=this.aleatorio(10000,99999);
      this.order.steeps=[
        {steep:true},
        {steep:false},
        {steep:false},
        {steep:false}
      ];
      this.order.total=(this._uw.subTotal*this._uw.currency);
      this.order.car=this._uw.car;
      return this.dataApi.saveOrder(this.order).subscribe();
    }

    public minus(index){
    	let id=index;
      if(this._uw.car[id].quantity>1){      
      this._uw.car[id].quantity=this._uw.car[index].quantity-1;
      this._uw.subTotal=this._uw.subTotal-(1*this._uw.car[id].globalPrice);
      }
    }
    public plus(index){
    	let id=index;
      this._uw.car[id].quantity=this._uw.car[index].quantity+1;
      this._uw.subTotal=this._uw.subTotal+(1*this._uw.car[id].globalPrice);
    }
    remove(i){
      this._uw.subTotal=this._uw.subTotal-(this._uw.car[i].quantity*this._uw.car[i].globalPrice);
      this._uw.car.splice(i, 1);
      this._uw.numProd=this._uw.numProd-1;
      if(this._uw.numProd<1){
      	this.router.navigate(['/']);
      }
    } 
    get fval() {
      return this.ngFormSendOrder.controls;
    }

    public loadScript() {
      let node = document.createElement("script");
      node.src = this.url;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
    public loadScript2() {
      let node = document.createElement("script");
      node.src = this.url2;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
    public loadScript3() {
      let node = document.createElement("script");
      node.src = this.url3;
      node.type = "text/javascript";
      node.async = true;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
}
