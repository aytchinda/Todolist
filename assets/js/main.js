window.onload = () => {
    const form = document.getElementById('todoForm');
    const ul = document.getElementById('todoList');

    const saveLocalData = (data) => {
        if("localStorage" in window) {
            localStorage.setItem('todos', JSON.stringify(data));
        }
    }
    const getLocalData = () => {
        if("localStorage" in window) {
            return JSON.parse(localStorage.getItem('todos') || '[]');
        }else{
            return [];
        }
    }

    const refetch = () => {
        ul.innerHTML = '';
        todos.forEach((todo) => {
            const li = document.createElement('li');

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.onclick = () => handleDelete(todo);

            const updateBtn = document.createElement('button');
            if (todo.isUpdating) {
                // UPDATE
                const input = document.createElement('input');
                input.value = todo.name;
                input.onchange = (event) => handleUpdate (event, todo);
              
                updateBtn.innerText = 'Save';
                updateBtn.className = 'btn btn-warning';
                updateBtn.onclick = () => {
                    todo.name = input.value.trim();
                    todo.isUpdating = false;
                    refetch();
                };
                li.appendChild(input);
            } else {
                // Display mode
                const span = document.createElement('span');
                span.innerHTML = todo.name;
                updateBtn.innerText = 'Update';
                updateBtn.className = 'btn btn-primary';
                li.appendChild(span);
            }
            updateBtn.onclick = () => toggleUpdate(todo);
            li.appendChild(updateBtn);
            li.appendChild(deleteBtn);

            ul.appendChild(li);
        });
    };
    let todos = getLocalData();
    refetch();
    const toggleUpdate = (todo) => {
            // AUTORISER LA MISE  JOUR
        const index = todos.findIndex(t => t.id === todo.id);
        todos[index].isUpdating = !todo.isUpdating;
        saveLocalData(todos);
    
        refetch();
        console.log(todo);
    };
    const handleUpdate = (event, todo) => {
       const name = event.target.value.trim();
       if(name) {
        todo.name = name
        todo.updatedAt = new Date();

        const index = todos.findIndex(t => t.id === todo.id);
        todos[index] = todo;

        saveLocalData(todos);
        
       }
       
    };
    const handleDelete = ({ id }) => {
        todos = todos.filter(todo => todo.id !== id);  
        saveLocalData(todos);  
        refetch();
    };
    
    form.onsubmit = (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const todoName = input.value.trim();
        if (todoName) {
            const todo = {
                id: Math.round(Math.random() * 9999999999),
                name: todoName,
                updatedAt: null,
                isUpdating: false,
                createdAt: new Date(),
            };
            todos.push(todo);
            saveLocalData(todos);
            refetch();
        }
        form.reset();
    };
};
