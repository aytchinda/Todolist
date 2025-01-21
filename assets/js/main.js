window.onload = () => {
    const form = document.getElementById('todoForm');
    let todos = [];

    const handleDelete = ({id}) => {
        console.log("ID to delete:", id);
        todos = todos.filter(todo  => todo.id !== id);
        refetch();
    };
    const refetch = () => {
        // const ul = document.querySelector('ul');
        const ul = document.getElementById('todoList');
       
        ul.innerHTML = '';
        todos.forEach((todo) => {
           
            const li = document.createElement('li');
            const span = document.createElement('span');
            span.innerHTML = todo.name;
            const updateBtn = document.createElement('button');
            updateBtn.innerText = 'Update';
            updateBtn.className = 'btn btn-primary';
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'Delete';   
            deleteBtn.className = 'btn btn-danger';
            deleteBtn.onclick = () => handleDelete(todo);
            
            li.appendChild(span);
            li.appendChild(updateBtn);
            li.appendChild(deleteBtn);

            ul.appendChild(li);
            
        });
    }

    form.onsubmit = (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        const todoName = input.value.trim();
        if (todoName) {
            const todo = {
                id: Math.round(Math.random() * 9999999999),
                name: todoName,
                updatedAt: null,
                createdAt: new Date(),
            };
            //on sauvegarde le todo 
            todos.push(todo);
            refetch();
        }
        form.reset();
    }
}