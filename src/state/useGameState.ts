import { useState, useEffect } from 'react';
import { CourseInterface } from '../components/Course';

interface Scores {
  player: string;
  scores: number[];
}

export interface Game {
  id: number;
  course: CourseInterface;
  date: Date;
  scores: Scores[];
}

export const useGameState = (courses: CourseInterface[]) => {
  const [coursePar, setCoursePar] = useState<number>(0);
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  const [scores, setScores] = useState<number[][]>([]);
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [totalHoles, setTotalHoles] = useState(selectedCourse.defaultHoles);

  useEffect(() => {
    setTotalHoles(selectedCourse.defaultHoles);
    setCoursePar(
      selectedCourse.par.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      )
    );
  }, [selectedCourse]);

  useEffect(() => {
    setCoursePar(
      selectedCourse.par
        .slice(0, totalHoles)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );
  }, [totalHoles]);

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      setPlayers([...players, newPlayerName.trim()]);
      setScores([...scores, Array(totalHoles).fill(0)]);
      setNewPlayerName('');
    }
  };

  const handleScoreChange = (
    playerIndex: number,
    holeIndex: number,
    change: number
  ) => {
    setScores((prevScores) =>
      prevScores.map((playerScores, i) =>
        i === playerIndex
          ? playerScores.map((score, j) => {
              if (j === holeIndex) {
                const newScore = score + change;

                // first setting score with minus sign
                if (newScore < 0) {
                  return selectedCourse.par[holeIndex] - 1;
                }
                // first setting score with plus sign
                else if (score === 0 && newScore === 1) {
                  return selectedCourse.par[holeIndex];
                }

                return score + change;
              }
              return score;
            })
          : playerScores
      )
    );
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    setScores(scores.filter((_, i) => i !== index));
  };

  const saveGame = () => {
    if (!players.length) return;
    let games: Game[] = JSON.parse(localStorage.getItem('games') || '[]');
    const lastGameId = games.length ? games[games.length - 1].id : 0;
    const playerScores: Scores[] = [];

    players.forEach((player: string, i: number) => {
      playerScores.push({
        player: player,
        scores: scores[i],
      });
    });

    setCurrentGameId((prevGameId) => prevGameId ?? lastGameId + 1);

    // game has already been saved
    if (currentGameId) {
      games = games.map((game) => {
        if (game.id === currentGameId) return { ...game, scores: playerScores };

        return game;
      });
    }
    // game hasn't been saved
    else {
      games.unshift({
        id: lastGameId + 1,
        course: selectedCourse,
        date: new Date(),
        scores: playerScores,
      });
    }
    localStorage.setItem('games', JSON.stringify(games));
    setIsModalOpen(true);
  };

  const startNewGame = () => {
    setCurrentGameId(null);
    setPlayers([]);
    setScores([]);
  };

  return {
    coursePar,
    currentGameId,
    isModalOpen,
    newPlayerName,
    players,
    scores,
    selectedCourse,
    totalHoles,
    handleAddPlayer,
    handleScoreChange,
    removePlayer,
    saveGame,
    startNewGame,
    setNewPlayerName,
    setSelectedCourse,
    setTotalHoles,
    setIsModalOpen,
  };
};
