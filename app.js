// const items = document.querySelectorAll('.item') //Массив всех элементов с классом .item, кототорые можно перетаскивать
// const placeholders = document.querySelectorAll('.placeholder') // Массив всх эл-ов .placeholder, куда можно сбрасывать перетаскиваемые элементы

// for (const item of items) {
//     item.addEventListener('dragstart', dragstart)
//     item.addEventListener('dragend', dragend) //тут была ошибка моя исправил
// }

// function dragstart(event){
//     event.target.classList.add('hold')
//     setTimeout(() =>{
//         event.target.classList.add('hide') //Переписал событие(не работало) скрытие элемента во время перетаскивания
//     }, 0)
// }

// function dragend(event){
//     event.target.classList.remove('hold')
//     event.target.classList.remove('hide')
// }

// for (const placeholder of placeholders) { //Добавление обработчиков событий для элементов из массива placeholders для управления перетаскиванием
//     placeholder.addEventListener('dragover', dragover)
//     placeholder.addEventListener('dragenter', dragenter)
//     placeholder.addEventListener('dragleave', dragleave)
//     placeholder.addEventListener('drop', dragdrop)
// }

// function dragover(event) {
//     event.preventDefault() // Предотвращение стандартного поведения?
// }

// function dragenter(event) {
//     event.target.classList.add('hovered') // Визульно обознаем место с поvощью класса hovered
// }

// function dragleave(event) {
//     event.target.classList.remove('hovered') // Удаление класса hovered 
// }

// function dragdrop(event) {
//     event.target.classList.remove('hovered')
//     // event.target.append(event.target.parentNode.querySelector('.item'))
//     const item = document.querySelector('.hold') // Получаем перетаскиваемый элемент
//     // event.target.append(item)} // появилась ошибка null: когла элементы накладывались друг на друга
//     if (item) { // Если элемент есть
//         event.target.append(item) // Добавляем элеменет в место сброса
//     } else {
//         console.error() // Создаем ошибку   
//     }
// }    

const items = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');

items.forEach(item => {
  item.addEventListener('dragstart', dragstart);
  item.addEventListener('dragend', dragend);
});

function dragstart(event) {
  event.dataTransfer.setData('text/plain', event.target.id); // Передаём информацию об id при перетаскивании в объект event.dataTransfer
  event.target.classList.add('hold');
  setTimeout(() => event.target.classList.add('hide'), 0);
}

function dragend(event) {
  event.target.classList.remove('hold');
  event.target.classList.remove('hide');
}

placeholders.forEach(placeholder => {
  placeholder.addEventListener('dragover', dragover);
  placeholder.addEventListener('dragenter', dragenter);
  placeholder.addEventListener('dragleave', dragleave);
  placeholder.addEventListener('drop', dragdrop);
});

function dragover(event) {
  event.preventDefault(); // Разрешаем drop
}

function dragenter(event) {
    if (!event.target.classList.contains('item')) {
        event.target.classList.add('hovered');
    }
}

function dragleave(event) {
  event.target.classList.remove('hovered');
}

function dragdrop(event) {
  event.preventDefault(); // Отменяем стандартное поведение drop
  event.target.classList.remove('hovered');

  const draggedItemId = event.dataTransfer.getData('text/plain'); // Достаём id из объекта 
  const draggedItem = document.getElementById(draggedItemId); // Получаем объект по id

  if (!event.target.classList.contains('item')) { // Проверяем не является ли элемент item
    event.target.appendChild(draggedItem); // Вставляем элемент в конец списка дочерних элементов
    //event.target.insertBefore(draggedItem, event.target.firstChild); // Вставляем элемент в начало списка дочерних элементов
  }
}
