import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

interface Urls {
  small: string;
  regular: string;
}

export interface PictureDate {
  id: string;
  urls: Urls;
  isChecked: boolean;
  width: number;
  height: number;
}

export interface ParamListPictures {
  page: number;
  per_page: number;
  query?: string;
  color?: string;
  orientation?: string;
}

export interface GetSearch {
  results: PictureDate[];
  total_pages: number;
  total: number;
}

export interface ColorFilter {
  value: string;
  viewValue: string;
}

export interface OrientationFilter {
  value: string;
  viewValue: string;

}

export interface Preloader {
  status: boolean;
  color: ThemePalette;
  mode: ProgressSpinnerMode;
  value: number;

}
