/**
 * index.js | template_index | *.myshopify.com/
 */

export default () => {
    console.log('ℹ️ This is the index template!')
    window.onscroll = () => myFunction();
    let header = document.querySelector('.headerTop');

    var sticky = header.offsetTop;

     function myfunction() {
        if(window.pageYOffset > sticky ){
            header.classList.add('sticky');
        }else {
            header.classList.remove('sticky');
        }
    }
};
