// import Student from './students';
// import Login from './login';
// function App() {
//   return (
//     <div className="flex flex-col text-center">
//       <Student/>
//     </div>  
//     )
// }

// App.js
// import React, { useState } from 'react';
// import Student from './students';
// import Login from './login';

// function App() {
//   const [showStudent, setShowStudent] = useState(true);

//   return (
//     <div className="flex flex-col text-center">
//       <button onClick={() => setShowStudent(!showStudent)}>
//         {showStudent ? 'Go to Login' : 'Go to Student'}
//       </button>
//       {showStudent ? <Student /> : <Login />}
//     </div>
//   );
// }

// export default App;


//export default App;


// App.js
import React, { useState } from 'react';
import Student from './students';
import Login from './login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="flex flex-col text-center">
      {isLoggedIn ? <Student /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
