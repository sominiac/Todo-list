let year = document.querySelector(".year");

let months = document.querySelector(".months");

let restDays = document.querySelector("#rest-days");

let start_date = "";
let end_date = ""
let vacation_days = 0;

let minModal = document.querySelector(".min-modal");
let minModalText = document.querySelector(".min-modal__text");
let minModalConfirmButton = document.querySelector(".min-modal__button-confirm");
let minModalCancelButton = document.querySelector(".min-modal__button-cancel");

let errorDayAlert = document.querySelector("#error-day-alert");
let errorDayAlertTitel = document.querySelector(".error-day-alert__title");
let errorDayAlertText = document.querySelector(".error-day-alert__text");
let errorDayAlertCloseButton = document.querySelector("#close-error-day-alert");

let prevYearButton = document.querySelector(".prev-year");
let nextYearButton = document.querySelector(".next-year");

let dayName = document.querySelectorAll(".day__name");

let selectedYear, selectedMonth;

let firstElement, lastElement, selectedDateFirst, selectedDateLast;

let vacationList = document.querySelector(".vacation-list");
let vacationListSubtitle = document.querySelectorAll(".vacation-list__item-subtitle");

year.textContent = getCurrentYear();

selectedYear = year.textContent;

monthArray();
getHolidaysDateOfBd();


prevYearButton.onclick = function() {
    setNewNumber(prevYearButton, year);

    selectedYear = '';
    selectedYear = year.textContent;
    monthArray();
    getHolidaysDateOfBd();
}

nextYearButton.onclick = function() {
    setNewNumber(nextYearButton, year);

    selectedYear = '';
    selectedYear = year.textContent;
    monthArray();
    getHolidaysDateOfBd();
}

document.querySelector("#vacations-counter").textContent = vacationListSubtitle.length;
vacationListSubtitle.forEach((elem) => {
    let dateElemArray = elem.dataset['date'].split('-');

    let firstDateArray = dateElemArray[0].split('.');
    let lastDateArray = dateElemArray[1].split('.');

    let firstDay = firstDateArray[0];
    let firstMonth = firstDateArray[1];
    let firstYear = firstDateArray[2];

    let lastDay = lastDateArray[0];
    let lastMonth = lastDateArray[1];
    let lastYear = lastDateArray[2];
    console.log(firstDateArray, lastDateArray);

    if(firstDay < 10) {
        firstDay = `0${firstDay}`;
    }
    if(firstMonth < 10) {
        firstMonth = `0${firstMonth}`;
    }
    if(lastDay < 10) {
        lastDay = `0${lastDay}`;
    }
    if(lastMonth < 10) {
        lastMonth = `0${lastMonth}`;
    }
    elem.textContent = `${firstDay}.${firstMonth}.${firstYear} - ${lastDay}.${lastMonth}.${lastYear}`
})

vacationList.addEventListener('click', () => {
    if(vacationList.classList.contains('overflowON')) {
        vacationList.classList.remove('overflowON');
        vacationList.classList.add('overflowOFF');
    } else {
        vacationList.classList.remove('overflowOFF');
        vacationList.classList.add('overflowON');
    }
})

months.addEventListener('click', (elem) => {
    if (elem.target.classList.contains('day') && !elem.target.classList.contains('day_holiday')) {
        if (firstElement == undefined){
            elem.target.classList.add('day_active');
            firstElement = elem.target.textContent;
            selectedDateFirst = elem.target.dataset['day'];
            selectedDateFirstArray = selectedDateFirst.split('.');
            if(selectedDateFirstArray[0] < 10 && selectedDateFirstArray[1] < 10) {
                selectedDateFirstArray[0] = `0${selectedDateFirstArray[0]}`;
                selectedDateFirstArray[1] = `0${selectedDateFirstArray[1]}`;
            } else if(selectedDateFirstArray[0] < 10) {
                selectedDateFirstArray[0] = `0${selectedDateFirstArray[0]}`;
            } else if(selectedDateFirstArray[1] < 10) {
                selectedDateFirstArray[1] = `0${selectedDateFirstArray[1]}`;
            }
        } else if (lastElement == undefined) {
            elem.target.classList.add('day_active');
            lastElement = elem.target.textContent;
            if(lastElement !== firstElement) {
                selectedDateLast = elem.target.dataset['day'];
                selectedDateLastArray = selectedDateLast.split('.');
                if(selectedDateLastArray[0] < 10 && selectedDateLastArray[1] < 10) {
                    selectedDateLastArray[0] = `0${selectedDateLastArray[0]}`;
                    selectedDateLastArray[1] = `0${selectedDateLastArray[1]}`;
                } else if(selectedDateLastArray[0] < 10) {
                    selectedDateLastArray[0] = `0${selectedDateLastArray[0]}`;
                } else if(selectedDateLastArray[1] < 10) {
                    selectedDateLastArray[1] = `0${selectedDateLastArray[1]}`;
                }
                if(getColoredSelectedDays(selectedDateFirst, selectedDateLast) !== false) {
                    if(elem.pageX < document.documentElement.clientWidth/2) {
                    minModal.style.top = `${elem.pageY}px`;
                    minModal.style.left = `${elem.pageX}px`;
                    } else if(elem.pageX > document.documentElement.clientWidth/2) {
                        minModal.style.top = `${elem.pageY}px`;
                        minModal.style.left = `${elem.pageX - 900}px`;
                    }
                    if(selectedDateLastArray[1] == 10 || selectedDateLastArray[1] == 11 || selectedDateLastArray[1] == 12) {
                        minModal.style.top = `${elem.pageY - 175}px`;
                    }
                    start_date = selectedDateFirst;
                    end_date =  selectedDateLast;
                    minModalText.innerHTML = `Вы уверенны что хотите запросить отпуск в этот промежуток времени:<br> ${selectedDateFirstArray[0]}.${selectedDateFirstArray[1]}.${selectedDateFirstArray[2]} - ${selectedDateLastArray[0]}.${selectedDateLastArray[1]}.${selectedDateLastArray[2]} ?`;
                    minModal.style.animation = 'opacity1 .6s linear forwards';
                    minModal.classList.remove('hidden');
                }
            } else {
                let day = document.querySelectorAll(".day");

                day.forEach((elem) => {
                    elem.classList.remove('day_active');
                })
                firstElement = undefined, lastElement = undefined, selectedDateFirst = undefined, selectedDateLast = undefined;
            }
        }
    }
})

if(minModalConfirmButton !== null) {
    minModalConfirmButton.onclick = function() {
        console.log('Подтвержденно');
       getDelColorDays();
        minModal.style.animation = 'opacity0 .6s linear forwards';
        setTimeout(() => {
            minModal.classList.add('hidden');
        }, 600)
        firstElement = undefined, lastElement = undefined, selectedDateFirst = undefined, selectedDateLast = undefined;
        console.log(vacation_days, start_date, end_date);
        socket.emit("new_vacation",{ worker : id, start : start_date, end : end_date});
        $.post("/vacation",{days : vacation_days, start: start_date, end : end_date, status : 1}, function(){
            window.location.reload();
        }) 
    }
}

if(minModalCancelButton !== null) {
    minModalCancelButton.onclick = function() {
        console.log('Закрыто');
        getDelColorDays();
        minModal.style.animation = 'opacity0 .6s linear forwards';
        setTimeout(() => {
            minModal.classList.add('hidden');
        }, 600)
        firstElement = undefined, lastElement = undefined, selectedDateFirst = '', selectedDateLast = '';
    }
}

if(errorDayAlertCloseButton !== null) {
    errorDayAlertCloseButton.onclick = function() {
        errorDayAlert.classList.add('hidden');
    }
}

function getHolidaysDateOfBd() {
    vacationListSubtitle.forEach((elem) => {
        let dateElemArray = elem.dataset['date'].split('-');
        let firstDate = dateElemArray[0];
        let lastDate = dateElemArray[1];

        let action = elem.dataset['action'];
        
        getColoredSelectedDaysBD(firstDate, lastDate, action);
    })
}

function getColoredSelectedDays(firstDate, lastDate) {
    console.log(firstDate, lastDate);
    let day = document.querySelectorAll(".day");

    let firstDateArray = firstDate.split('.');
    let lastDateArray = lastDate.split('.');

    let firstDay = firstDateArray[0];
    let firstMonth = firstDateArray[1];
    let firstYear = firstDateArray[2];

    let lastDay = lastDateArray[0];
    let lastMonth = lastDateArray[1];
    let lastYear = lastDateArray[2];

    let numberSelectedDays;

    let checkHolidaysArray = checkHolidays(firstDate, lastDate);

    let holidays = checkHolidaysArray[0];

    console.log(firstDay, lastDay)

    if(lastMonth - firstMonth == 1) {
        numberSelectedDays = ((getDayInMonth(selectedYear, firstMonth - 1) - firstDay) + +lastDay + 1) - Number(holidays);
    } else if(firstMonth == lastMonth && firstDay < lastDay) {
        numberSelectedDays = ((lastDay - firstDay) + 1) - Number(holidays);
    } else if(firstYear < lastYear && firstMonth == 12 && lastMonth == 1) {
        numberSelectedDays = ((getDayInMonth(selectedYear, firstMonth - 1) - firstDay) + +lastDay + 1) - Number(holidays);
    } else {
        firstElement = undefined, lastElement = undefined, selectedDateFirst = '', selectedDateLast = '';
        day.forEach((elem) => {
            elem.classList.remove('day_active');
        })
        errorDayAlertText.textContent = 'Выбирете сначала первый день отпуска, затем последний';
        errorDayAlertTitel.textContent = 'Ошибка. Неправильная последовательность действий';
        errorDayAlert.classList.remove('hidden');
        return false;
    }
    vacation_days = numberSelectedDays;
    console.log(numberSelectedDays)

    if(numberSelectedDays <= restDays.textContent) {
        day.forEach((elem, index) => {
            let elemDateArray = elem.dataset['day'].split('.');
            if(elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
                if(Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_active');
                }
            } else if(elemDateArray[1] == firstMonth) {
                if(Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_active');
                }
            } else if(elemDateArray[1] == lastMonth) {
                if(Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_active');
                }
            }
        })
    } else {
        firstElement = undefined, lastElement = undefined, selectedDateFirst = '', selectedDateLast = '';
        day.forEach((elem) => {
            elem.classList.remove('day_active');
        })
        if(numberSelectedDays !== undefined) {
            errorDayAlertText.textContent = `У вас есть ${restDays.textContent} дней отпуска, а выбираете отпуск на ${numberSelectedDays} дней`;
            errorDayAlertTitel.textContent = 'Ошибка. Недостаточное количество дней';
            errorDayAlert.classList.remove('hidden');
        } else if (lastMonth - firstMonth > 1){
            errorDayAlertText.textContent = 'Выбранно слишком большое количество дней';
            errorDayAlertTitel.textContent = 'Ошибка.';
            errorDayAlert.classList.remove('hidden');
        } else {
            errorDayAlertText.textContent = 'Выбирете сначала первый день отпуска, затем последний';
            errorDayAlertTitel.textContent = 'Ошибка. Неправильная последовательность действий';
            errorDayAlert.classList.remove('hidden');
        }
        return false;
    }
}

function getHoliday() {
    let arrayHolidays = months.dataset['holidays'].split(',');

    let day = document.querySelectorAll(".day");

    day.forEach((elem) => {
        let elemDateArray = elem.dataset['day'].split('.');
        let dayAndMonth = `${elemDateArray[0]}.${elemDateArray[1]}`
        if (arrayHolidays.indexOf(dayAndMonth) !== -1) {
            elem.classList.add('day_holiday');
        }
    })
}

function checkHolidays(firstDate, lastDate) {

    let day = document.querySelectorAll(".day");

    let firstDateArray = firstDate.split('.');
    let lastDateArray = lastDate.split('.');

    let firstDay = firstDateArray[0];
    let firstMonth = firstDateArray[1];

    let lastDay = lastDateArray[0];
    let lastMonth = lastDateArray[1];

    let numberSelectedDays;

    let counter = 0;

    let holidaysArray = [];

    if(lastMonth > firstMonth) {
        numberSelectedDays = (getDayInMonth(selectedYear, firstMonth - 1) - firstDay) + +lastDay + 1;
    } else if(firstMonth == lastMonth) {
        numberSelectedDays = (lastDay - firstDay) + 1;
    }

    day.forEach((elem) => {
        let elemDateArray = elem.dataset['day'].split('.');
        if(elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
            if(Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay)) {
                if(elem.classList.contains('day_holiday')) {
                    counter++;
                    holidaysArray.push(elem.dataset['day']);
                }
            }
        } else if(elemDateArray[1] == firstMonth) {
                if(Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay) {
                    if(elem.classList.contains('day_holiday')) {
                        counter++;
                        holidaysArray.push(elem.dataset['day']);
                    } 
                }
        } else if(elemDateArray[1] == lastMonth) {
                if(Number(elemDateArray[0]) <= Number(lastDay)) {
                    if(elem.classList.contains('day_holiday')) {
                        counter++;
                        holidaysArray.push(elem.dataset['day']);
                    } 
                }
            }
        })
    // console.log(holidaysArray)
    return[counter, holidaysArray];
}

function getDelColorDays() {
    let day = document.querySelectorAll(".day");

    day.forEach((elem, index) => {
        if(elem.classList.contains('day_active')) {
            elem.style.animation = `bgToTransparent .${index}s linear forwards`
            elem.classList.remove('day_active');
        }
    })
}

function monthArray() {
    let div = document.querySelectorAll('.day');
    let emptyDiv = document.querySelectorAll('.empty-day');
    let monthArray = new Array('january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december');

    div.forEach((elem)=>{
        elem.remove();
    });

    emptyDiv.forEach((elem)=>{
        elem.remove();
    });

    for(let i = 0; i < monthArray.length; i++){
        setSelectedMonth(i, monthArray[i]);
    }
}

function getCurrentYear() {
    let date = new Date();

    let currentYear = date.getFullYear();

    return currentYear;
}

function setNewNumber(target, object) {
    if(target.classList.contains('prev-year')) {
        object.textContent = object.textContent - 1;
    } else if(target.classList.contains('next-year')) {
        object.textContent = +object.textContent + 1;
    }
}

function getDayInMonth(selectedYear, selectedMonth) {
    let date = new Date(selectedYear, selectedMonth, 32);

    let dayInMonth = 32 - date.getDate();

    return dayInMonth;
}

function findFirstDayName(year, month) {
    let date = new Date(year, month);
    let dayName = date.getDay();
    return dayName;
}

function setSelectedMonth(month, monthName) {
    selectedMonth = month;
    let dayInMonth = getDayInMonth(selectedYear, selectedMonth);
    let parentElement = document.querySelectorAll(`.${monthName}`)
    createDayCard(selectedYear, selectedMonth, parentElement, dayInMonth)
}

function createDayCard(selectedYear, selectedMonth, parentElement, dayInMonth) {
    let createDiv = document.createElement('div');
    let counter;

    if(findFirstDayName(selectedYear, selectedMonth) == 1) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `1.${selectedMonth + 1}.${selectedYear}`);
        createDiv.innerHTML = `01`;
        parentElement[0].appendChild(createDiv);
        counter = 0;
    } else if (findFirstDayName(selectedYear, selectedMonth) == 2) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `1.${selectedMonth + 1}.${selectedYear}`);
        createDiv.innerHTML = `01`;
        parentElement[1].appendChild(createDiv);
        counter = 1;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 3) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `1.${selectedMonth + 1}.${selectedYear}`);
        createDiv.innerHTML = `01`;
        parentElement[2].appendChild(createDiv);
        counter = 2;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 4) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `1.${selectedMonth + 1}.${selectedYear}`);
        createDiv.innerHTML = `01`;
        parentElement[3].appendChild(createDiv);
        counter = 3;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 5) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `1.${selectedMonth + 1}.${selectedYear}`);
        createDiv.innerHTML = `01`;
        parentElement[4].appendChild(createDiv);
        counter = 4;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    }  else if (findFirstDayName(selectedYear, selectedMonth) == 6) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `1.${selectedMonth + 1}.${selectedYear}`);
        createDiv.innerHTML = `01`;
        parentElement[5].appendChild(createDiv);
        counter = 5;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    } else if (findFirstDayName(selectedYear, selectedMonth) == 0) {
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `1.${selectedMonth + 1}.${selectedYear}`);
        createDiv.innerHTML = `01`;
        parentElement[6].appendChild(createDiv);
        counter = 6;
        for (let i = 0; i < counter; i++){
            let createEmptyDiv = document.createElement('div');
            createEmptyDiv.classList.add('empty-day');
            createEmptyDiv.classList.add('subtitle');
            parentElement[i].appendChild(createEmptyDiv);
        };
    }

    for(let i = 2; i < dayInMonth + 1; i++){
        let createDiv = document.createElement('div');
        createDiv.classList.add('day');
        createDiv.classList.add('subtitle');
        createDiv.setAttribute('data-day', `${i}.${selectedMonth + 1}.${selectedYear}`);

        if (i < 10) {
            createDiv.innerHTML = `${'0' + i}`;
        } else {
            createDiv.innerHTML = `${i}`;
        }
        if (counter == 6){
            counter = -1;
        }
        parentElement[counter + 1].appendChild(createDiv);
        counter ++;
    }


    getHoliday();
}













function getColoredSelectedDaysBD(firstDate, lastDate, action) { // Тут полное повторение функции getColoredSelectedDays только без проверки на количество дней, сделано рофла ради, работает кстати, можешь удалить если хочешь
    console.log(action);
    let day = document.querySelectorAll(".day");

    let firstDateArray = firstDate.split('.');
    let lastDateArray = lastDate.split('.');

    let firstDay = firstDateArray[0];
    let firstMonth = firstDateArray[1];
    let firstYear = firstDateArray[2];

    let lastDay = lastDateArray[0];
    let lastMonth = lastDateArray[1];
    let lastYear = lastDateArray[2];

    let numberSelectedDays;

    let checkHolidaysArray = checkHolidays(firstDate, lastDate);

    let holidays = checkHolidaysArray[0];

    console.log(checkHolidaysArray[1])

    if(lastMonth - firstMonth == 1) {
        numberSelectedDays = ((getDayInMonth(selectedYear, firstMonth - 1) - firstDay) + +lastDay + 1) - Number(holidays);
    } else if(firstMonth == lastMonth) {
        numberSelectedDays = ((lastDay - firstDay) + 1) - Number(holidays);
    }
    vacation_days = numberSelectedDays;
    if(action == 'Подтверждено') {
        day.forEach((elem, index) => {
            let elemDateArray = elem.dataset['day'].split('.');
            if(elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
                if(Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(firstYear)) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_confirmed');
                }
            } else if(elemDateArray[1] == firstMonth) {
                if(Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(firstYear)) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_confirmed');
                }
            } else if(elemDateArray[1] == lastMonth) {
                if(Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(lastYear)) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_confirmed');
                }
            }
        })
    } else {
        day.forEach((elem, index) => {
            let elemDateArray = elem.dataset['day'].split('.');
            if(elemDateArray[1] == firstMonth && elemDateArray[1] == lastMonth) {
                if(Number(elemDateArray[0]) >= Number(firstDay) && Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_in_process');
                }
            } else if(elemDateArray[1] == firstMonth) {
                if(Number(elemDateArray[0]) <= Number(getDayInMonth(selectedYear, firstMonth - 1)) && Number(elemDateArray[0]) >= firstDay && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(firstYear)) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_in_process');
                }
            } else if(elemDateArray[1] == lastMonth) {
                if(Number(elemDateArray[0]) <= Number(lastDay) && checkHolidaysArray[1].indexOf(elem.dataset['day']) == -1 && Number(elemDateArray[2]) == Number(lastYear)) {
                    elem.style.animation = `transparentToBg .${index}s linear forwards`;
                    elem.classList.add('day_in_process');
                }
            }
        })
    }
}