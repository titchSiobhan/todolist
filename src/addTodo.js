// import { createElement } from "react";

import { format } from 'date-fns';
import { listTypes, groupTasks } from './todoListType';

const mainArea = document.querySelector('#main');
format(new Date(), 'dd/mm/yyyy');
class addTodo {
	constructor(name, dueDate, description, priority, listType, complete = false) {
		this.name = name;
		this.dueDate = dueDate;
		this.description = description;
		this.priority = priority;
		this.listType = listType;
		this.complete = complete;
	}
}

const tasks = []; // module-level tasks array
// const taskOne = new addTodo(
// 	'Task One',
// 	new Date('2026-02-02'),
// 	'Test task',
// 	'low',
// 	'Work'
// );
// const taskTwo = new addTodo(
// 	'Add',
// 	new Date('2026-02-03'),
// 	'another Test',
// 	'high',
// 	'Household'
// );

const closeCard = document.createElement('div');
		closeCard.classList.add('close');
		closeCard.setAttribute('class', 'closeBtn')
		closeCard.textContent = 'X';
// tasks.push(taskOne, taskTwo);

function taskForm() {
	const taskFormContainer = document.createElement('div');
	taskFormContainer.setAttribute('class', 'form card');
	const formElement = document.createElement('form');
	const elementContainerName = document.createElement('div');
	elementContainerName.setAttribute('class', 'card');
	const elementContainerDate = document.createElement('div');
	elementContainerDate.setAttribute('class', 'card');
	const elementContainerDescription = document.createElement('div');
	elementContainerDescription.setAttribute('class', 'card');
	const elementContainerPriority = document.createElement('div');
	elementContainerPriority.setAttribute('class', 'card');
	const elementContainerList = document.createElement('div');
	elementContainerList.setAttribute('class', 'card');
	// new task popup title

	const addTaskTitle = document.createElement('h2');
	addTaskTitle.setAttribute('class', 'title');
	addTaskTitle.textContent = 'Add New Task';


	// name box
	const nameLabel = document.createElement('label');
	nameLabel.textContent = 'Task Name';
	const addTaskName = document.createElement('input');
	addTaskName.setAttribute('type', 'text');

	// due date box
	const dateLabel = document.createElement('label');
	dateLabel.textContent = 'Due Date';
	const addDueDate = document.createElement('input');
	addDueDate.setAttribute('type', 'date');

	// description box
	const descriptionLabel = document.createElement('label');
	descriptionLabel.textContent = 'Description';
	const addDescription = document.createElement('textarea');

	// priority choice
	const priorityLabel = document.createElement('label');
	priorityLabel.textContent = 'Priority';
	const priorityContainer = document.createElement('div');
	priorityContainer.setAttribute('class', 'radioContainer');

	const lowOption = document.createElement('input');
	lowOption.type = 'radio';
	lowOption.name = 'priority';
	lowOption.value = 'low';
	lowOption.id = 'priority-low';

	const lowLabel = document.createElement('label');
	lowLabel.textContent = 'Low';
	lowLabel.setAttribute('for', 'priority-low');

	const highOption = document.createElement('input');
	highOption.type = 'radio';
	highOption.name = 'priority';
	highOption.value = 'high';
	highOption.id = 'priority-high';

	const highLabel = document.createElement('label');
	highLabel.textContent = 'High';
	highLabel.setAttribute('for', 'priority-high');
	// list type(
	const listLabel = document.createElement('label');
	listLabel.textContent = 'List';
	const chooseList = document.createElement('select');
	chooseList.id = 'task-list';

	listTypes.forEach((listType) => {
		const option = document.createElement('option');
		option.value = listType;
		option.textContent = listType;
		chooseList.append(option);
	});
	//submit

	const submit = document.createElement('button');
	submit.setAttribute('type', 'submit');
	submit.setAttribute('class', 'submit');
	submit.textContent = 'Submit';

	priorityContainer.append(
		priorityLabel,
		lowOption,
		lowLabel,
		highOption,
		highLabel
	);


	taskFormContainer.appendChild(closeCard);
	taskFormContainer.appendChild(addTaskTitle);
	taskFormContainer.appendChild(formElement);

	formElement.appendChild(elementContainerName);
	formElement.appendChild(elementContainerDate);
	formElement.appendChild(elementContainerDescription);
	formElement.appendChild(elementContainerPriority);
	formElement.appendChild(elementContainerList);
	formElement.appendChild(submit);

	elementContainerName.appendChild(nameLabel);
	elementContainerName.appendChild(addTaskName);

	elementContainerDate.appendChild(dateLabel);
	elementContainerDate.appendChild(addDueDate);

	elementContainerDescription.appendChild(descriptionLabel);
	elementContainerDescription.appendChild(addDescription);

	elementContainerList.appendChild(listLabel);
	elementContainerList.appendChild(chooseList);

	elementContainerPriority.appendChild(priorityLabel);
	elementContainerPriority.appendChild(priorityContainer);

	submit.addEventListener('click', (event) => {
		event.preventDefault();

		const newTask = new addTodo(
			addTaskName.value,
			format(new Date(addDueDate.value), "dd/MM/yyyy"),
			addDescription.value,
			document.querySelector('input[name="priority"]:checked').value,
			chooseList.value
		);
		

		tasks.push(newTask);
		console.log(tasks);
		groupTasks[newTask.listType].push(newTask);
		groupTasks['All'].push(newTask);
		renderTask();
	
		
		console.log(groupTasks);
		localStorage.setItem("tasks", JSON.stringify(tasks));
		taskFormContainer.remove();
	});
	

	
	return taskFormContainer;
}


function renderTask(taskArray = tasks) {
	mainArea.innerHTML = '';

	taskArray.forEach((task) => {

		
		const taskDiv = document.createElement('div');
		taskDiv.classList.add('task', 'card');



// Name
const nameEl = document.createElement('p');
nameEl.classList.add('task-name');
nameEl.textContent = task.name;

// Due date
const dueEl = document.createElement('p');
dueEl.classList.add('task-due');

dueEl.textContent = `Due: ${format(task.dueDate, "dd/MM/yyyy")}`;

// Description
const descEl = document.createElement('p');
descEl.classList.add('task-desc');
descEl.textContent = task.description;

// Priority
const priorityEl = document.createElement('p');
priorityEl.classList.add('task-priority');
priorityEl.textContent = `Priority: ${task.priority}`;

// List type
const listEl = document.createElement('p');
listEl.classList.add('task-list');
listEl.textContent = `List: ${task.listType}`;

// Checkbox
const checkbox = document.createElement('input');
checkbox.type = 'checkbox';
checkbox.classList.add('checkbox');
checkbox.checked = task.complete;

// Close button (make sure this is created inside the loop)
const closeBtn = document.createElement('div');
closeBtn.classList.add('closeBtn');
closeBtn.textContent = 'X';

// Append everything
taskDiv.appendChild(checkbox);
taskDiv.appendChild(nameEl);
taskDiv.appendChild(dueEl);
taskDiv.appendChild(descEl);
taskDiv.appendChild(priorityEl);
taskDiv.appendChild(listEl);

taskDiv.appendChild(closeBtn);

mainArea.appendChild(taskDiv);
		mainArea.appendChild(taskDiv);
		checkbox.addEventListener('change', () => {
            task.complete = checkbox.checked;
			if (task.complete) {
				if (!groupTasks['Complete'].includes(task)) {
					groupTasks['Complete'].push(task)
				}
				
			} else {
				groupTasks['Complete'] = groupTasks['Complete'].filter(t => t !== task)
			}
			localStorage.setItem("tasks", JSON.stringify(tasks));
			const card = document.querySelector('.card')


        });
		//  const closeBtn = document.createElement('div');
    closeBtn.classList.add('closeBtn');
    closeBtn.textContent = 'X';

    closeBtn.addEventListener('click', () => {
        // Remove from DOM
        taskDiv.remove();

        // Remove from tasks array
        const index = tasks.indexOf(task);
        if (index !== -1) tasks.splice(index, 1);

        // Remove from grouped lists
        groupTasks[task.listType] =
            groupTasks[task.listType].filter(t => t !== task);

        groupTasks['All'] =
            groupTasks['All'].filter(t => t !== task);

        if (task.complete) {
            groupTasks['Complete'] =
                groupTasks['Complete'].filter(t => t !== task);
        }

        // Save updated tasks
        localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  taskDiv.appendChild(closeBtn);
    mainArea.appendChild(taskDiv);

	});
 

}

const savedTasksRaw = localStorage.getItem('tasks');
let savedTasks;
try {
  savedTasks = savedTasksRaw ? JSON.parse(savedTasksRaw) : [];
} catch (err) {
  console.warn('Invalid tasks in localStorage, resetting to []', err);
  savedTasks = [];
}
if (!Array.isArray(savedTasks)) savedTasks = [];

savedTasks.forEach(t => {
    tasks.push(new addTodo(
        t.name,
        new Date(t.dueDate),
        t.description,
        t.priority,
        t.listType,
        t.complete
    ));
});
tasks.forEach((task) => {
		groupTasks[task.listType].push(task);
		groupTasks['All'].push(task);
	});
renderTask()
localStorage.setItem("tasks", JSON.stringify(tasks));

localStorage.setItem('listTypes', JSON.stringify(listTypes))


export { addTodo, tasks, taskForm, renderTask };
