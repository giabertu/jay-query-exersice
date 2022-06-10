'use strict';

var methods = {};

function J$ (selector) {
  if (typeof(selector) !== 'string' || !selector.length) return new Error();
  let elements = document.querySelectorAll(selector);
  elements = Array.prototype.slice.call(elements);
  elements = Object.assign(elements, methods)
  //elements.hide = hide;
  return elements;
}

J$.ready = function(event){
  document.addEventListener('DOMContentLoaded', event);
}


methods.addClass =  function (className) {
  this.forEach( el => {
    el.className += el.className.split(' ').includes(className) ? '' : ' ' + className;
  });
  return this; 
}

methods.removeClass = function (className) {
   this.forEach( el => {el.classList.remove(className)});
  return this; 
}

methods.toggleClass = function (className) {
  this.forEach(el => el.classList.toggle(className));
  return this;
}
methods.hide = function () {
  var array = {};
  this.forEach(el => {
/*     if (!el.style.display || el.style.display !== 'none'){
      array.push(el.style.display);
    } */
    if (el.style.display){
      el.style.oldDisplay = el.style.display;
    }
    el.style.display = 'none';
  })
  this.array = array;
  return this;
}

methods.show = function () {
/*   this.forEach(el => {
    if (el.style.oldDisplay && el.style.display == 'none') el.style.display = el.style.oldDisplay
  }) */
  this.forEach(el => {el.style.display =  el.style.display === 'none' ? 'inline' : el.style.display})
}


methods.toggle = function () {
  
  this.forEach(el => {
    let arrayEl = [el];
    if (el.style.display !== 'none') {
      methods.hide.call(arrayEl);
    } else {
      methods.show.call(arrayEl);
    }
  })
  return this; 
}

methods.click = function (handler) {
  this.forEach(el => {
    el.addEventListener('click', handler);
  })
  return this;
}

methods.append = function (html) {
  html = html.trim(); // Never return a text node of whitespace as the result
  this.forEach(el => {
    el.innerHTML += html;
  })
  return this;
  /* console.log(element);
  let div = document.createElement('div');
  div.innerHTML = element;
  console.log('The content inside our div: ' + div.innerHTML)
  let node = div.firstElementChild;
  console.log('This is our node: ' + node); */
  /* this.forEach(el => {
    console.log('This is an element inside this: ' + el, 'And its type: ' + typeof(el))
    el.appendChild(HTMLel);
  })  
  return this; */
}

//We are unable to make the method chainable whilst returning a value.
//How can we return both a string and a context?
methods.text = function(text) {
  console.log('This is the input: ' + text);
  console.log('This is the context: ' + this)
  if (!text){
    let array = this.map(el => {
      console.log('This is the element content: ' + el.textContent);
      return el.textContent;
    });
    return array.join(' ');
  }
  this.forEach(el => {
   el.textContent = text;
  })
  return this;
}
// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = J$;
}
