import React, {useState} from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Нажали {count} раз</p>
      <button>Увелилчить</button>
      <button>Уменьшить</button>
    </div>
  );
}

export default Counter