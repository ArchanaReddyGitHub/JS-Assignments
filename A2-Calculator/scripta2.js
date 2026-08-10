function showForm1() {
  document.getElementById("form1").style.display = "block";
  document.getElementById("form2").style.display = "none";
}

function showForm2() {
  document.getElementById("form1").style.display = "none";
  document.getElementById("form2").style.display = "block";
}

let num1;
let num2;

function getNumbers() {
  num1 = Number(document.getElementById("fnumber").value);
  num2 = Number(document.getElementById("snumber").value);
  //   return [(num1, num2)];
}

function add() {
  showForm1();
  //   let [num1, num2] = getNumbers();
  getNumbers();
  document.getElementById("result").innerHTML = "Addition : " + (num1 + num2);
}

function sub() {
  showForm1();
  //   let [num1, num2] = getNumbers();
  getNumbers();
  document.getElementById("result").innerHTML =
    "Subtraction : " + (num1 - num2);
}

function mul() {
  showForm1();
  //   let [num1, num2] = getNumbers();
  getNumbers();
  document.getElementById("result").innerHTML =
    " Multiplication:  " + num1 * num2;
}

function div() {
  showForm1();
  // let [num1, num2] = getNumbers();
  getNumbers();
  document.getElementById("result").innerHTML = " Division: " + num1 / num2;
}

function square() {
  showForm2();
  let n = Number(document.getElementById("number").value);

  document.getElementById("res").innerHTML = " Square: " + n * n;
}

function cube() {
  showForm2();
  let n = Number(document.getElementById("number").value);
  document.getElementById("res").innerHTML = " Cube: " + n * n * n;
}
