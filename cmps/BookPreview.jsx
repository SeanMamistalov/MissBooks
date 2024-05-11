export function BookPreview({ book }) {
    const defaultImageSrc = 'assets/booksimages/default-image.jpg'
    return (
        <article className="book-preview">
            <h3>Title: {book.title}</h3>
            <p>
                Price: {book.listPrice.amount}<br />
                Currency Code: {book.listPrice.currencyCode}<br />
                On Sale: {book.listPrice.isOnSale ? 'Yes' : 'No'}
            </p>
            <img
                src={`assets/booksimages/${book.title}.jpg`}
                alt=""
                onError={(e) => {
                    e.target.src = defaultImageSrc
                }}
            />
        </article>
    );
}