import { CourseInterface } from "../components/Course";

  export const courses: CourseInterface[] = [
    {
      name: 'Boyd Hill',
      defaultHoles: 18,
      par: Array(18).fill(3),
    },
    {
      name: 'Fewell Park',
      defaultHoles: 9,
      par: Array(18).fill(3),
    },
    {
      name: 'Westminster Park',
      defaultHoles: 18,
      par: [3, 3, 3, 5, 4, 3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 3, 3],
    },
    {
      name: 'Winget Park',
      defaultHoles: 18,
      par: [3, 3, 3, 3, 3, 3, 3, 4, 4, 3, 3, 4, 3, 4, 3, 3, 3, 3],
    },
    {
      name: 'Winthrop Meadows',
      defaultHoles: 18,
      par: [3, 3, 3, 3, 3, 3, 3, 3, 4, 3, 3, 4, 4, 3, 3, 3, 5, 3],
    },
  ];