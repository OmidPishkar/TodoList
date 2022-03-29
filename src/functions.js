const getSaveTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    if (todoJSON !== null) {
        return JSON.parse(todoJSON)
    } else {
        return []
    }
}

const saveTodos = (todoArray) => {
    localStorage.setItem('todos', JSON.stringify(todoArray))
}

const renderTodos = (todoArray, textUser) => {
    todoParent.innerHTML = ''
    let found = todoArray.filter(item => {
        return item.title.toLowerCase().includes(textUser.toLowerCase())
    })
    found = found.filter(item => {
        if (filterSubject.sortData === 'all') {
            return true
        } else if (filterSubject.sortData === 'byComplete') {
            return item.done == true
        } else if (filterSubject.sortData === 'byUnComplete') {
            return item.done == false
        }
    })
    found.forEach(elem => {
        createNewTodo(elem)
    })
}

const removeTodo = id => {
    const foundIndex = todos.findIndex(elem => elem.id == id)
    if (foundIndex > -1) todos.splice(foundIndex, 1)
    saveTodos(todos)
}

const toggleTodo = todo => {
    const foundIndex = todos.findIndex(elem => elem.id == todo.id)
    if (foundIndex > -1) todo.done = !todo.done
    saveTodos(todos)
}
const createNewTodo = todoObject => {
    const li = document.createElement('li')
    const span = document.createElement('span')
    const div = document.createElement('div')
    const trash = document.createElement('i')
    const check = document.createElement('i')

    li.className = 'px-3 py-2 w-100'
    span.className = 'text-todo'
    span.textContent = todoObject.title
    div.className = 'icons-parent'
    trash.className = 'bx bxs-trash-alt'
    check.className = 'bx bx-check'

    trash.addEventListener('click', () => {
        removeTodo(todoObject.id)
        renderTodos(todos, filterSubject.textSearch)
    })

    check.addEventListener('click', () => {
        toggleTodo(todoObject)
        renderTodos(todos, filterSubject.textSearch)
    })

    div.appendChild(trash)
    div.appendChild(check)
    li.appendChild(span)
    li.appendChild(div)
    todoParent.appendChild(li)

    if (todoObject.done) li.classList.add('completed')
    if (!todoObject.done) li.classList.remove('completed')
}

const addNewTodo = inputValue => {
    todos.unshift({ title: inputValue, done: false, id: uuidv4() })
    saveTodos(todos)
    renderTodos(todos, filterSubject.textSearch)
}