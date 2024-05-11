import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
    query,
    remove,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regExp = new RegExp(filterBy.title, 'i')
                books = books.filter(car => regExp.test(books.title))
            }

            if (filterBy.minPrice) {
                books = books.filter(car => books.amount >= filterBy.minPrice)
            }

            return books
        })
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function getDefaultFilter(filterBy = { title: '', minPrice: 0 }) {
    return { title: filterBy.title, minPrice: filterBy.minPrice }
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY);
    if (!books || !books.length) {
        books = [];
        for (let i = 1; i <= 20; i++) {
            books.push({
                id: utilService.makeId(),
                title: `Book ${i}`,
                listPrice: {
                    amount: Math.floor(Math.random() * 500) + 50,
                    currencyCode: 'USD',
                    isOnSale: Math.random() > 0.5
                },
                img: `/assets/img/${i}.jpg`
            });
        }
        utilService.saveToStorage(BOOK_KEY, books);
    }
}
