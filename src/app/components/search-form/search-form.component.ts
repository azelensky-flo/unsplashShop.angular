import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {SearchService} from '../../services/search.service';
import {PictureService} from '../../services/picture.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {


  searchStr: FormControl = new FormControl('');

  constructor(private searchService: SearchService,
              private pictureService: PictureService) {
  }

  ngOnInit(): void {
    this.getSearch();
  }

  log(): void {
  }

  getSearch(): void {
    this.searchStr.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
    ).subscribe(data => {
      this.pictureService.paramList.query = data;
      this.searchService.searchQuery$.next(data);
    });
  }



}
