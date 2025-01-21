window.onload = () => {
    const form = document.getElementById('todoForm');
    const ul = document.getElementById('todoList');
    let todos = [];

   

    const handleUpdate = (todo) => {
        if (!todo.isUpdating) {
              const index = todos.findIndex(t => t.id === todo.id);
        todos[index].isUpdating = true;
        }
      
        refetch();
        console.log(todo);
    };
    const handleDelete = ({ id }) => {
        todos = todos.filter(todo => todo.id !== id);    
        refetch();
    };
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
                // Editing mode
                const input = document.createElement('input');
                input.value = todo.name;
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
                
            updateBtn.onclick = () => handleUpdate(todo);
            li.appendChild(updateBtn);
            li.appendChild(deleteBtn);

            ul.appendChild(li);
        });
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
            refetch();
        }
        form.reset();
    };
};
