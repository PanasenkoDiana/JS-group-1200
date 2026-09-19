 console.log(1)

// setTimeout() - позволяет сделать задержку в милисекундах
// promise - это обьект ответа, который мы ожидаем получить, у него есть три состояния:
// 1. pending - состояние, которое ожидает результата
// 2. fulfilled - выполнено успешно
// 3. rejected - выполнено неуспешно


function getLaterProducts(){
    // new Promise() - позволяет создать новый обьект promise
    return new Promise((resolve, reject) => {
        // стрелочная функция принимает две функции:
        // 1. resolve - функция, которая возвращает успешный результат, переводит состояние promise в fulfilled
        // 2. reject - функция, которая возвращает неуспешный результат, переводит в rejected
        // setTimeout(() => {
        //     resolve(['alowe','kw'])
        // },2000)
        setTimeout(() => {
            reject('E123qwe 3,141592653')
        }, 500);
    })
}


// getLaterProducts()
// // then - используется для того, что бы обработать успешный результат
//     .then(products => {
//         console.log(products)
//     })
//     // catch - используется для того, что бы обработать ошибки
//     .catch(error => {
//         console.log(error)
//     } )


// const result = getLaterProducts()
// console.log(result)

// setTimeout(() => {
//    console.log(result) 
// }, 3000);