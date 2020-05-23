const isCyrillic = (text) => {
  return /[а-я]/ig.test(text);
};

const switcher = (keysA, keysB) => {
  keysA.forEach((key) => {
    key.classList.toggle('off');
  });
  keysB.forEach((key) => {
    key.classList.toggle('off');
  });
};

const UTILS = {
  isCyrillic,
  switcher
};

module.exports = UTILS;
