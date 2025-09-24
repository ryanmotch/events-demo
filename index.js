const bank = [];
const odds = [];
const evens = [];

function addToBank(number) {
  bank.push(number);
  render();
}

function sort() {
  const number = bank.shift();
  if (number % 2 === 0) {
    evens.push(number);
  } else {
    odds.push(number);
  }
}

function sortOne() {
  sort();
  render();
}

function sortAll() {
  while (bank.length) {
    sort();
  }
  render();
}

function NumberForm() {
  const $form = document.createElement("form");
  $form.innerHTML = `
    <label>
      Add a number to the bank
      <input name="number" type="number" />
    </label>
    <button type="submit" data-action="add"> Add number</button>
    <button type="submit" data-action="sortOne"> Sort 1</button>
    <button type="submit" data-action="sortAll"> Sort All</button>
  `;

  $form.addEventListener("submit", (event) => {
    event.preventDefault();
    const action = event.submitter.dataset.action;

    if (action === "add") {
      const data = new FormData($form);
      const number = data.get("number");
    
      if (number === null || number === "") return;
    
         addToBank(+number);
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });
    
   return $form;
}

function NumberInBank(n) {
  const $span = document.createElement("span");
  $span.textContent = n;
  return $span;
}

function NumberBank(label, numbers) {
  const $bank = document.createElement("section");
  $bank.classList.add("bank");
  $bank.innerHTML = `
    <h2>${label}</h2>
    <output></output>
  `;
  const $numbers = numbers.map(NumberInBank);
  $bank.querySelector("output").replaceChildren(...$numbers);

  return $bank;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
      <h1>Odds and Events</h1>
      <NumberForm></NumberForm>
      <NumberBank id="bank"></NumberBank>
      <NumberBank id="odds"></NumberBank>
      <NumberBank id="evens"></NumberBank>
    `;
  $app.querySelector("NumberForm").replaceWith(NumberForm());
  $app.querySelector("NumberBank#bank").replaceWith(NumberBank("Bank", bank));
  $app.querySelector("NumberBank#odds").replaceWith(NumberBank("Odds", odds));
  $app
    .querySelector("NumberBank#evens")
    .replaceWith(NumberBank("Evens", evens));
}
render();