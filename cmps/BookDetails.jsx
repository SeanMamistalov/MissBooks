export function BookDetails({ book, onClose }) {
    return <section className="book-details">
        <button onClick={onClose}>X</button>
        <h3>Title: {book.title}</h3>
        <p>
            Price: {book.price}<br />
            Description: {book.description}<br />
            Amount: {book.listPrice.amount}<br />
            Currency Code: {book.listPrice.currencyCode}<br />
            On Sale: {book.listPrice.isOnSale ? 'Yes' : 'No'}
        </p>
        <img src={`BooksImages/${book.title}.jpg`} alt="" />
    </section>
}