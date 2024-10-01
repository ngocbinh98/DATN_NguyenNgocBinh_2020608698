const FormatPrice = (inputNumber) => {
  // Chuyển đổi đầu vào thành chuỗi
  const text = String(inputNumber);
  let formattedText = '';
  let count = 0;

  // Lặp qua từng ký tự của chuỗi
  for (let i = text.length - 1; i >= 0; i--) {
    formattedText = text[i] + formattedText;
    count++;

    // Thêm dấu phẩy sau mỗi ba ký tự số (trừ khi là ký tự cuối cùng)
    if (count === 3 && i !== 0) {
      formattedText = ',' + formattedText;
      count = 0;
    }
  }
  formattedText = formattedText + '₫';
  // Trả về chuỗi đã được định dạng
  return formattedText;
};

export default FormatPrice;
