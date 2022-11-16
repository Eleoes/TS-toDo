import { v4 as uuidV4 } from 'uuid';

type Task = {
    id: string,
    title: string,
    completed: boolean,
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

// save all information to local storage so we can access it later
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

// create a new task using form
form?.addEventListener("submit", event => {
    event.preventDefault();
    //optional chaining applied to input element to handle null values
    if (input?.value == "" || input?.value == null) return
    // typescript knows that at this point it is impossible for our input to be null

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date(),
    }
    tasks.push(newTask);


    addListItem(newTask);
    input.value = ""; // to clear out the input value after submitting
})

// add a new task to the list
function addListItem(task: Task) {
    const item = document.createElement("li");
    const label = document.createElement("label");
    const checkbox = document.createElement("input");

    checkbox.addEventListener("change", () => {
        task.completed = checkbox.checked;
        saveTasks();
    })
    
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    label.append(checkbox, task.title);
    item.append(label);
    list?.append(item);

}

function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks() {
    const taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null) return [];
    return JSON.parse(taskJSON);
}