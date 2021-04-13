let path = document.location.pathname;
let searchResultMain = path.search('index');
let searchResultAllTasks = path.search('all-tasks');

console.log(path, searchResultMain, searchResultAllTasks)
if(searchResultMain >= 1) {
    let buttonToAllTasks = document.querySelector("#to-all-tasks");
    let buttonNewTask = document.querySelector("#new-task-button");
    let buttonCloseNewTask = document.querySelector("#close-new-task-button");
    let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
    let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

    let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
    let changeSelectedTask = document.querySelectorAll(".change-selected-task");
    let tbodyCheckbox = document.querySelectorAll(".tbody-checkbox");

    let modalNewTask = document.querySelector("#new-task-modal");
    let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");

    let allTableCheckbox = document.querySelector("#table-checkbox-all");
    let checkedCounter = 0;
    let checkedCounterNoVisible = 0;

    let options = document.querySelector(".options");
    let optionsText = document.querySelector(".options__text");

    ifChacked();

    buttonNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }
    buttonCloseNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }

    buttonToAllTasks.onclick = function() {
        window.location.href = "/all-tasks.html";
    }



    deleteSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            modalAlertDeletTask.classList.toggle('hidden');
        })
    })
    buttonCloseModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('closed');
    }
    buttonYesModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('deleted');
    }

    changeSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            modalNewTask.classList.toggle('hidden');
        })
    })


    allTableCheckbox.onclick = function() {
        if(allTableCheckbox.classList.contains('table-checkbox_checked')) {
            allTableCheckbox.classList.remove('table-checkbox_checked');
            tbodyCheckbox.forEach((block)=>{
                block.classList.remove('table-checkbox_checked');
            })
            checkedCounter = 0;
            checkedCounterNoVisible = 0;
        } else {
            allTableCheckbox.classList.add('table-checkbox_checked');
            tbodyCheckbox.forEach((block)=>{
                block.classList.add('table-checkbox_checked');
            });
            checkedCounter = tbodyCheckbox.length;
            checkedCounterNoVisible = checkedCounter;
        }
        ifChacked();
    }

    tbodyCheckbox.forEach((block)=>{
        block.addEventListener('click', (elem)=>{
            if(block.classList.contains('table-checkbox_checked')) {
                block.classList.remove('table-checkbox_checked');
                checkedCounterNoVisible--;
                checkedCounter--;
            } else {
                block.classList.add('table-checkbox_checked');
                checkedCounterNoVisible++;
                checkedCounter++;
            }
            ifChacked();
        })
    })

    function ifChacked() {
        optionsText.textContent = `Выбранных задач: ${checkedCounter}`;
        if(checkedCounterNoVisible < 1) {
            allTableCheckbox.classList.remove('table-checkbox_checked');
        }
        tbodyCheckbox.forEach((block)=>{
            if(checkedCounterNoVisible > 0) {
                options.classList.remove('hidden');
            } else {
                options.classList.add('hidden');
            }
        })
        
    }

} else if(searchResultAllTasks >= 1) {
    let buttonToMain = document.querySelector("#to-main");
    // let buttonNewTask = document.querySelector("#new-task-button");
    let buttonCloseNewTask = document.querySelector("#close-new-task-button");
    let buttonCloseModalAlert = document.querySelector("#close-modal-alert");
    let buttonYesModalAlert = document.querySelector("#yes-modal-alert");

    let deleteSelectedTask = document.querySelectorAll(".delete-selected-task");
    let changeSelectedTask = document.querySelectorAll(".change-selected-task");
    let tbodyCheckbox = document.querySelectorAll(".tbody-checkbox");

    let modalNewTask = document.querySelector("#new-task-modal");
    let modalAlertDeletTask = document.querySelector("#delete-task-modal-alert");

    let allTableCheckbox = document.querySelector("#table-checkbox-all");
    let checkedCounter = 0;
    let checkedCounterNoVisible = 0;

    let options = document.querySelector(".options");
    let optionsText = document.querySelector(".options__text");

    ifChacked();

    // buttonNewTask.onclick = function() {
    //     modalNewTask.classList.toggle('hidden');
    // }
    buttonCloseNewTask.onclick = function() {
        modalNewTask.classList.toggle('hidden');
    }

    buttonToMain.onclick = function() {
        window.location.href = "/index.html";
    }

    deleteSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            modalAlertDeletTask.classList.toggle('hidden');
        })
    })
    buttonCloseModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('closed');
    }
    buttonYesModalAlert.onclick = function() {
        modalAlertDeletTask.classList.toggle('hidden');
        console.log('deleted');
    }

    changeSelectedTask.forEach((elem)=>{
        elem.addEventListener('click', (elem)=>{
            modalNewTask.classList.toggle('hidden');
        })
    })


    allTableCheckbox.onclick = function() {
        if(allTableCheckbox.classList.contains('table-checkbox_checked')) {
            allTableCheckbox.classList.remove('table-checkbox_checked');
            tbodyCheckbox.forEach((block)=>{
                block.classList.remove('table-checkbox_checked');
            })
            checkedCounter = 0;
            checkedCounterNoVisible = 0;
        } else {
            allTableCheckbox.classList.add('table-checkbox_checked');
            tbodyCheckbox.forEach((block)=>{
                block.classList.add('table-checkbox_checked');
            });
            checkedCounter = tbodyCheckbox.length;
            checkedCounterNoVisible = checkedCounter;
        }
        ifChacked();
    }

    tbodyCheckbox.forEach((block)=>{
        block.addEventListener('click', (elem)=>{
            if(block.classList.contains('table-checkbox_checked')) {
                block.classList.remove('table-checkbox_checked');
                checkedCounterNoVisible--;
                checkedCounter--;
            } else {
                block.classList.add('table-checkbox_checked');
                checkedCounterNoVisible++;
                checkedCounter++;
            }
            ifChacked();
        })
    })

    function ifChacked() {
        optionsText.textContent = `Выбранных задач: ${checkedCounter}`;
        if(checkedCounterNoVisible < 1) {
            allTableCheckbox.classList.remove('table-checkbox_checked');
        }
        tbodyCheckbox.forEach((block)=>{
            if(checkedCounterNoVisible > 0) {
                options.classList.remove('hidden');
            } else {
                options.classList.add('hidden');
            }
        })
        
    }
}