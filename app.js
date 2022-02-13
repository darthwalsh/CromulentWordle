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

/** @type {Map<string, HTMLInputElement>} */
let rows = new Map();
function createGrid() {
  const tbody = $("grid");

  for (const s of "green yellow black".split(" ")) {
    const tr = create(tbody, "tr");

    for (let i = 0; i < 5; ++i) {
      const td = create(tr, "td");
      td.style.backgroundColor = s;
      const input = create(td, "input");
      input.oninput = updatePoss;
    }
  }
}

function green(c, i, s) {
  return s[i] == c;
}

function yellow(c, i, s) {
  return s[i] != c && s.includes(c);
}

function black(c, i, s) {
  return !s.includes(c);
}

const colorFilters = {
  green,
  yellow,
  black,
};

async function updatePoss() {
  let poss = await words;

  for (const tr of $("grid").children) {
    for (const [i, td] of [...tr.children].entries()) {
      const color = td.style.backgroundColor;
      const filter = colorFilters[color];

      const input = td.firstChild;
      for (const c of input.value) {
        poss = poss.filter(s => filter(c.toLowerCase(), i, s));
      }
    }
  }

  console.info('poss', poss.length);

  $("poss").textContent = poss.length ? [poss.length].concat(poss).join("\n") : "!!!None";
}

async function fetchWords() {
  const req = await fetch("words/wordle2k.txt"); // TODO allow custom?
  const text = await req.text();
  return text.trim().split("\n");
}

const words = fetchWords();
createGrid();
updatePoss();
