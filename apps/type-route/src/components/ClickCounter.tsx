import { useState } from 'react';

export const ClickCounter = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => setCount(prev => prev + 1);

  return (
    <button type='button' className='px-4 py-1 bg-amber-500 rounded-xl shadow-md' onClick={handleClick}>
      {count} clicks
    </button>
  );
};
