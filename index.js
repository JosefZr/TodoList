let input = document.getElementById('text');
let btnAdd = document.getElementById('submit');
let error = document.getElementById('error');
let count = document.getElementById('count');

let taskData = [];
let total = 0; // Initialize the total variable

if (localStorage.hasOwnProperty('tasks')) {
    taskData = JSON.parse(localStorage.tasks);
} else {
    taskData = [];
}
btnAdd.onclick = function () {
    if (input.value !== '') {
        let newTask = { input: input.value };
        taskData.push(newTask);
        localStorage.setItem("tasks", JSON.stringify(taskData));
        tasknbr();
        error.style.display = 'none';
        cleardata();
        showdata();
    } else {
        error.style.display = 'block';
        cleardata();
    }
};

function cleardata() {
    input.value = '';
}

function tasknbr() {
    total = taskData.length; // Update the total variable
    count.innerHTML = total;
}

// Call the function on page load to initialize the task count
tasknbr();
//read 
function showdata() {
    let table = '';
    for (let i = 0; i < taskData.length; i++) {
        table += `
            <div class="list">
                <input type="checkbox" class="list-check">
                <span id="taskname">${taskData[i].input}</span>
                <button id="edit" onclick="editData(${i})"><i class="fa-solid fa-pen-to-square"></i></button>
                <button id="delete" onclick="deleteData(${i})"><i class="fa-solid fa-trash"></i></button>
            </div>`;
    }

    document.getElementById('lists').innerHTML = table;

    let checked = document.querySelectorAll('.list-check');
    checked.forEach(function (checkbox) {
        checkbox.onclick = function () {
            if (this.checked) {
                this.parentElement.classList.add('complited');
                total -= 1; // Increment the total
                count.innerHTML = total;
            } else {
                this.parentElement.classList.remove('complited');
                total += 1; // Decrement the total
                count.innerHTML = total;
            }
        };
    });
}

function deleteData(i){
    taskData.splice(i,1);
    localStorage.tasks = JSON.stringify(taskData);
    showdata();
    total -= 1; // Increment the total
    count.innerHTML = total;
    showdata();
}
showdata();

function editData(i){
    input.value= taskData[i].input ;
    taskData.splice(i,1);
    localStorage.tasks = JSON.stringify(taskData);
    showdata();
    if(total ===0){
        count.innerHTML = total;
        showdata();
    }
    else{
        total -= 1; // Increment the total
        count.innerHTML = total;
        showdata();
    }

}