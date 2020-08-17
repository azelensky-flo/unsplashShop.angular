import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchQuery$: Subject<string> = new Subject();

  constructor() {
  }

}
