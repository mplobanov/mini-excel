import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {UploadPage} from "./pages/UploadPage/UploadPage";
import {TablePage} from "./pages/TablePage/TablePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path={"/"} element={<UploadPage />} />
          <Route path={"/:fileId"} element={<TablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
