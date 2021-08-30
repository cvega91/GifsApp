import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent{

  
  @ViewChild('txtBuscar') 
  txtBuscar!:ElementRef<HTMLInputElement>;
  
  constructor(private gifsService: GifsService){

  }

  find(){
    const value = this.txtBuscar.nativeElement.value;;
    if(value.trim().length===0){
      return;
    }
    
    this.gifsService.searchGifs(value);
    
    this.txtBuscar.nativeElement.value="";
   //console.log(value);
 //console.log(this.txtBuscar);
   // document.querySelector('input').value="";
  }


}
