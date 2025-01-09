import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Stats from './components/Stats.jsx';
import Home from './components/Home.jsx';
import Table from './components/Table.jsx';
import Teams from './components/Teams.jsx';
import TopScorers from './components/TopScorers.jsx';
import TopAssists from './components/TopAssists.jsx';
import TopYellowCards from './components/TopYellowCards.jsx';
import TopRedCards from './components/TopRedCards.jsx';
import Header from './components/Header.jsx'; // Import the Header component

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'>
    <Route element={<Header />}> {/* Include Header here */}
      <Route element={<Home />} index />
      {/* <Route element={<Stats />} path='stats'></Route> */}
      <Route element={<Table />} path='table' />
      <Route element={<Teams />} path='teams' />
      <Route element={<TopScorers />} path='topScorers' />
      <Route element={<TopAssists />} path='topAssists' />
      <Route element={<TopYellowCards />} path='topYellowCards' />
      <Route element={<TopRedCards />} path='topRedCards' />
    </Route>
  </Route>
));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);