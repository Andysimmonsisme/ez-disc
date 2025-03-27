# EZ Disc
EZ Disc is a web application for tracking disc golf games. It allows users to add players, keep score for each hole, and view scores for each player. Users can also view and edit previous game scores.

## Features
Add Players: Add players to a game by entering their name.

Track Scores: Track scores for each hole of a course.

View Total Scores: See the total score for each player as well as the score relative to the course's par.

Save Game: Save your game locally, and view past games later.

Edit Mode: Modify scores while in edit mode.

Game History: View previously saved games.

## Tech Stack
Frontend: React (with Hooks & Context API), Tailwind CSS

State Management: React Context API

Build Tool: Vite

Local Storage: Persistent storage for saving game data.

## Installation & Setup

Clone the repository
`git clone https://github.com/Andysimmonsisme/ez-disc.git`

Navigate to the project directory
`cd ez-disc`

Install dependencies
`npm install`

Start the development server
`npm run dev`

## Usage
### Home Page
Select a course.

Add players to the game.

Select number of holes.

Track scores for each hole.

Save the game to local storage for later use.

### Games Page
Toggle between view and edit modes.

View previously saved games.

Each game shows the total score and score relative to the course's par.

### Edit Mode
Adjust the score for each hole by clicking "+" or "-" buttons.

Click "Remove" to remove a player from the game.

## Live Demo

https://ez-disc.netlify.app/
