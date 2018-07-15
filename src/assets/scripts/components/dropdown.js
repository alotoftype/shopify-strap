/**
* Vanilla Dropdown Component
* Handles Dropdowns, toggles etc.
*
*/

export default class Dropdown {

  constructor(){
    this.toggle = document.querySelectorAll('button[data-dropdown]');
    this.toggle.forEach(toggle => {
      this.init(toggle, document.getElementById(toggle.dataset.dropdown));
    });
  }

  init(toggle, dropdown) {
    toggle.onclick = () => Dropdown.toggle(toggle, dropdown);
    Dropdown.bodyClick(toggle, dropdown);
  };

  static toggle(button, dropdown) {
    if (!button.classList.contains("active")) {
      button.classList.add("active");
      dropdown.style.display = 'block';
    } else {
      button.classList.remove("active");
      dropdown.removeAttribute('style');
    }
  }

  static bodyClick(button, dropdown){
    document.addEventListener("click", (event) => {
      if (event.target !== button && !button.contains(event.target))
      if (button.classList.contains("active")) {
        button.classList.remove("active");
        dropdown.removeAttribute('style');
      }
    });
  }

}
