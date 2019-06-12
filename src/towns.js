/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
    return fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
        .then(e => e.json())
        .then(arr => arr.sort((prev, next) => prev.name > next.name ? 1 : -1))
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function() {
    const filterValue = filterInput.value;

    filterResult.innerHTML = '';

    if (!filterValue) {
        return;
    }

    loadingBlock.style.display = 'block';

    loadTowns()
        .then(arr => arr.filter(el => isMatching(el.name, filterValue)))
        .then(arr => {

            const fragment = document.createDocumentFragment();

            arr.forEach(el => {
                const div = document.createElement('li');

                div.innerText = el.name;
                fragment.appendChild(div);
            });

            filterResult.appendChild(fragment);
        })
        .catch(handleError)
        .finally(() => {
            loadingBlock.style.display = 'none';
        });
});

function handleError() {
    const fragment = document.createDocumentFragment();
    const div = document.createElement('div');
    const p = document.createElement('p');
    const button = document.createElement('button');

    p.innerText = 'Не удалось загрузить города';
    button.innerText = 'Загрузить города повторно';

    filterBlock.style.display = 'none';

    button.addEventListener('click', () => {
        document.removeChild(div);
        loadingBlock.style.display = 'block';
        loadTowns()
            .then(() => filterBlock.style.display = 'block')
            .error(handleError)
            .finally(() => {
                loadingBlock.style.display = 'none';
            });
    });

    fragment.appendChild(p);
    fragment.appendChild(button);
    div.appendChild(fragment);
    document.body.appendChild(div);
}

export {
    loadTowns,
    isMatching
};
