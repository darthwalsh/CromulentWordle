"use strict";
function $(id) {
  return document.getElementById(id);
}

/**
 * @param {HTMLElement} parent
 * @param {string} name
 * @param {Object.<string, string>} attributes
 */
function create(parent, name, attributes = {}) {
  const node = document.createElement(name);
  parent.appendChild(node);
  for (const prop in attributes) {
    node.setAttribute(prop, attributes[prop]);
  }
  return node;
}

console.log("TODO");
