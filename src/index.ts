const taskForm = document.querySelector<HTMLFormElement>('.form');  // See even listener to understand how TS works with query selector. We use Selector Validity, <HTMLFormElement> otherwise, TS doesn't know what the element will be. Incorrect select validity will result in returning null or not being able to use the methods you want.
const formInput = document.querySelector<HTMLInputElement>('.form-input');
const taskListElement = document.querySelector<HTMLUListElement>('.list');


type Task = {
    description: string;
    isCompleted: boolean; 
}

let tasks:Task[] = loadTaskFromStorage(); // load array of tasks from local storage.

// render the tasks if they exist in storage: tasks.forEach((task) => renderTask(task));  Or as follows:
tasks.forEach(renderTasks);

function loadTaskFromStorage():Task[] {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks? JSON.parse(storedTasks) : []; // if there are tasks in localStorage then parse the tasks otherwise return an empty string
}

function createTask(e:SubmitEvent) {
    e.preventDefault();
    const taskDescription = formInput?.value;
    if(taskDescription) {
        const task:Task = {
            description:taskDescription,
            isCompleted: false,
        };
        // add task to list
        addTask(task);
        // render tasks
        renderTasks(task);
        //update local storage
        updateStorage();
        formInput.value = '';
        return;        
    }
    alert('Please enter a task description')
}

function addTask(task:Task):void {
    localStorage.removeItem('task');
    tasks.push(task)
    updateStorage()
}

function removeTask(task:Task):void {
    tasks = tasks.filter(t => t.description !== task.description);
    //console.log(tasks);
    updateStorage()
}

function renderTasks(task:Task):void {
    const taskElement = document.createElement('li');
    taskElement.textContent = task.description;

    //checkbox
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.checked = task.isCompleted

    //toggle checkbox = note the type of the event is often inferred by the event listener based on the event type that is being listened to. But if we pass the function then the type can not be inferred.
    taskCheckbox.addEventListener('change', ()=> {
        task.isCompleted = !task.isCompleted; // inverts the task status from false to true(noting false is default)
        if (task.isCompleted) {
            removeTask(task);
            taskListElement?.removeChild(taskElement)

        }
    })

    taskElement.appendChild(taskCheckbox);
    taskListElement?.appendChild(taskElement);
}

function updateStorage():void {
    localStorage.setItem('tasks',JSON.stringify(tasks))
}

//submitting a task using the form - note: the function createTask will need to have the type of the event manually typed. ie. the createTask function takes the e parameter(the event) which we assiged the type of SubmitEvent.
taskForm?.addEventListener('submit', createTask); // Note the using query selector can mean we sometimes not having an element(null). So query selector can return the Element or null. So for any element we want to use, we must null check it i.e. taskform?addEventListener Other approach is to add the check at the end of when you initially grab the element i.e. after queryselector('.form)!; 



// More Notes

// Ensuring Element Existence in DOM
// If your script runs before the element is available in the DOM, you may need to wait until the DOM is fully loaded.
// document.addEventListener('DOMContentLoaded', () => {
//     const button = document.querySelector<HTMLButtonElement>('.my-button');
//     if (button) {
//         button.addEventListener('click', () => {
//             console.log('Button clicked!');
//         });
//     } else {
//         console.error('Button not found!');
//     }
// });

// Handling Dynamic Elements
// If the button might be added to the DOM dynamically after the initial load, you might need to use event delegation or re-select the button when necessary.
// Event delegation example
// document.body.addEventListener('click', (event) => {
//     if ((event.target as HTMLElement).matches('.my-button')) {
//         console.log('Button clicked!');
//     }
// });

// Using IDs for Unique Elements
// If the button is unique, prefer using an ID selector to avoid accidentally selecting multiple elements.
// const button = document.querySelector<HTMLButtonElement>('#unique-button');
