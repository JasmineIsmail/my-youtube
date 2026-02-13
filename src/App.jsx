
import React from 'react';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './utils/store';
import MainContainer from './components/MainContainer';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Body from './components/Body';
import WatchPage from './components/WatchPage';

const appRouter = createBrowserRouter([{
  path:"/",
  element:<MainContainer/>,
  children:[
    {
      path:"/",
      element:<Body/>
    },
    {
      path:"watch",
      element:<WatchPage/>
    }
  ]
  
  
  }])
const App = () => {
  return (
    <Provider store={store}>
    <div>
      
      <RouterProvider router={appRouter}>
      <Header/>
      <MainContainer/>
      </RouterProvider>
    </div>
    </Provider>
  )
}

export default App;