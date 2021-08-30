import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from 'src/app/gifs/models/gifs.model';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[]=[];

  //todo: change any to properly type
  public results:Gif[]=[];

  get historial(){
    
    
    return [...this._history];
  }

  constructor(private http: HttpClient){

  }

  searchGifs(query: string){

    //private apiKey: string='lByrR5tzA95Dd0xJIrVpjwl2Bq1u6kqs';
    //confirms if already exists 

    query = query.trim().toLowerCase();
    
    if(!this._history.includes(query)){
      this._history.unshift(query);
    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=lByrR5tzA95Dd0xJIrVpjwl2Bq1u6kqs&q=${query}&limit=10`)
    .subscribe( response => {
      console.log(response.data);
      this.results=response.data;
    });

    /*
    fetch("https://media0.giphy.com/media/U3UP4fTE6QfuoooLaC/giphy-downsized-small.mp4?cid=799135abdti5j8fsyhwe6qfgpkbiadsgk9ncd4qzen7r56nu&rid=giphy-downsized-small.mp4&ct=g").then( response =>{
      response.json().then(data =>{
        console.log(data);
      });
    });
    */
    //cuts and limites the array to 10 positions 0 to 9
    this._history= this._history.splice(0,9);
    //console.log(this._history);

  }
}
