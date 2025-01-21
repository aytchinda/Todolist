window.onload = () => {
    const form = document.getElementById('todoForm');
    let todos = [];
    const refetch = () => {
        // const ul = document.querySelector('ul');
        const ul = document.getElementById('todoList');
       
        ul.innerHTML = '';
        todos.forEach((todo) => {
            ul.innerHTML += 
            ` <li>
                <span> ${todo.name} 5 </span>
                <button class="btn btn-primary">Update</button>
                <button class="btn btn-danger">Delete</button>
            </li>
            `
        });
    }
    // form.addEventListener('submit', (e) => {});
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