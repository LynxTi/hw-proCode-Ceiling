const form = document.querySelector('.formInputs');
const btnForm = document.querySelector('.btnForm');
const fieldContainer = document.querySelector('.field-container');
const joystickBtns = document.querySelectorAll('.joystick-btn');
let cells; //Масив плиток
const joystick = document.querySelector('.joystick-block');


const onClickBtnForm = () => {
    const formData = new FormData(form);
    const columns = Number(formData.get('columns'));
    const rows = Number(formData.get('rows'));

    createField(columns, rows);

}

btnForm.addEventListener('click', onClickBtnForm); 


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
    cells = document.querySelectorAll('.cell'); // присваиваем в перемунную масив плиоток
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

joystick.addEventListener('mousedown', joystickBtnMouseDown);
joystick.addEventListener('mouseup', joystickBtnMouseUp);
document.addEventListener('keydown', (element) => {
    const btnCode = element.code;

    if (btnCode === 'ArrowUp' || btnCode === 'ArrowDown' || 
    btnCode === 'ArrowLeft' || btnCode === 'ArrowRight')  {
        for (const btn of joystickBtns) {
            if (btn.dataset.codebtn == btnCode) {
                btn.classList.add('joystickBtnDown');
            }
        }
    }
})
document.addEventListener('keyup', (element) => {
    const btnCode = element.code;

    if (btnCode === 'ArrowUp' || btnCode === 'ArrowDown' || 
    btnCode === 'ArrowLeft' || btnCode === 'ArrowRight')  {
        for (const btn of joystickBtns) {
            if (btn.dataset.codebtn == btnCode) {
                btn.classList.remove('joystickBtnDown');
            }
        }
    }
})

