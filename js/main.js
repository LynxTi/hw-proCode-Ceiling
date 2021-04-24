const form = document.querySelector('.formInputs');
const btnForm = document.querySelector('.btnForm');
const fieldContainer = document.querySelector('.field-container');
const joystickBtns = document.querySelectorAll('.joystick-btn');
let cells; //Масив плиток
const joystick = document.querySelector('.joystick-block');
const catIcon = document.querySelector('.cat');
let columns;
let cellsLenght;
catIcon.style.top ='40px';
catIcon.style.left ='70px';


const onClickBtnForm = () => {
    const formData = new FormData(form);
    columns = Number(formData.get('columns'));
    const rows = Number(formData.get('rows'));

    joystick.classList.remove('joystick-block-of');
    createField(columns, rows);

}

const createField = (columns,rows) => {
    let counter = 0;
    let htmlCode = '';
    
    for (let i = 0; i < rows; i++) {
        htmlCode += `<div class="row">`;
        for (let j = 0; j < columns; j++) {
            htmlCode += `<div class="cell" data-number="${counter}"></div>`;
            counter ++;
        }
        htmlCode += `</div>`; 
    }
    fieldContainer.innerHTML += htmlCode;
    cells = document.querySelectorAll('.cell'); // присваиваем в перемунную масив плиток
    cellsLenght = cells.length;


    // console.log(findCatCell()); ///----------------------------------------------------------------------------------------------------------------
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

    if (target !=joystick) {
        if (target.tagName != 'I') {
            event.target.classList.remove('joystickBtnDown');
        } else {
            target.parentElement.classList.remove('joystickBtnDown');
        }
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
    const top = cell.getBoundingClientRect().top; 
    const left = cell.getBoundingClientRect().left; 
    console.log('move');
    // catIcon.style.top = "40px"
    catIcon.style.top = top + 'px';
    catIcon.style.left = left + 'px';
}

const chekCell = (catCell, direction) => {
    const number = Number(catCell.dataset.number);
    // const maxNumber = cells.lenght;
    const maxNumber = cellsLenght;
    // console.log(cells.lenght);
    // console.log(cells);
    let newNumberCatCell;
    let newCatCell;
    debugger;
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
