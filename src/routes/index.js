import {createBrowserRouter} from 'react-router-dom'
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';



const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    
   
  ]
  
  );
  
  export default router
