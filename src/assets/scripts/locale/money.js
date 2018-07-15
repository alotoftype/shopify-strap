/**
 * Currency Converter
 * Used by Locale component for currency exchange rates.
 */

/* Modules */
import fx from "money";
import accounting from "accounting";
import symbol from 'currency-symbol-map';
import store from 'store/dist/store.modern';

export default class Money {

   constructor() {
      this.code = store.get('locale').currency;
      this.prices = document.querySelectorAll('span.money');
      this.codes = document.querySelectorAll('span.codes');
      this.convert();
   }


   convert() {
      fx.rates = Currency.rates;
      this.prices.forEach(price => this.conversion(price));
      this.codes.forEach(code => code.innerHTML = this.code);
   }

   conversion(price) {

      // Make conversion
      const value = accounting.unformat(price.dataset.base);
      const convert = fx(value).from(this.code).to(config.locale.currency.base);
      const round = accounting.toFixed(convert, 0);
      const amount = accounting.formatMoney(round, {
         symbol: symbol(this.code),
         format: '%s %v',
         precision: 2,
         thousand: ','
      });

      // Change Prices
      if (this.code !== config.locale.currency.base) {
         price.dataset.currency = this.code;
         price.innerHTML = amount;
      } else {
         if (price.dataset.currency !== config.locale.currency.base) {
            price.dataset.currency = this.code;
            price.innerHTML = `€ ${price.dataset.base}`;
         }
      }
   }
}
