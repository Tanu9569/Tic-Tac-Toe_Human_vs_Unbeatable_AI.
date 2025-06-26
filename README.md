# 🤖 Tic-Tac-Toe Game: Human vs Unbeatable AI

This is a browser-based **Tic-Tac-Toe** game where a human player competes against an **unbeatable AI** opponent.  
The AI uses the **Minimax algorithm with Alpha-Beta Pruning**, making it impossible to defeat. The best a human can hope for is a draw.

<!-- Replace with actual path to your screenshot -->
![WhatsApp Image 2025-06-26 at 19 26 42_7b24e815](https://github.com/user-attachments/assets/69459c0e-1e94-440f-8ac5-72c4b488f9a5)

---

## 🎯 Objective

- Let users enjoy a classic game of Tic-Tac-Toe
- Demonstrate how the **Minimax algorithm** can be applied to create an unbeatable AI

---

## 🧠 Features

- 🔄 Choose your sign: Play as **X** or **O**
- 🤖 AI always plays optimally — no chance of winning against it!
- 🟩 Highlights winning combinations
- 🔁 Reset or play again with a click
- 💻 Simple, responsive UI design

---

## 🛠️ Technologies Used

- **HTML5** – structure of the web page  
- **CSS3** – styles for layout and game board  
- **JavaScript (ES6+)** – core game logic and interactivity  
- **DOM Manipulation** – to dynamically update game state  
- **Minimax Algorithm** – AI logic for optimal move selection  
- **Alpha-Beta Pruning** – optimization to reduce unnecessary calculations  

---

## 🚀 Getting Started

To run the game locally:

1. Clone this repository:
   ```bash
   git clone https://github.com/Tanu9569/Tic-Tac-Toe-Game.git
   cd Tic-Tac-Toe-Game


---
📂 Project Structure
bash
Copy
Edit
├── index.html          # Main HTML structure
├── style.css           # Styles and layout
├── app.js              # Game logic and AI
├── assets/
│   └── screenshot.jpg  # (Optional) Add game screenshot here
└── README.md
🧠 How the AI Works
The AI evaluates all possible outcomes using the Minimax algorithm and prunes unnecessary branches with Alpha-Beta Pruning. It simulates future moves and always chooses the one that maximizes its chances of winning or drawing.
