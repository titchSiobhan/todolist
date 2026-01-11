
let listTypes = [ 'All', 'Work', 'Education', 'Household', 'Shopping', 'Fitness', 'Complete' ]

const groupTasks = {};
listTypes.forEach(type => {
    groupTasks[type] = [];
})
// 'Today', 'Upcoming', 'Completed', 'All'
export {listTypes, groupTasks}