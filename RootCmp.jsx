const { useState } = React;

const { Route, Routes }  = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { BookIndex } from "./pages/BookIndex.jsx";
import { AboutUs } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";
import { BookEdit } from "./pages/BookEdit.jsx";
import { AppHeader } from "./cmps/AppHeader.jsx";
import { BookDetails } from "./cmps/BookDetails.jsx";

export function RootCmp() {
    const [route, setRoute] = useState("Books");
  
    return (
      <Router>
        <AppHeader />
        <main className="content-grid">
          <Routes>
          <Route path="/" element= { <Home /> }/>
          <Route path="/book" element= { <BookIndex /> }/>
          <Route path="/about" element= { <AboutUs /> }/>
          {/* <Route path='/book/edit' element={<BookEdit />} /> */}
          {/* <Route path="/book/:bookId" element={<BookDetails />} /> */}
          </Routes>
        </main>
      </Router>
    );
  }
  