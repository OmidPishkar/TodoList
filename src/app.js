const todos = getSaveTodos()

const filterSubject = {
    textSearch: '',
    sortData: 'all'
}

const searchInput = document.querySelector('.search-input')
const todoParent = document.querySelector('#todo-parent')
const form = document.querySelector('#todo-form')
const sort = document.querySelector('#sort-select')

searchInput.addEventListener('input', event => {
    filterSubject.textSearch = event.target.value
    renderTodos(todos, filterSubject.textSearch)
})

form.addEventListener('submit', event => {
    event.preventDefault()
    const inputValue = event.target.elements.addTodo
    addNewTodo(inputValue.value)
    inputValue.value = null
})

sort.addEventListener('change', event => {
    filterSubject.sortData = event.target.value
    renderTodos(todos, filterSubject.textSearch)
})

renderTodos(todos, filterSubject.textSearch)