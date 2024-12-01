
// Get the modal
var RegisterModal = document.getElementById("Register-myModal");

// Get the button that opens the modal
let RegisterBtn = document.getElementById("registerBtn");

// Get the <span> element that closes the modal
var RegisterSpan = document.getElementsByClassName("Register-close")[0];


RegisterBtn.onclick = function() {
  RegisterModal.style.display = "block";
}

RegisterSpan.onclick = function() {
  RegisterModal.style.display = "none";
}

    function saveData(event) {
        event.preventDefault(); 


        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;


        if (password !== confirmPassword) {
            alert("Parolalar uyuşmuyor!");
            return false;
        }


        const userData = {
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem('userData', JSON.stringify(userData));

        // Başarı mesajı
        alert("Kayıt başarıyla tamamlandı!");

        // Formu sıfırlama
        document.getElementById('registerForm').reset();
        return true;
    }

