import { LongTxt } from "./LongTxt.jsx"

export function BookPreview({ book }) {
    const { listPrice } = book

    return <article className='book-prev'>
        <h3>{book.title}</h3>
        <img src={book.thumbnail} alt="" />
        <span><span className='rubric'>Price:</span> {listPrice.amount}</span>
        <span><span className='rubric'>Currency:</span> {listPrice.currencyCode}</span>
        <LongTxt txt={book.description} />
    </article>

}