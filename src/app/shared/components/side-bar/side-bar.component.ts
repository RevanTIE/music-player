import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  // linksMenu: Array<any> = [
  //   {
  //     name: 'Home',
  //     icon: 'uil uil-home'
  //   },
  //   {
  //     name: 'Buscar',
  //     icon: 'uil uil-search'
  //   }
  // ]
  mainMenu:{
    defaultOptions : Array<any>,
    accessLink: Array<any>
  } = {defaultOptions: [], accessLink: []}

  customOptions: Array<any>=[]
  constructor(private router:Router) {
    
  }
  ngOnInit(): void {
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate',
        router: ['/', 'auth']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: {hola: 'mundo'}
      }
    ]
    this.mainMenu.accessLink = [
      {
        name: 'Crear list',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]
    this.customOptions = [
      {
        name: 'Mi lista 1',
        router: ['/']
      },
      {
        name: 'Mi lista 2',
        router: ['/']
      },
      {
        name: 'Mi lista 3',
        router: ['/']
      },
    ]
  }
  public goTo($event: any):void{
    this.router.navigate(['/', 'favorites'],{
      queryParams: {
        key1: 'value1',
        key2: 'value2',
        key3: 'value3',
      }
    })
    
    //console.log($event)
    //TODO: Una URL con parámetros solamente es lo equivalente a 
    //TODO: http://localhost/param1/param2 ...

    //TODO: Una URL con query params solamente es lo equivalente a 
    //TODO: http://localhost/param1?query1=valor1&query2=valor2

  }


}
