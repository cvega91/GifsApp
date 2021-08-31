import { HttpClient, HttpParams } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from 'src/app/gifs/models/gifs.model';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string="lByrR5tzA95Dd0xJIrVpjwl2Bq1u6kqs";
  private urlService:string="https://api.giphy.com/v1/gifs";
  //Search history
  private _history: string[]=[];

  //Gif interface
  public results:Gif[]=[];

  //History dashboard sidebar
  get historial(){
    
    
    return [...this._history];
  }

  //Initialize results history and saved gif links 
  constructor(private http: HttpClient){
      localStorage.getItem("history");
      if(localStorage.getItem("history")){
        this._history=JSON.parse(localStorage.getItem("history"));
      }
      if(localStorage.getItem("results")){
        this.results=JSON.parse(localStorage.getItem("results"));
      }
  }

  searchGifs(query: string){

    //private apiKey: string='lByrR5tzA95Dd0xJIrVpjwl2Bq1u6kqs';
    //confirms if already exists 

    query = query.trim().toLowerCase();
    
    if(!this._history.includes(query)){
      this._history.unshift(query);
      this._history= this._history.splice(0,9);
      localStorage.setItem("history",JSON.stringify(this._history));
    }

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit',"10")
    .set("q",query);

    //Giphy Api query call 
    //this.http.get<SearchGifsResponse>(`${this.urlService}/search?api_key=${this.apiKey}&q=${query}&limit=10`)
    this.http.get<SearchGifsResponse>(`${this.urlService}/search`,{params})
    .subscribe( response => {
      console.log(response.data);
      this.results=response.data;
      localStorage.setItem("results",JSON.stringify(this.results));
    });



    /*
    fetch("https://media0.giphy.com/media/U3UP4fTE6QfuoooLaC/giphy-downsized-small.mp4?cid=799135abdti5j8fsyhwe6qfgpkbiadsgk9ncd4qzen7r56nu&rid=giphy-downsized-small.mp4&ct=g").then( response =>{
      response.json().then(data =>{
        console.log(data);
      });
    });
    */
    //cuts and limites the array to 10 positions 0 to 9
  
    //console.log(this._history);

  }
}
