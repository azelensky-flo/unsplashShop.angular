import {Component, OnInit} from '@angular/core';
import {Order, PictureDate, Preloader} from '../../interfaces/Interfaces';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {PromotionalCodeService} from '../../services/promotional-code.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shopItemsBay: PictureDate[] = [];
  sumAllItems = 0;
  promocodeValue = {
    value: '',
    discount: false
  };
  promocode: FormControl = new FormControl({value: '', disabled: false});
  preloader: Preloader = {
    status: false,
    color: 'accent',
    mode: 'indeterminate',
    value: 50
  };
  successBuy = 1;
  proceedBuy = false;
  order: Order;

  constructor(
    private router: Router,
    private http: HttpClient,
    private promotionalCodeService: PromotionalCodeService
  ) {
  }


  ngOnInit(): void {
    this.restoreLocalStorage();
    this.setSumItems();
    this.setPromocodeValue();
  }

  restoreLocalStorage = () => {
    const stateAsString = localStorage.getItem('itemForBay');
    if (stateAsString !== null) {
      this.shopItemsBay = JSON.parse(stateAsString);
    } else {
      this.shopItemsBay = [];
    }
  }


  setSumItems(): void {
    this.shopItemsBay.map(item => {
      this.sumAllItems += item.width;
    });
  }

  setPromocodeValue(): void {
    this.promocode.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(data => {
      this.promocodeValue.value = data;
      this.checkPromocode();
    });
  }

  applyPromocode(): void {
    if (this.promocodeValue.discount) {
      const discount = +this.promocodeValue.value.slice(5, 7);
      this.sumAllItems = this.sumAllItems - (this.sumAllItems / 100 * discount);
      this.promocodeValue.discount = false;
    }
  }

  clearForm(): void {
    this.sumAllItems = 0;
    this.setSumItems();
  }

  bayPicture(): void {
    this.preloader.status = true;
    // this.randomSuccessBuy();
    setTimeout(() => {
      this.preloader.status = false;
      // this.randomSuccessBuy();
      this.proceedBuy = true;
      if (this.successBuy === 1) {
        this.createServerLogOrder();
        localStorage.clear();
        this.restoreLocalStorage();
        this.sumAllItems = 0;
      }
    }, 1500);
  }


  saveLocalStorage(): void {
    const stateAsString = JSON.stringify(this.shopItemsBay);
    localStorage.setItem('itemForBay', stateAsString);
  }

  deleteItem(id): void {
    this.shopItemsBay = this.shopItemsBay.filter(item => {
      return item.id !== id;
    });
    this.saveLocalStorage();
    this.sumAllItems = 0;
    this.setSumItems();
  }

  randomSuccessBuy(): void {
    this.successBuy = Math.floor(Math.random() * Math.floor(2));
  }

  createServerLogOrder(): void {
    const date = Date().toString();
    const order = {
      shopItemsBay: this.shopItemsBay,
      sumAllItems: this.sumAllItems,
      dateBuy: date,
    };
    const url = `${environment.apiUrl}api/order`;
    this.http.post(url, order).subscribe();
  }

  checkPromocode(): void {
    this.promotionalCodeService.checkPromotionalCode(this.promocodeValue.value)
      .subscribe(result => {
        this.promocodeValue.discount = result.discount;
      });
  }


  log(): void {
    console.log(this.order);
  }

}
