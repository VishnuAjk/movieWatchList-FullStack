import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Welcome from "./Pages/Welcome";
import Navbar from "./Components/Navbar";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home.jsx";
import MovieForm from "./Components/MovieFrom.jsx";
import MovieDetails from "./Pages/MovieDetails.jsx";


const movieRouter = createBrowserRouter([
  {path:"/", element:<Navbar/>, children:[
    {index:true, element:<Welcome/>},
    { path: 'user/signin', element: <SignIn /> },
    { path: 'user/signup', element: <SignUp /> },
    {
      path: 'home',
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path:"movies/add", element:(
        <ProtectedRoute>
          <MovieForm/>
        </ProtectedRoute>
      )
    },
    {
      path: 'movies/update/:movieId', // Dynamic parameter for editing movie
      element: (
        <ProtectedRoute>
          <MovieForm />
        </ProtectedRoute>
      ),
    },
    {
      path:'/movies/movieDetails/:movieId',
      element:( 
        <ProtectedRoute>
          <MovieDetails />
        </ProtectedRoute>
      
      )
    }

    
  ]}
])

function App() {
  return (
    <>
      <RouterProvider router={movieRouter}/>
    </>
  );
}

export default App;
