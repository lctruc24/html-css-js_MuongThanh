function generateCaptcha() {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const numCount = Math.floor(Math.random() * 2) + 3; 
    const letCount = 6 - numCount; 
    
    let captchaChars = [];
    
    for (let i = 0; i < numCount; i++) {
        captchaChars.push(numbers.charAt(Math.floor(Math.random() * numbers.length)));
    }
    for (let i = 0; i < letCount; i++) {
        captchaChars.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }
    
    for (let i = captchaChars.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [captchaChars[i], captchaChars[j]] = [captchaChars[j], captchaChars[i]];
    }
    return captchaChars.join("");
}

const captchaCodeDiv = document.getElementById('captchaCode');
const refreshBtn = document.getElementById('refreshBtn');

let currentCorrectCaptcha = "";

function refreshCaptcha() {
    currentCorrectCaptcha = generateCaptcha();
    captchaCodeDiv.innerText = currentCorrectCaptcha;
}
refreshCaptcha();
refreshBtn.onclick = refreshCaptcha;


const sendBtn = document.querySelector('.sendButton');
const form = document.querySelector('form');

sendBtn.onclick = function() {
    const input = document.querySelectorAll('.contact-container');
    let isValid = true;

    input.forEach(input => {
        if ((input.value === '') || (input.value === 'chooseHotel') || (input.value === 'chooseTitle') || (input.value === 'questionForm')) {
        input.style.border = '1px solid red';

        input.setCustomValidity("Fill in the field");
        input.reportValidity();

        isValid = false;
        } else {
            input.style.border = '1px solid white';
            input.setCustomValidity("");
        }
    })
    
    if (!isValid) return;

    const userInput = document.getElementById('captchaInput');

    if (userInput.value !== currentCorrectCaptcha) {
        alert("Mã bảo mật (Captcha) không chính xác. Vui lòng nhập lại!");
        document.getElementById('captchaInput').style.border = "1px solid red";
        return;
    }


    alert("Cảm ơn bạn! Thông tin đã được gửi thành công.");
};
