import { BookPreview } from "./BookPreview.jsx"

export function BookList({ books, onRemove, onDetails }) {
    return <section className='books-list'>
        <ul>
            {books.map(book =>
                <li key={book.id}>
                    <BookPreview book={book} />
                    <button onClick={() => onRemove(book.id)} className='close'>x</button>
                    <button onClick={() => onDetails(book)}>Details</button>
                </li>
            )}
        </ul>
    </section>
}