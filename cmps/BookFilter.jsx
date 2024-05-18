const { useEffect, useState, useRef } = React

export function BookFilter({ filterBy, onFilterBy }) {
    
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const initialFilterBy = useRef(filterBy)

    useEffect(() => {
        onFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name, type } = target
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: type === 'number' ? +target.value : target.value }))
    }

    function reset() {
        setFilterByToEdit(initialFilterBy.current)
    }

    return <section className='books-filter'>
        <h3>Filter</h3>
        <input onChange={handleChange} value={filterByToEdit.title} type="text" name='title' placeholder='Insert book name' />
        <input onChange={handleChange} value={filterByToEdit.minPrice} type="number" name='minPrice' placeholder='Insert book price' />
        <button onClick={reset}>Reset</button>
    </section>
}