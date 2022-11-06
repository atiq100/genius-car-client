
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Router/Routes/Routes';

function App() {
  return (
    <div className='max-w-screen-xl mx-auto' data-theme='light'>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
