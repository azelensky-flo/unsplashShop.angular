import {Injectable} from '@angular/core';
import {ColorFilter, OrientationFilter} from '../interfaces/Interfaces';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  selectedColor$: Subject<string> = new Subject();
  selectedOrientation$: Subject<string> = new Subject();

  colors: ColorFilter[] = [
    {value: '', viewValue: 'Select color'},
    {value: 'black_and_white', viewValue: 'Black and white'},
    {value: 'black', viewValue: 'Black'},
    {value: 'white', viewValue: 'White'},
    {value: 'yellow', viewValue: 'Yellow'},
    {value: 'orange', viewValue: 'Orange'},
    {value: 'red', viewValue: 'Red'},
    {value: 'purple', viewValue: 'Purple'},
    {value: 'magenta', viewValue: 'Magenta'},
    {value: 'green', viewValue: 'Green'},
    {value: 'teal', viewValue: 'Teal'},
    {value: 'blue', viewValue: 'Blue'},
  ];

  orientations: OrientationFilter[] = [
    {value: '', viewValue: 'Select orientation'},
    {value: 'landscape', viewValue: 'Landscape'},
    {value: 'portrait', viewValue: 'Portrait'},
    {value: 'squarish', viewValue: 'Squarish'},
  ];


  constructor() {
  }
}




