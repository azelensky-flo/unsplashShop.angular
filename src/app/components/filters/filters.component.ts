import {Component, OnInit, Output} from '@angular/core';
import {FiltersService} from '../../services/filters.service';
import {FormControl, FormGroup} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  selectedColor: FormControl = new FormControl({value: '', disabled: true});
  selectOrientation: FormControl = new FormControl({value: '', disabled: true});

  colors = this.filterService.colors;
  orientations = this.filterService.orientations;

  constructor(
    private filterService: FiltersService,
    private searchService: SearchService,
  ) {
  }

  ngOnInit(): void {
    this.setSelectColor();
    this.setSelectOrientation();
    this.activeSelect();
  }

  setSelectColor(): void {
    this.selectedColor.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(data => {
      this.filterService.selectedColor$.next(data);
    });
  }

  setSelectOrientation(): void {
    this.selectOrientation.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(data => {
      this.filterService.selectedOrientation$.next(data);
    });
  }

  activeSelect(): void {
    this.searchService.searchQuery$
      .subscribe(value => {
        (value !== '') ?  this.selectedColor.enable() : this.selectedColor.disable();
        (value !== '') ?  this.selectOrientation.enable() : this.selectOrientation.disable();
      });

  }


}
