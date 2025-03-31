import { useEffect, useState } from 'react';
import { courses } from '../data/courses';
import { useGame } from '../state/GameContext';

export interface CourseInterface {
  name: string;
  par: number[];
  defaultHoles: number;
}

export interface CourseProps {
  gameId: number;
}

function Course({ gameId }: CourseProps) {
  const { state, dispatch } = useGame();
  const [courseName, setCourseName] = useState(courses[0].name);

  useEffect(() => {
    const foundGame = state.games.find((game) => game.id === gameId);
    if (foundGame?.course?.name) {
      setCourseName(foundGame.course.name);
    }
  }, [gameId, state.games]);

  return (
    <section className='mb-4'>
      <label htmlFor='courseSelect' className='block text-lg mb-2'>
        Select Course
      </label>
      <select
        id='courseSelect'
        value={courseName}
        onChange={(e) => {
          setCourseName(e.target.value);
          dispatch({
            type: 'CHANGE_COURSE',
            payload: {
              gameId: gameId,
              course:
                courses.find((course) => course.name === e.target.value) ||
                courses[0],
            },
          });
        }}
        className='w-full p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white'
      >
        {courses.map((course) => (
          <option key={course.name} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
    </section>
  );
}

export default Course;
