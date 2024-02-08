import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string | boolean = false //A este decorator ahora puedes pasarle la ruta de la img desde la vista
  @HostListener('error') handleError(): void{ //Nos permite escuchar el evento error del host
    const elNative = this.elHost.nativeElement
    console.log('🔴 Esta imagen reventó -->', this.elHost);
    // '../../../assets/images/img-broken.jpg'
    if(this.customImg) {
      elNative.src= this.customImg 
    }else {
      elNative.src= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAAXNSR0IArs4c6QAAAD5JREFUGFdtjKENAEAIA4vC49h/HWbAERwexYfXVDW9S8nMRkTAzOhuVBXI3WeLqiIzsQJFxAD4w4LNbV6fD32XLKyP2o8zAAAAAElFTkSuQmCC'
    }
  }
  constructor(private  elHost: ElementRef) { 

  }

}
