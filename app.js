const taskBox = document.querySelector('#todo-input');
const todoForm = document.querySelector('.todo-form');
const todoList = document.querySelector('.todo-task')
const todoTask = JSON.parse(localStorage.getItem('todo'))||[];
todoForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(taskBox.value.trim() !==''){
        addToDOM(taskBox.value,todoList)
        // adding to localStorage
        // addToLocalstorage (taskBox.value.todoTask);
    // clear dom
        e.target.reset();

    }
})
// delete task
// 

todoList.addEventListener('click', (e) =>{
    const target = e.target;

    if(target.matches('span.delete')){
        let removeTask = confirm('are you sure you want to delete this task');
        if(removeTask){
            target.parentElement.remove();
        }

        
    }

    // complete task

    if(target.matches('span.complete')){
       if(target.classList.contains('active')){
        target.classList.remove('active');
        target.innerHTML='';
        target.previousElementSibling.previousElementSibling.classList.remove('complete-task');
       }else{
        target.classList.add('active');
        target.innerHTML ='&check;'
        target.previousElementSibling.previousElementSibling.classList.add('complete-task');
       }
    }

    // edit handling
    if(target.matches('span.edit')){
        if(target.nextElementSibling.classList.contains('active')) return;
        const editForm = creatEditForm(target.previousElementSibling.textContent);
        target.parentNode.replaceChild(editForm,target.previousElementSibling);
        // focus the form
        const formInput =document.querySelector('input');
        formInput.focus();

        // submitting the form
        editForm.addEventListener('submit', (e)=>{
            e.preventDefault();
             if(formInput.value.trim() !== ''){
                const todo = document.createElement('span');
                todo.className='text';
                todo.append(taskBox.value);
                
                target.parentNode.replaceChild(todo,editForm);
             }
        })
    }
})

// creating edit form

function creatEditForm (inputValue){
    const editForm = document.createElement('form');
    editForm.className='edit-form';
    // creating edit input
    const editInput = document.createElement('input');
    editInput.value = inputValue;
    editForm.append(editInput);

    return editForm;

}


function addToDOM(task,ul,taskCompleted = 'false'){

        const li = document.createElement('li');
        const todo =document.createElement('span');
        todo.className='text';
        // if(taskCompleted) todo.classList.add('complete-task');
        todo.append(task);

        // complete button
        const todoComplete = document.createElement('span');
        todoComplete.className='complete';
        // taskCompleted && (todoComplete.innerHTML ='&check;');
        todoComplete.setAttribute('title','complete task')
        // edit button

        const todoEdit =document.createElement('span');
        todoEdit.className ='edit';
        todoEdit.innerHTML='&#9997;';
        todoEdit.setAttribute('title', 'edit task')
        //delete button
        const todoDelete = document.createElement('span');
        todoDelete.className='delete';
        todoDelete.innerHTML='&times;';
        todoDelete.setAttribute('title','delete task')
        li.append(todo)
        li.append(todoEdit);
        li.append(todoComplete);
        li.append(todoDelete)
        ul.append(li);

        
    
}