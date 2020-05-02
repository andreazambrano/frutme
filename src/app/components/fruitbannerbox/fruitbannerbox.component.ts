import { Component, OnInit } from '@angular/core';
import { UserWService } from "../../services/user-w.service";
@Component({
  selector: 'app-fruitbannerbox',
  templateUrl: './fruitbannerbox.component.html',
  styleUrls: ['./fruitbannerbox.component.css']
})
export class FruitbannerboxComponent implements OnInit {

  constructor(
 public _uw:UserWService
  	) { }
 loadAPI = null;  
   url = "assets/assetsfruit/js/scripts.js";
  ngOnInit() {
  	 if (this._uw.loaded==true){
          this.loadAPI = new Promise(resolve => {
            this.loadScript();
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
