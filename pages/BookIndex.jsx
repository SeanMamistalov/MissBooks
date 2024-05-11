 const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

export function BookIndex() {
    const [books, setBooks] = useState([]);
  
    useEffect(() => {
      bookService.query().then(books => setBooks(books));
    }, []);
  
    return (
      <section className="book-index">
        <h1>Books</h1>
      </section>
    );
  }
  