const { useState, useEffect } = React;

import { bookService } from '../services/book.service.js';
import { BookList } from '../cmps/BookList.jsx';
import { BookFilter } from '../cmps/BookFilter.jsx';

export function BookIndex() {
    const [books, setBooks] = useState([]);
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter());
  
    useEffect(() => {
        bookService.query(filterBy).then(books => setBooks(books));
    }, [filterBy]);
  
    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function removeBook(bookId){  
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId)))
    }

    return (
        <section className="book-index">
          <BookFilter filterBy={filterBy} onFilter={onSetFilterBy}/>
          {<BookList books={books} onRemove={removeBook}/>}
        </section>
    );
}
