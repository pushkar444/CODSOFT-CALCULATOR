// A small calculator with no eval() — it keeps its own state and does the
// arithmetic itself. Works with the on-screen keys and the keyboard.

const valueEl = document.getElementById('value');
const exprEl  = document.getElementById('expr');
const keys    = document.querySelector('.keys');

const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

let current = '0';      // the number currently shown / being typed
let stored  = null;     // the left-hand value once an operator is chosen
let operator = null;    // the pending operator
let freshResult = false; // true right after "="
let replaceNext = false; // true right after an operator — next digit starts fresh

function render() {
  valueEl.textContent = current;
  exprEl.innerHTML = (stored !== null && operator)
    ? `${format(stored)} ${opSymbols[operator]}`
    : '&nbsp;';
}

// trim floating-point noise and keep the display a sensible length
function format(n) {
  if (!isFinite(n)) return 'Error';
  const rounded = Math.round((n + Number.EPSILON) * 1e10) / 1e10;
  let s = String(rounded);
  if (s.replace('-', '').replace('.', '').length > 12) {
    s = rounded.toPrecision(10).replace(/\.?0+$/, '');
  }
  return s;
}

function calculate(a, b, op) {
  switch (op) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return b === 0 ? NaN : a / b;
  }
}

function inputDigit(d) {
  if (freshResult) { current = '0'; freshResult = false; }
  if (replaceNext) { current = '0'; replaceNext = false; }

  if (d === '.') {
    if (!current.includes('.')) current += '.';
  } else if (current === '0') {
    current = d;
  } else if (current.replace('-', '').replace('.', '').length < 12) {
    current += d;
  }
  render();
}

function chooseOperator(op) {
  if (operator && !replaceNext) {
    // already mid-expression: resolve it before starting the next one
    const result = calculate(stored, parseFloat(current), operator);
    if (!isFinite(result)) return showError();
    stored = result;
  } else {
    stored = parseFloat(current);
  }
  operator = op;
  current = format(stored);
  replaceNext = true;
  freshResult = false;
  highlight(op);
  render();
}

function equals() {
  if (operator === null || stored === null) return;
  const result = calculate(stored, parseFloat(current), operator);
  if (!isFinite(result)) return showError();
  current = format(result);
  stored = null;
  operator = null;
  replaceNext = false;
  freshResult = true;
  clearHighlight();
  render();
  flash();
}

function percent() {
  current = format(parseFloat(current) / 100);
  replaceNext = false;
  render();
}

function backspace() {
  if (freshResult || replaceNext) return;
  current = current.length > 1 ? current.slice(0, -1) : '0';
  if (current === '-') current = '0';
  render();
}

function clearAll() {
  current = '0';
  stored = null;
  operator = null;
  freshResult = false;
  replaceNext = false;
  clearHighlight();
  render();
}

function showError() {
  valueEl.textContent = "Can't divide by 0";
  exprEl.innerHTML = '&nbsp;';
  stored = null; operator = null;
  setTimeout(clearAll, 1200);
}

function flash() {
  valueEl.classList.remove('flash');
  void valueEl.offsetWidth; // restart the animation
  valueEl.classList.add('flash');
}

function highlight(op) {
  clearHighlight();
  const btn = keys.querySelector(`[data-op="${op}"]`);
  if (btn) btn.classList.add('active');
}
function clearHighlight() {
  keys.querySelectorAll('.key-op.active').forEach(b => b.classList.remove('active'));
}

// one click listener for the whole keypad
keys.addEventListener('click', (e) => {
  const btn = e.target.closest('.key');
  if (!btn) return;
  if (btn.dataset.num !== undefined) return inputDigit(btn.dataset.num);
  if (btn.dataset.op !== undefined) return chooseOperator(btn.dataset.op);
  switch (btn.dataset.action) {
    case 'equals':  return equals();
    case 'clear':   return clearAll();
    case 'back':    return backspace();
    case 'percent': return percent();
  }
});

// keyboard support
window.addEventListener('keydown', (e) => {
  const k = e.key;
  if (k >= '0' && k <= '9') return inputDigit(k);
  if (k === '.') return inputDigit('.');
  if (['+', '-', '*', '/'].includes(k)) return chooseOperator(k);
  if (k === 'Enter' || k === '=') { e.preventDefault(); return equals(); }
  if (k === 'Backspace') return backspace();
  if (k === 'Escape') return clearAll();
  if (k === '%') return percent();
});

render();
