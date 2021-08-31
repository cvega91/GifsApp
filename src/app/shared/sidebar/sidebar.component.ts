import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
 
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get history(){

    return [...this.gifsService.historial];
  }

  search( query : string){
    
    this.gifsService.searchGifs(query);
  }

 

}
