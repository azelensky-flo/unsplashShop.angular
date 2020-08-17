import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {GetSearch, ParamListPictures, PictureDate} from '../interfaces/Interfaces';


@Injectable({
  providedIn: 'root'
})

export class PictureService {
  paramList: ParamListPictures = {
    page: 1,
    per_page: 9,
    query: '',
    color: '',
    orientation: ''
  };

  httpParam = new HttpParams()
    .set('page', this.paramList.page.toString())
    .set('per_page', this.paramList.per_page.toString());

  constructor(
    private http: HttpClient,
  ) {
  }

  getPhotosList(): Observable<PictureDate[]> {
    const httpParam = new HttpParams()
    .set('page', this.paramList.page.toString())
    .set('per_page', this.paramList.per_page.toString());
    const url = `${environment.apiUrl}api/pictures`;
    return this.http.get<PictureDate[]>(url, {params: httpParam}).pipe(
      map(p => {
        return p.map(picture => {
          return {
            id: picture.id,
            urls: picture.urls,
            isChecked: false,
            width: picture.width,
            height: picture.height
          };
        });
      })
    );
  }

  getPhotoSearch(): Observable<PictureDate[]> {
    const url = `${environment.apiUrl}api/pictures/search`;
    return this.http.get<GetSearch>(url, {params: this.httpParam}).pipe(
      map(p => {
        return p.results.map(picture => {
          return {
            id: picture.id,
            urls: picture.urls,
            isChecked: false,
            width: picture.width,
            height: picture.height
          };
        });
      })
    );
  }

}
