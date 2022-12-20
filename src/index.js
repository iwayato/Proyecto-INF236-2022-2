import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Radon from './components/GettingData/Radon';
import Multi from './components/GettingData/Multi';
import BCMagee from './components/GettingData/BCMagee';
import BCMaap from './components/GettingData/BCMaap';
import Radiometro from './components/GettingData/Radiometro';
import MPGrimm from './components/GettingData/MPGrimm';
import ReportRadon from './components/Reports/ReportComponents/ReportRadon';
import ReportRadiometro from './components/Reports/ReportComponents/ReportRadiometro';
import ReportMulti from './components/Reports/ReportComponents/ReportMulti';
import ReportMPGrimm from './components/Reports/ReportComponents/ReportMPGrimm';
import ReportBCMagee from './components/Reports/ReportComponents/ReportBCMagee';
import ReportBCMaap from './components/Reports/ReportComponents/ReportBCMaap';
import 'bootstrap/dist/css/bootstrap.min.css';

const urlPost = 'http://18.214.103.65:8080/api/auth/login'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App urlPost = {urlPost}/>,
  },
  {
    path: "/radon",
    element: <Radon urlPost = {urlPost}/>,
  },
  {
    path: "/multi",
    element: <Multi urlPost = {urlPost}/>,
  },
  {
    path: "/bcmagee",
    element: <BCMagee urlPost = {urlPost}/>,
  },
  {
    path: "/bcmaap",
    element: <BCMaap urlPost = {urlPost}/>,
  },
  {
    path: "/radio",
    element: <Radiometro urlPost = {urlPost}/>,
  },
  {
    path: "/mpgrimm",
    element: <MPGrimm urlPost = {urlPost}/>,
  },
  {
    path: "/reportRadon",
    element: <ReportRadon/>,
  },
  {
    path: "/reportRadiometro",
    element: <ReportRadiometro/>,
  },
  {
    path: "/reportMulti",
    element: <ReportMulti/>,
  },
  {
    path: "/reportMPGrimm",
    element: <ReportMPGrimm/>,
  },
  {
    path: "/reportBCMagee",
    element: <ReportBCMagee/>,
  },
  {
    path: "/reportBCMaap",
    element: <ReportBCMaap/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider token = {'token'} router={router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
