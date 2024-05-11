import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
const BOOK_KEY = 'bookDB'
_createBooks()
export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getCategoryStats,
    getAuthorStats
}
// For Debug (easy access from console):
// window.bs = bookService
function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(book => regExp.test(book.title))
            }
            if (filterBy.minPrice) {
                books = books.filter(book => book.price >= filterBy.minPrice)
            }
            return books
        })
}
function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(book => {
            book = _setNextPrevBookId(book)
            return book
        })
}
function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}
function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}
function getEmptyBook(title = '', price = '') {
    return { title, price }
}
function getDefaultFilter(filterBy = { txt: '', minPrice: '' }) {
    return { txt: filterBy.txt, minPrice: filterBy.minPrice }
}
function getCategoryStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByCategoryMap = _getBookCountByCategoryMap(books)
            const data = Object.keys(bookCountByCategoryMap).map(category => ({ title: category, value: bookCountByCategoryMap[category] }))
            return data
        })
}
function getAuthorStats() {
    return storageService.query(BOOK_KEY)
        .then(books => {
            const bookCountByAuthorMap = _getBookCountByAuthorMap(books)
            const data = Object.keys(bookCountByAuthorMap)
                .map(author =>
                ({
                    title: author,
                    value: Math.round((bookCountByAuthorMap[author] / books.length) * 100)
                }))
            return data
        })
}
function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        const titles = ['Between Here and Gone', 'GWENT', 'MAGIC LANTERN', 'Its Just A DOG', 'UNBORED', 'Holes', 'SCHISMS', 'FANTASY']
        const prices = [10, 15, 20, 25, 30]
        for (let i = 0; i < 20; i++) {
            const title = titles[utilService.getRandomIntInclusive(0, titles.length - 1)]
            books.push(_createBook(title, prices[utilService.getRandomIntInclusive(0, prices.length - 1)]))
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }
}
function _createBook(title, price) {
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()
    book.description = "placerat nisi sodales suscipit tellus"
    book.thumbnail = "http://ca.org/books-photos/20.jpg"
    book.listPrice = {
        amount: 109,
        currencyCode: "EUR",
        isOnSale: false
    }
    return book
}
function _setNextPrevBookId(book) {
    return storageService.query(BOOK_KEY).then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBookId = nextBook.id
        book.prevBookId = prevBook.id
        return book
    })
}
function _getBookCountByCategoryMap(books) {
    const bookCountByCategoryMap = books.reduce((map, book) => {
        if (!map[book.category]) map[book.category] = 0
        map[book.category]++
        return map
    }, {})
    return bookCountByCategoryMap
}
function _getBookCountByAuthorMap(books) {
    const bookCountByAuthorMap = books.reduce((map, book) => {
        if (!map[book.author]) map[book.author] = 0
        map[book.author]++
        return map
    }, {})
    return bookCountByAuthorMap
}