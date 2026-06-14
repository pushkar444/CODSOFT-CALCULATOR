# Calculator

**CodSoft Web Development Internship · Level 1 · Task 3**

A working calculator built with **HTML, CSS and vanilla JavaScript**. It runs its
own small state machine for the arithmetic — **no `eval()`**.

---

## ✨ Features

- **Four operations** — add, subtract, multiply, divide
- **Two-line display** — a small line shows the running expression, the large line
  shows the current value
- **Left-to-right chaining** — e.g. `2 + 3 × 4 = 20`
- **Decimal support** with a single-dot guard
- **Percent**, **clear (AC)** and **backspace**
- **Float-noise trimming** — `0.1 + 0.2` correctly shows `0.3`
- **Divide-by-zero handling** — shows "Can't divide by 0" and resets
- **Full keyboard support** — digits, `+ - * /`, `Enter`/`=`, `Backspace`,
  `Esc` (clear), `%`
- **Active-operator highlight** and a subtle result animation
- **Responsive** and centred on any screen size

---

## 🛠 Built with

| Layer | Details |
|-------|---------|
| Markup | HTML5 — keypad uses `data-*` attributes to stay clean |
| Styling | CSS3 — CSS Grid keypad, custom properties, responsive |
| Logic | Vanilla JavaScript — a small state machine (no `eval`), one delegated click listener, global keyboard listener |
| Fonts | Fraunces (serif) + Inter (sans), via Google Fonts |

---

## 📁 Structure

```
calculator/
├── index.html          # display + keypad markup
├── css/
│   └── style.css       # calculator card, grid keypad, responsive
├── js/
│   └── calculator.js   # state machine, arithmetic, keyboard support
└── README.md
```

---

## ⌨️ How it works

The calculator keeps four pieces of state — the number being typed, a stored
left-hand value, the pending operator, and flags for "just pressed equals" and
"start a fresh operand". Pressing an operator resolves any pending operation
first, so chained input evaluates left-to-right. Results are rounded to remove
binary floating-point artefacts before display.

---

## ▶️ Run it

Open `index.html` directly, or serve the folder:

```bash
python -m http.server 8000
# visit http://localhost:8000
```

---

## 🎨 Design

Matches the rest of the repo — ivory card on ivory paper, ink digits, evergreen
operator and equals keys. Fraunces for the readout, Inter for the keys.

---

**Author:** Pushkar Kumar · pushkar.kumar.cs28@iilm.edu

`#codsoft` `#webdevelopment` `#internship`
