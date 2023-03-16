const todoInput = document.querySelector('#itemInput')
const addBtn = document.querySelector('#addButton')
const clearBtn = document.querySelector('#clearButton')
let todoListElement = document.querySelector('#todoList')
let todosArray = []

const addTodo = () => {
    if (!todoInput.value) {
        return
    } else {
        const newTodoTitle = todoInput.value;
        const todoObj = {
            id: todosArray.length + 1,
            title: newTodoTitle,
            complete: false
        };
        todosArray.push(todoObj);
        setLocalStorage(todosArray);
        todosGenerator(todosArray);
        todoInput.value = '';
        todoInput.focus();
    }
};

const setLocalStorage = (todosList) => {
    localStorage.setItem('todos', JSON.stringify(todosList));
};

const clearAll = () => {
    localStorage.removeItem('todos');
    todosArray = [];
    todoListElement.innerHTML = '';
};

const deleteTodo = (id) => {
    const index = todosArray.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todosArray.splice(index, 1);
        setLocalStorage(todosArray);
        todosGenerator(todosArray);
    }
};

const todosGenerator = (todosList) => {
    todoListElement.innerHTML = '';
    let newLi, newLabel, newCompleteBtn, newDeleteBtn;
    todosList.forEach(todo => {
        newLi = document.createElement('li');
        newLi.id = todo.id; // Set the ID of the <li> element to the todo's ID
        if (todo.complete) { // Add completed class to li element if todo is completed
            newLi.classList.add('completed');
        }
        newLabel = document.createElement('label');
        newLabel.innerHTML = todo.title;
        newCompleteBtn = document.createElement('button');
        newCompleteBtn.id = 'btnComplete';
        if(todo.complete){
            newCompleteBtn.innerHTML = 'done';
            newCompleteBtn.style.opacity = '0.5'
        }else{
            newCompleteBtn.innerHTML = 'Complete';
        }
       
        newCompleteBtn.classList.add('completeBtn');
        newDeleteBtn = document.createElement('button');
        newDeleteBtn.id = 'btnDelete';
        newDeleteBtn.classList.add('deleteBtn');
        newDeleteBtn.innerHTML = 'delete';

        newLi.append(newLabel, newCompleteBtn, newDeleteBtn);
        todoListElement.append(newLi);
    });
};

const getLocalStorage = () => {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    todosArray = localTodos || [];
    todosGenerator(todosArray);
};

addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearAll);
window.addEventListener('load', getLocalStorage);

todoListElement.addEventListener('click', (e) => {
    if (e.target.className === 'deleteBtn') {
        const todoId = parseInt(e.target.parentNode.id);
        deleteTodo(todoId);
    } else if (e.target.className === 'completeBtn') {
        console.log(typeof (e.target.parentNode.id));
        const todoId = parseInt(e.target.parentNode.id);
        const todoIndex = todosArray.findIndex(todo => todo.id === todoId);
        if (todoIndex !== -1) {
            todosArray[todoIndex].complete = true;
            setLocalStorage(todosArray);
            e.target.parentNode.classList.add('completed');
            e.target.innerHTML = 'done';
            e.target.style.opacity = '0.5'
        }
    }
});


todoInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        addTodo();
    } else {
        return;
    }
});
