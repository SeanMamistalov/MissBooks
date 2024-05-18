const { useState, useEffect } = React

import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

export function BookIndex() {
    const [books, setBooks] = useState([])
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [selectedBook, setSelectedBook] = useState(null)

    useEffect(() => {
        bookService.query(filterBy)
            .then(books => setBooks(books))
    }, [filterBy])

    function onSetFilterBy(newFilter) {
        setFilterBy(newFilter)
    }

    function removeBook(bookId) {
        bookService.remove(bookId)
            .then(() => setBooks(prevBooks => prevBooks.filter(book => bookId !== book.id)))
    }

    function showBookDetails(book) {
        console.log(book)
        setSelectedBook(book)
    }

    return <div className='books-container'>
        <h2>Books list</h2>
        {!selectedBook && <BookFilter filterBy={filterBy} onFilterBy={onSetFilterBy} />}
        {!selectedBook && <BookList books={books} onRemove={removeBook} onDetails={showBookDetails} />}
        {selectedBook && <BookDetails book={selectedBook} onClose={() => setSelectedBook(null)} />}
    </div>
}