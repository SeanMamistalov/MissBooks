import { bookService } from "../services/book.service.js"
const { useParams, useNavigate } = ReactRouter

const { useState, useEffect } = React

export function BookEdit() {
    const [book, setBook] = useState(booksService.getEmptyBook())

    const params = useParams()
    const navigate = useNavigate()
    console.log('book:', book)

    useEffect(() => {
        if (!params.bookId) return

        booksService.get(params.bookId)
            .then(setBook)
    }, [])

    function onSave(ev) {
        ev.preventDefault()
        booksService.save(book)
            .then(() => navigate('/book'))
            .catch(() => {
                alert('Couldnt save book')
                navigate('/book')
            })
    }

    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        console.log('prop:', prop)
        console.log('type:', type)

        switch (type) {
            case 'range':
            case 'number':
                let listPrice
                value = +value
                if (prop === 'listPrice') {
                    listPrice = {
                        amount: value,
                        currencyCode: "EUR",
                        isOnSale: true
                    }
                    value = listPrice
                }
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBook(prevBook => ({ ...prevBook, [prop]: value }))
    }

    return <section className='book-edit'>
        <h2>Add Book</h2>
        <form onSubmit={onSave}>
            <label className='bold-txt' htmlFor="title">Title: </label>
            <input onChange={handleChange} value={book.title}
                id='title' type="text" name='title' />

            <label className='bold-txt' htmlFor="authors">Authors: </label>
            <input onChange={handleChange} value={book.authors}
                id='authors' type="text" name='authors' />

            <label className='bold-txt' htmlFor="price">Price: </label>
            <input onChange={handleChange} value={book.listPrice.amount}
                id='price' type="number" name='listPrice' />

            <label className='bold-txt' htmlFor="description">Description: </label>
            <input onChange={handleChange} value={book.description}
                id='description' type="text" name='description' />

            <label className='bold-txt' htmlFor="pages">Number of pages: </label>
            <input onChange={handleChange} value={book.pageCount}
                id='pages' type="number" name='pageCount' />

            <button>Save</button>
        </form>
    </section>
}