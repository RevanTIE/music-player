import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  @Output() callBackData: EventEmitter<any> = new EventEmitter()
  src: string = ''
  ngOnInit(): void {
  }
  callSearch(term: string): void{
    if(term.length >= 3){
      this.callBackData.emit(term)
      console.log('Llamamos a nuestra API HTTP GET', term)
    }
    
  }
  

}
