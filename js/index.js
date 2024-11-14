const form = document.getElementById("form");
const result = document.getElementById("result");

(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  const inputs = document.querySelectorAll(".form-control");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }else{        form.addEventListener("submit", window.print())
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();