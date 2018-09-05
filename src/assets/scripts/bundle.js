/* Components */
import App from 'components/app';
//import Locale from 'components/locale';
//import AjaxCart from 'components/ajax-cart';
import Dropdown from 'components/dropdown';

/* Templates */
import Article from 'templates/article';
import Blog from 'templates/blog';
import Cart from 'templates/cart';
import Challenge from 'templates/challenge';
import Collection from 'templates/collections';
import Customers from 'templates/customers';
import GiftCard from 'templates/gift-card';
import Index from 'templates/index';
import Page from 'templates/page';
import Password from 'templates/password';
import Product from 'templates/product';
import Search from 'templates/search';

App.start();
App.cache();
App.router({
    init: () => {},
    globals: () => {},
    "template_article": {
        onLoad: body => new Article()
    },
    "template_blog": {
        onLoad: body => new Blog()
    },
    "template_cart": {
        onLoad: body => new Cart()
    },
    "template_challenge": {
        onLoad: body => new Challenge()
    },
    "template_collection": {
        onLoad: body => new Collection(body)
    },
    "template_customers": {
        onLoad: body => new Customers(body)
    },
    "template_gift-card": {
        onLoad: body => new GiftCard()
    },
    "template_index": {
        onLoad: body => new Index()
    },
    "template_page": {
        onLoad: body => new Page(body)
    },
    "template_password": {
        onLoad: body => new Password()
    },
    "template_product": {
        onLoad: body => new Product()
    },
    "template_search": {
        onLoad: body => new Search()
    }
});