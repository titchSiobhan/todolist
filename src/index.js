import './styles/main.css';
import { listTypes, groupTasks } from './todoListType';
import { addTodo, tasks, taskForm, renderTask } from './addTodo';

console.log(listTypes);
console.log(tasks);
console.log(groupTasks);

const addTaskBtn = document.querySelector('.addTask');

addTaskBtn.addEventListener('click', () => {
	mainArea.appendChild(taskForm());
});

const mainArea = document.querySelector('#main');

const sideBar = document.querySelector('#aside');


listTypes.forEach((type) => {
    const typeBtn = document.createElement('button');
    typeBtn.setAttribute('class', 'btn');
    typeBtn.textContent = type;

    typeBtn.addEventListener('click', () => {
        renderTask(groupTasks[type]);
    })
    sideBar.appendChild(typeBtn);
})

