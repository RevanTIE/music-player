import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Component({
  selector: 'app-section-generic',
  templateUrl: './section-generic.component.html',
  styleUrl: './section-generic.component.css'
})
export class SectionGenericComponent implements OnInit {
  @Input() title: string = '' //Usar el decorador input()
  @Input() mode: 'small' | 'big' = 'big' //Una u otra, pero inicialmente, 'big'
  @Input() dataTracks: Array<TrackModel> = []
  constructor(){
    
  }

  ngOnInit(): void {
  }

}
