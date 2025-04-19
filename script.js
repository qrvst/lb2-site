/**
 * Перемикає мову інтерфейсу сайту.
 * Зберігає мову в localStorage і оновлює вміст сторінки.
 * 
 * @param {string} lang - Код мови (наприклад, 'ua' або 'en').
 */
function switchLanguage(lang) {
  saveLanguageToLocalStorage(lang);
  updateContentText(lang);
}

/**
 * Оновлює текстовий вміст елементів сторінки відповідно до обраної мови.
 *
 * @param {string} lang - Код мови ('ua' або 'en').
 */
function updateContentText(lang) {
  const content = {
    ua: {
      heading: 'Розробка сайту для продажу годинників',
      paragraph: 'Бакалаврська робота студента факультету комп’ютерних наук СумДУ',
    },
    en: {
      heading: 'Watch Selling Website Development',
      paragraph: 'Bachelor thesis by a student of the Faculty of Computer Science of SumDU',
    }
  };

  document.querySelector('h1').textContent = content[lang].heading;
  document.querySelector('header p').textContent = content[lang].paragraph;
}

/**
 * Зберігає обрану мову в локальному сховищі браузера.
 *
 * @param {string} lang - Код мови для збереження ('ua' або 'en').
 */
function saveLanguageToLocalStorage(lang) {
  localStorage.setItem('language', lang);
}
