function CheckPrice(selector) {
  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const text = element.textContent.replace(/\D/g, ''); // Loại bỏ tất cả các ký tự không phải số từ chuỗi
    let formattedText = '';
    let count = 0;

    for (let i = text.length - 1; i >= 0; i--) {
      formattedText = text[i] + formattedText;
      count++;

      if (count === 3 && i !== 0) {
        formattedText = ',' + formattedText;
        count = 0;
      }
    }

    element.textContent = formattedText;
  });
}

export default CheckPrice;
