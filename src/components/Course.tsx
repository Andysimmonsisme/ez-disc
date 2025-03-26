export interface CourseInterface {
    name: string;
    par: number[];
    defaultHoles: number;
}

export interface CourseProps {
    courses: CourseInterface[];
    selectedCourse: CourseInterface,
    setSelectedCourse: (course: CourseInterface) => void
}

function Course({courses, selectedCourse, setSelectedCourse}: CourseProps) {
  return (
    <section className='mb-4'>
      <label htmlFor='courseSelect' className='block text-lg mb-2'>
        Select Course
      </label>
      <select
        id='courseSelect'
        value={selectedCourse.name}
        onChange={(e) =>
          setSelectedCourse(
            courses.find((course) => course.name === e.target.value) ||
              courses[0]
          )
        }
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
