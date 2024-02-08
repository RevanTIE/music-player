import { Component, OnInit } from '@angular/core';
import { SearchService } from '@modules/history/services/search.service';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([])
  constructor(private searchService: SearchService){
    
  }
  ngOnInit(): void {
  }

  receiveData($event: string): void{
    console.log('🚛 Estoy en el padre jua jua jua', $event)
    this.listResults$= this.searchService.searchTracks$($event)
  }

}
