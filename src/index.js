/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let id = 0; id < array.length; id++) {
        fn(array[id], id, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    const newArr = [];

    forEach(array, (el, id) => newArr[id] = fn(el, id, array));

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    forEach(array, (el, id) => {

        if (!initial && initial !== 0) {
            return initial = el;
        }

        const result = fn(initial, el, id, array);

        initial = result || result === 0 ? result : initial;

    });

    return initial;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return map(Object.keys(obj), el => el.toUpperCase());
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {

    const newArr = [];

    if (to === 0 || from > array.length) {
        return newArr;
    }

    if (!from || from < 0) {
        from = 0;
    }

    if (!to || to > array.length) {
        to = array.length;
    }

    if (to < 0) {
        to = to + array.length;
    }

    for (let i = from; i < to; i++) {
        newArr.push(array[i]);
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = Math.pow(value, 2);

            return true;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
