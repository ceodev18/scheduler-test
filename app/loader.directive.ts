import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[loader]'
})
export class LoaderDirective {

public loading: boolean = true

  constructor(private _el:ElementRef) { 
    if(this.loading){
      _el.nativeElement.style.display = 'block';
    }
    else{
      _el.nativeElement.style.display = 'none';
    }
  }

}