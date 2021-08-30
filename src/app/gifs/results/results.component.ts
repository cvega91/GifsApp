import { Component, OnInit } from '@angular/core';
import { GifsService } from '../services/gifs.service';
import { SearchGifsResponse, Gif } from "../models/gifs.model";
@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styles: [
  ]
})
export class ResultsComponent  {

  constructor(private gs: GifsService) { }

  get results(){
    let gif : Gif[];
    gif=this.gs.results;
    //gif[0].images.downsized_medium.url;
    return gif;
  }

}
