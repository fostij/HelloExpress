// window.addEventListener('DOMContentLoaded', () => {
  
//   //загрузка данных из БД
//   const loadData = async (url, callback) => {
//     await fetch(url)
//       .then(response => response.json())
//       .then(json => showData(json.goods)); // console.log(json)
//     callback();
//   };

//   //create HTML and put it on the page
//   function showData(arr) {
//     const goodsWrapper = document.querySelector('.goods__wrapper');

//     arr.forEach((item) => {
//       let card = document.createElement('div');

//       card.classList.add('goods__item');
//       card.innerHTML = `
//         <img class="goods__img" src="${item.url}" alt="phone">
//         <div class="goods__colors">Доступно цветов: 4</div>
//         <div class="goods__title">
//           ${item.title}
//         </div>
//         <div class="goods__price">
//           <span>${item.price}</span> руб/шт
//         </div>
//         <button class="goods__btn">Добавить в корзину</button>
//       `;
//       goodsWrapper.appendChild(card);
//     });
//   }

//   loadData('js/db.json', () => {
    
//     const cartWrapper = document.querySelector('.cart__wrapper'),
//       cart = document.querySelector('.cart'),
//       //кнопка акрытия корзины
//       cartClose = document.querySelector('.cart__close'),
//       //кнопка открытия корзины
//       cartOpen = document.querySelector('#cart'),
//       //общая стоимость товаров в корзине
//       cartTotalCost = document.querySelector('.cart__total > span'),
//       //иконка корзины для анимации подтверждения добавления в корзину
//       aniCartIcon = document.querySelector('.confirm'),
//       //бэджик на иконке корзины для показа количества товаров в корзине
//       badge = document.querySelector('.nav__badge'),

//       goodsButtons = document.querySelectorAll('.goods__btn'),
//       goods = document.querySelectorAll('.goods__item'),
//       titles = document.querySelectorAll('.goods__title');

//     function showCart() {
//       //значение по-умолчанию display: none
//       cart.style.display = 'block';
//       //блокирует прокрутку страницы при открытой корзине
//       document.body.overflow = 'hidden';
//     }

//     function hideCart() {
//       cart.style.display = 'none';
//       //разблокировка прокрутки страницы
//       document.body.overflow = '';
//     }

//     cartOpen.addEventListener('click', showCart);
//     cartClose.addEventListener('click', hideCart);

//     goodsButtons.forEach((btn, i) => {
//       btn.addEventListener('click', () => {
//         let item = goods[i].cloneNode(true),
//           //отдельно берем кнопку "Добавить в корзину", чтобы удалить её
//           btnAdd2Cart = item.querySelector('button'),
//           //создаем кнопку удаления товара из корзины
//           removeBtn = document.createElement('div'),
//           //берем текст "Корзина пуста", чтобы убрать его
//           emptyText = cartWrapper.querySelector('.empty');
        
//         //удаляем кнопку "Добавить в корзину"
//         btnAdd2Cart.remove();
//         //показываем анимацию добавления
//         showCartIconAnimation();
        
//         removeBtn.classList.add('goods__item-remove');
//         removeBtn.innerHTML = '&times';
//         item.appendChild(removeBtn);

//         //убираем текст "Корзина пуста"
//         if (emptyText) {
//           emptyText.style.display = 'none';
//           //emptyText.remove();
//         }

//         //добавляем карточку товара в корзину
//         cartWrapper.appendChild(item);

//         //обновление счетчика товаров в корзине
//         countCartGoods();

//         //обновляем сумму товара в корзине
//         countCartTotalPrice();

//         removeBtn.addEventListener('click', () => {
//           item.remove();
//           //если делать во внешней функции, то item можно получить через removeBtn.parentElement

//           countCartGoods();
//           countCartTotalPrice();
//           if (cartWrapper.querySelectorAll('.goods__item').length == 0)
//             //cartWrapper.appendChild(emptyText);
//             emptyText.style.display = 'block';
//         });

//       });
//     });

    
//     //перебираем и обрезаем описания всех товаров
//     function sliceAllTitles() {
//       titles.forEach((item) => {
//         const strLength = 50;
//         let str = item.textContent.trim();
//         if (str.length > strLength) {
//           item.textContent = `${str.slice(0, strLength)}...`;
//         }
//       });
//     }
//     sliceAllTitles();

//     //показываем иконку подтверждения добавления товара в корзину
//     function showCartIconAnimation() {
//       aniCartIcon.style.display = 'block';
//       //счетчик кадров
//       let counter = 10;
//       const animation = setInterval(frame, 10);

//       function frame() {
//         if (counter < 100) {
//           aniCartIcon.style.transform = `translateY(-${counter}px)`;
//           aniCartIcon.style.opacity = `.${110 - counter}`;
//           counter++;
//         } else {
//           clearInterval(animation);
//           aniCartIcon.style.display = 'none';
//         }
//       }
//     }

//     //подсчитываем количество товара в корзине и показываем на иконке
//     function countCartGoods() {
//       badge.textContent = cartWrapper.querySelectorAll('.goods__item').length;
//     }

//     //подсчитываем стоимость всех товаров в корзине
//     function countCartTotalPrice() {
//       const itemsPrices = cartWrapper.querySelectorAll('.goods__price > span');
//       let sum = 0;
//       itemsPrices.forEach((i) => {
//         sum += +i.textContent; //!
//       });
//       cartTotalCost.textContent = sum;
//     }

//     //удаление товара из корзины
//     // function RemoveGoodFromCart(removeBtn) {
//     //   removeBtn.addEventListener('click', )
//     // }

//   });

// });

window.addEventListener('DOMContentLoaded', () => {

    // Загрузка данних із бази данних
    const loadData = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => showData(json.goods)); // console.log(json);
        callback();    
    }

    // Create HTML and put it on the page
    function showData(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');

        arr.forEach(item => {
            let card = document.createElement('div');

            card.classList.add('goods__item');
            card.innerHTML = `
                <img class="goods__img" src="${item.url}" alt="phone">
                <div class="goods__colors">Доступно цветов: 4</div>
                <div class="goods__title">
                    ${item.title}
                </div>
                <div class="goods__price">
                    <span>${item.price}</span> руб/шт
                </div>
                <button class="goods__btn">Добавить в корзину</button>
            `;
            goodsWrapper.appendChild(card);
        })
    }

    // Функція откритія корзини
    loadData('js/db.json', () => {

    // Глобальні перемінні
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        cartOpen = document.querySelector('#cart'),
        cartClose = document.querySelector('.cart__close'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');

    const openCart = () => {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Функція закритія корзини
    const closeCart = () => {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Обработчики собитий
    cartOpen.addEventListener('click', openCart);
    cartClose.addEventListener('click', closeCart);

    // Добавлення карточки товара в корзину
    goodsBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            let item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');
    
                
            // Визов функції анімації іконки корзини при добавленні карточки товара в корзину
            showConfirm();

            trigger.remove();
            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);

            cartWrapper.appendChild(item);
            if(empty) {
                empty.style.display = 'none';
            }
            
            // Визов функції для збільшення числа товарів в корзині
            calcGoods();
            // Функція визначення общої сумми товарів    
            calcTotal();
            removeFromCart();
        });
    });

    // Обрізання строки description карточки товара
    function sliceTitle() {
        titles.forEach(item => {
            if(item.textContent.length <= 60) {
                return;
            } else {
                const str = `${item.textContent.slice(0, 60)}...`;
                item.textContent = str;
            }
        });
    };
    sliceTitle();

    // Анімація при кліку добавлення товару в корзину
    function showConfirm() {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);

        function frame() {
            if(counter == 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.opacity = '.' + counter;
                confirm.style.transform = `translateY(-${100 - counter}px)`;
            }
            
        }

    }

    // Підрахунок кількості товарів в корзині
    function calcGoods() {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length;
    }

    function calcTotal() {
        const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
        let total = 0;

        prices.forEach(item => {
            total += parseInt(item.textContent);
        });
        totalCost.textContent = total;
    }

    function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentNode.remove();
                calcGoods();
                calcTotal();

                if(cartWrapper.querySelectorAll('.goods__item').length == 0) { 
                    cartWrapper.querySelector('.empty').style.display ='block';
                }
            });
        });
    }

});

});



