/* Modules */
import m from 'mithril';
import store from 'store/dist/store.modern';
import Locale from 'components/locale';

export default class Locality {

  constructor() {
    this.scandinavia = [];
    this.europe = [];
    this.asia_pacific = [];
    this.north_america = [];
    this.south_america = [];
    this.middle_east = [];
  }

  kebabCase(string) {
    return string.replace(/\s+/g, '-').toLowerCase();
  }

  customs(passport) {
    store.set('locale', passport);
    Locale.exchange();
  }

  locate(country) {
    this.customs({
      code: country ? config.rates[country].code : 'EU',
      currency: country ? config.rates[country].currency : 'EUR',
      country: country ? country : 'Europe',
      flag: country ? Countries[country].flag_path : config.asset_url + 'flag-eu.svg',
      shipping: country ? config.rates[country].shipping_rate : '0'
    });
  }

  continents() {
    Object.keys(config.rates).forEach(key => {
      switch (config.rates[key].continent) {
        case 'Scandinavia':
          this.scandinavia.push(key);
          break;
        case 'Europe':
          this.europe.push(key);
          break;
        case 'Asia Pacific':
          this.asia_pacific.push(key);
          break;
        case 'North America':
          this.north_america.push(key);
          break;
        case 'South America':
          this.south_america.push(key);
          break;
        case 'Middle East':
          this.middle_east.push(key);
          break;
      }
    });
  }

  destinations() {
    return {
      'Scandinavia': this.scandinavia,
      'Europe': this.europe,
      'Asia Pacific': this.asia_pacific,
      'North America': this.north_america,
      'South America': this.north_america,
      'Middle East': this.middle_east
    };
  }

  countries() {
    return [
      m('optgroup', {
        label: 'Scandinavia'
      }, [
        this.scandinavia.map(key => m('option', {
          value: key
        }, key))
      ]),
      m('optgroup', {
        label: 'Europe'
      }, [
        this.europe.map(key => m('option', {
          value: key
        }, key))
      ]),
      m('optgroup', {
        label: 'Asia Pacific'
      }, [
        this.asia_pacific.map(key => m('option', {
          value: key
        }, key))
      ]),
      m('optgroup', {
        label: 'North America'
      }, [
        this.north_america.map(key => m('option', {
          value: key
        }, key))
      ]),
      m('optgroup', {
        label: 'South America'
      }, [
        this.south_america.map(key => m('option', {
          value: key
        }, key))
      ]),
      m('optgroup', {
        label: 'Middle East'
      }, [
        this.middle_east.map(key => m('option', {
          value: key
        }, key))
      ])
    ];
  }
}
