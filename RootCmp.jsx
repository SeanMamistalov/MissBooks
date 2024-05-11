import { BookIndex } from "./pages/BookIndex.jsx";
import { AboutUs } from "./pages/About.jsx";
import { Home } from "./pages/Home.jsx";

const { useState } = React;

export function RootCmp() {
    const [route, setRoute] = useState("Books");
  
    return (
      <React.Fragment>
        <header>
          <h1>Miss Books</h1>
          <nav>
            <a onClick={() => setRoute("Home")} href="#">
              Home
            </a>
            <a onClick={() => setRoute("About")} href="#">
              About
            </a>
            <a onClick={() => setRoute("Books")} href="#">
              Books
            </a>
          </nav>
        </header>
  
        <main className="content-grid">
          {route === "Home" && <Home />}
          {route === "Books" && <BookIndex />}
          {route === "About" && <AboutUs />}
        </main>
      </React.Fragment>
    );
  }
  