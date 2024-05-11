export function BookDetails({ book, onClose }) {
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currYearDiff = currentYear - book.publishedDate

    const { listPrice } = book
    function bookLevel() {
        return book.pageCount > 500 ? 'Serious Reading'
            : book.pageCount > 200 ? 'Descent Reading'
                : 'Light Reading';
    }

    return <article className='book-details'>
        <h3>{book.title}</h3>
        <span>{currYearDiff > 10 ? 'Vintage Book' : 'New Book'}</span>
        <h4>{bookLevel()}</h4>
        <img src={book.thumbnail} alt="" />
        <span className={listPrice.amount > 200 ? 'highPrice' : 'lowPrice'}>
            <span className='rubric'>Price: </span>
            {listPrice.amount}
        </span>
        <span><span className='rubric'>Currency:</span> {listPrice.currencyCode}</span>
        <span><span className='rubric'>Language:</span> {book.language}</span>
        <span><span className='rubric'>Categoric:</span> {book.categories}</span>
        <span><span className='rubric'>Authors:</span> {book.authors}</span>
        <p><span className='rubric'>Description:</span> {book.description}</p>
        <button onClick={onClose} className='close'>x</button>
    </article>
}