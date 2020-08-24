import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PromotionalCodeService {

  constructor(private http: HttpClient) {
  }

  checkPromotionalCode(promotionalCode: string): Observable<any> {
    const url = `${environment.apiUrl}api/promocode/check`;
    return this.http.post<any>(url, {promotionalCode});
  }
}

