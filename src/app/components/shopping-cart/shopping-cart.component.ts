import {Component, OnInit} from '@angular/core';
import {PictureDate, Preloader} from '../../interfaces/Interfaces';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shopItemsBay: PictureDate[] = [];
  sumAllItems = 0;
  promocodeValue;
  promocode: FormControl = new FormControl({value: '', disabled: false});
  preloader: Preloader = {
    status: false,
    color: 'accent',
    mode: 'indeterminate',
    value: 50
  };
  successBuy;
  proceedBuy = false;

  constructor(private router: Router) {
  }

  restoreLocalStorage = () => {
    const stateAsString = localStorage.getItem('itemForBay');
    if (stateAsString !== null) {
      this.shopItemsBay = JSON.parse(stateAsString);
    } else {
      this.shopItemsBay = [];
    }
  };

  ngOnInit(): void {
    this.restoreLocalStorage();
    this.setSumItems();
    this.setPromocodeValue();
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
      this.promocodeValue = data;
    });
  }

  applyPromocode(): void {
    const discount = +this.promocodeValue.slice(5, 7);
    this.sumAllItems = this.sumAllItems - (this.sumAllItems / 100 * discount);
  }

  clearForm(): void {
    this.sumAllItems = 0;
    this.setSumItems();
  }

  bayPicture(): void {
    this.preloader.status = true;
    this.randomSuccessBuy();
    console.log(this.successBuy);
    setTimeout(() => {
      this.preloader.status = false;
      this.randomSuccessBuy();
      this.proceedBuy = true;
      console.log(this.successBuy);
      if (this.successBuy === 1) {
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


  log(): void {
    // this.shopItemsBay.filter(item => {
    //   console.log(item);
    // });
  }

}
