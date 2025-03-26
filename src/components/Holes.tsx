interface HolesProps {
    totalHoles: number,
    setTotalHoles: (totalHoles: number) => void
}

function Holes({totalHoles, setTotalHoles}: HolesProps) {
  return (
    <section className='mb-4 flex items-center space-x-4'>
      <button
        onClick={() => setTotalHoles(9)}
        className={`px-4 py-2 rounded ${
          totalHoles === 9
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 hover text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        9 Holes
      </button>
      <button
        onClick={() => setTotalHoles(18)}
        className={`px-4 py-2 rounded ${
          totalHoles === 18
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        18 Holes
      </button>
    </section>
  );
}

export default Holes;