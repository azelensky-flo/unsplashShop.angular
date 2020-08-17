import {Component, OnInit} from '@angular/core';
import {PictureService} from '../../services/picture.service';
import {PictureDate} from '../../interfaces/Interfaces';
import {SearchService} from '../../services/search.service';
import {FiltersService} from '../../services/filters.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  picture: PictureDate[] = [];
  checkedItemBay: PictureDate[] = [];
  localStorage: PictureDate[] = [];
  localGet: PictureDate[] = [];

  constructor(
    private pictureService: PictureService,
    private searchService: SearchService,
    private filterService: FiltersService
  ) {
  }

  ngOnInit(): void {
    this.restoreLocalStorage();
    this.setValue();
    this.sentSearch();
    this.setColorFilter();
    this.setOrientationFilter();
  }

  setValue(): void {
    if (this.localStorage.length === 0) {
      this.pictureService.getPhotosList()
        .subscribe((picture: PictureDate[]) => {
          this.picture = picture;
        });
    } else {
      this.pictureService.getPhotosList()
        .subscribe((picture: PictureDate[]) => {
          this.localGet = picture;
          for (const el of this.localStorage) {
            const index = this.localGet.findIndex(item => item.id === el.id);
            this.localGet[index].isChecked = true;
            this.picture = this.localGet;
            this.checkedItemBay = this.localGet.filter(x => {
              return x.isChecked === true;
            });
          }
        });
    }
  }


  log(): void {
    // console.log(this.picture)
  }

  restoreLocalStorage(): void {
    const stateAsString = localStorage.getItem('itemForBay');
    if (stateAsString !== null) {
      this.localStorage = JSON.parse(stateAsString);
    }
  }

  saveLocalStorage(): void {
    const stateAsString = JSON.stringify(this.checkedItemBay);
    localStorage.setItem('itemForBay', stateAsString);
  }

  changeStatus(pictureItem): void {
    this.checkedItemBay.push(pictureItem);
    this.checkedItemBay = this.checkedItemBay.filter(item => {
      return item.isChecked === true;
    });
    this.saveLocalStorage();
  }

  onScroll(): void {
    this.pictureService.paramList.page += 1;
    if (this.pictureService.paramList.query !== '') {
      this.pictureService.httpParam = this.pictureService.httpParam.set('page', this.pictureService.paramList.page.toString());
      this.pictureService.getPhotoSearch()
        .subscribe(p => {
          this.picture.push(...p);
        });
    } else {
      this.pictureService.getPhotosList()
        .subscribe((p) => {
          this.picture.push(...p);
        });
    }
  }

  getPhotoSearch(): void {
    this.pictureService.getPhotoSearch()
      .subscribe(p => {
        if (p.length !== 0) {
          this.picture = p;
        } else if (p.length === 0) {
          this.setValue();
        }
      });
  }

  sentSearch(): void {
    this.searchService.searchQuery$
      .subscribe(query => {
        this.pictureService.paramList.query = query;
        this.pictureService.httpParam = this.pictureService.httpParam.set('query', this.pictureService.paramList.query);
        this.getPhotoSearch();
      });
  }

  setColorFilter(): void {
    this.filterService.selectedColor$
      .subscribe(color => {
        this.pictureService.paramList.color = color;
        if (this.pictureService.paramList.color !== '') {
          this.pictureService.httpParam = this.pictureService.httpParam.set('color', this.pictureService.paramList.color);
          this.getPhotoSearch();
        } else {
          this.pictureService.httpParam = this.pictureService.httpParam.delete('color');
          this.getPhotoSearch();
        }
      });
  }

  setOrientationFilter(): void {
    this.filterService.selectedOrientation$
      .subscribe(orient => {
        this.pictureService.paramList.orientation = orient;
        if (this.pictureService.paramList.orientation !== '') {
          this.pictureService.httpParam = this.pictureService.httpParam.set('orientation', this.pictureService.paramList.orientation);
          this.getPhotoSearch();
        } else {
          this.pictureService.httpParam = this.pictureService.httpParam.delete('orientation');
          this.getPhotoSearch();
        }
      });
  }




}

