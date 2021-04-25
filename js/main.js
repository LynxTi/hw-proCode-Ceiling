const form = document.querySelector('.formInputs');
const btnForm = document.querySelector('.btnForm');
const fieldContainer = document.querySelector('.field-container');
const joystickBtns = document.querySelectorAll('.joystick-btn');
let cells; //Масив плиток
const joystick = document.querySelector('.joystick-block');
const catIcon = document.querySelector('.cat');
let columns;
let cellsLenght;




const onClickBtnForm = () => {
    const formData = new FormData(form);
    columns = Number(formData.get('columns'));
    const rows = Number(formData.get('rows'));

    joystick.classList.remove('joystick-block-of');
    createField(columns, rows); // Передаю 2 ар

}

const createField = (columns,rows) => { // фукция для создание поля (квадратики), принмает два аргуметна количество строк (rows) и колонок (columns)
    let counter = 0;    // пременная для создание дата атрибутов для 3 уровня задачи, для перемещие паука
    let htmlCode = ''; // строка в которую записываю будущий HTML код

    for (let i = 0; i < rows; i++) { // цикл для создание строки,  будет поторятся стольок сколько пользователь задал строк
        htmlCode += `<div class="row">`; 
        for (let j = 0; j < columns; j++) { //цикл для создание ячеек в строке
            htmlCode += `<div class="cell" data-number="${counter}"></div>`;
            counter ++;
        }
        htmlCode += `</div>`; 
    }
    fieldContainer.innerHTML = htmlCode; // выводим на страницу 


    cells = document.querySelectorAll('.cell'); // присваиваем в перемунную масив плиток
    cellsLenght = cells.length;

} 

const joystickBtnMouseDown = (event) => {
    const target = event.target;

    if (target !=joystick) {
        if (target.tagName != 'I') {
            event.target.classList.add('joystickBtnDown');
        } else {
            target.parentElement.classList.add('joystickBtnDown');
        }
    }
}

const joystickBtnMouseUp = (event) => {
    const target = event.target;
    let btnCode;
    if (target !=joystick) {
        if (target.tagName != 'I') {
            target.classList.remove('joystickBtnDown');
            btnCode = target.dataset.codebtn;
            console.log(btnCode);
        } else {
            target.parentElement.classList.remove('joystickBtnDown');
            btnCode = target.parentElement.dataset.codebtn;

        }
        const catCellNumber = findCatCell(catIcon.dataset.positiononarray)
        chekCell(catCellNumber , btnCode);
    }
}

btnForm.addEventListener('click', onClickBtnForm); 
joystick.addEventListener('mousedown', joystickBtnMouseDown);
joystick.addEventListener('mouseup', joystickBtnMouseUp);
document.addEventListener('keydown', (element) => {
    const btnCode = element.code;

    if (btnCode === 'ArrowUp' || btnCode === 'ArrowDown' || 
    btnCode === 'ArrowLeft' || btnCode === 'ArrowRight')  {
        for (const btn of joystickBtns) {
            if (btn.dataset.codebtn == btnCode) {
                btn.classList.add('joystickBtnDown');
                break;
            }
        }
    }
});


document.addEventListener('keyup', (element) => {
    const btnCode = element.code;

    if (btnCode === 'ArrowUp' || btnCode === 'ArrowDown' || 
    btnCode === 'ArrowLeft' || btnCode === 'ArrowRight')  {
        for (const btn of joystickBtns) {
            if (btn.dataset.codebtn == btnCode) {
                btn.classList.remove('joystickBtnDown');
                // ---------------------------------------------------------------------------------------------
                const catCellNumber = findCatCell(catIcon.dataset.positiononarray)
                chekCell(catCellNumber , btnCode);
                break;
            }
        }
    }
});


const moveCat = (cell) => {
    const tempcatIcon = document.querySelector('.cat')
    const top = cell.getBoundingClientRect().top; 
    const left = cell.getBoundingClientRect().left; 
    // tempcatIcon.style.color='red';
    // console.log('move');
    // console.log(catIcon.style.color);
    // console.log('catTop:' + catIcon.style.top);
    tempcatIcon.style.top = top + 'px';
    tempcatIcon.style.left = left + 'px';
    
    tempcatIcon.dataset.positiononarray = cell.dataset.number;
}

const chekCell = (catCell, direction) => {
    const number = Number(catCell.dataset.number);
    // const maxNumber = cells.lenght;
    const maxNumber = cellsLenght;
    // console.log(cells.lenght);
    // console.log(cells);
    let newNumberCatCell;
    let newCatCell;
    // debugger;
    switch (direction) {
        case 'ArrowUp':
            if (number - columns >= 0) {
                newNumberCatCell = number - columns;
                newCatCell = findCatCell(newNumberCatCell + "");
                moveCat(newCatCell);
            }
            break;
        case 'ArrowLeft':
            if (number - 1 >= 0) {
                newNumberCatCell = number - 1;
                newCatCell = findCatCell(newNumberCatCell + "");
                moveCat(newCatCell);
            }
        break;
        case 'ArrowRight':
            if (number + 1 <= maxNumber) {
                newNumberCatCell = number + 1;
                newCatCell = findCatCell(newNumberCatCell + "");
                moveCat(newCatCell);
            }
            break;
        case 'ArrowDown':
            if (number + columns < maxNumber) {
                newNumberCatCell = number + columns;
                newCatCell = findCatCell(newNumberCatCell + "");
                moveCat(newCatCell);

            }
    }
    // console.log(newNumberCatCell);
    // console.log(newNumberCatCell);
    // moveCat(newCatCell);
}

const findCatCell = (numberCell) => {
    // console.log(cells);
    // const catCell = cells.reduce( (rezult,cell) => {
    //     if (cell.dataset.number === catCellNumber) {
    //         rezult = cell;
    //         return rezult;
    //     }
    // });
    numberCell = numberCell;
    // console.log(cells);
    for (const cell of cells) {
        if (cell.dataset.number === numberCell) {
            return cell;
        }
    }
}
