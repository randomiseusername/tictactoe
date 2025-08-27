# TicTacToe — Angular demo

A small TicTacToe game built with Angular. Designed as a compact coding exercise / interview project demonstrating component-based architecture, standalone components, reactive state (signals) and a simple AI.

## Features
- Single-player (AI) mode and local two-player mode
- Standalone Angular components (Board, Controls, StatusBar)
- Game logic separated in `src/app/game/*` (rules, AI)

## Tech stack
- Angular (standalone components)
- TypeScript
- No backend required (static SPA)

## Quick start (Windows PowerShell)

1. Install dependencies:
```powershell
npm install

2. Start dev server:

ng serve

Open http://localhost:4200 in your browser.

How to use the app

    In the Controls panel select:
    Which mark you want to play (X or O).
    Mode: "Solo (IA)" or "Deux joueurs".
    Click "Commencer" to start a game.
    In Solo mode the AI will play automatically when it is its turn.
    "Rejouer" restarts the current configuration.