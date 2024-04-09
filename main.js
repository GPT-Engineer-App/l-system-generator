const axiomInput = document.getElementById("axiom");
const rulesInput = document.getElementById("rules");
const iterationsInput = document.getElementById("iterations");
const generateButton = document.getElementById("generate");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const outputDiv = document.getElementById("output");

function applyRules(str, rules) {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    result += rules[char] || char;
  }
  return result;
}

function generateLSystem(axiom, rules, iterations) {
  let result = axiom;
  for (let i = 0; i < iterations; i++) {
    result = applyRules(result, rules);
  }
  return result;
}

function drawLSystem(str) {
  const len = 5;
  const angle = Math.PI / 2;
  let pos = { x: canvas.width / 2, y: canvas.height };
  let dir = -Math.PI / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(pos.x, pos.y);

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === "F") {
      pos.x += len * Math.cos(dir);
      pos.y += len * Math.sin(dir);
      ctx.lineTo(pos.x, pos.y);
    } else if (char === "+") {
      dir += angle;
    } else if (char === "-") {
      dir -= angle;
    }
  }

  ctx.stroke();
}

function generate() {
  const axiom = axiomInput.value;
  const rulesText = rulesInput.value;
  const iterations = parseInt(iterationsInput.value);

  const rules = {};
  rulesText.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    rules[key] = value;
  });

  const lsystem = generateLSystem(axiom, rules, iterations);
  drawLSystem(lsystem);
  outputDiv.textContent = lsystem;
}

generateButton.addEventListener("click", generate);
generate();
