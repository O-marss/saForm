(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  let form = document.getElementById('form');

function sendEmail(){
    Email.send({
        SecureToken : "270d044d-9173-4738-a991-4c9c7fc56ea3",
        To : '0marm07med3010@gmail.com',
        From : "0marm07med3010@gmail.com",
        Subject : "Test",
        Body : `Company Name: ${document.getElementById('validationCompanyname').value}
                <br> Registration number: ${document.getElementById('validationRegistrationNumber').value}
                <br> Date of incorporation: ${document.getElementById('validationDateOfIncorporation').value}
                <br> Company Type: ${document.getElementById('validationCompanyType').value}
                <br> Correspondence mail: ${document.getElementById('validationCorrespondenceMail').value}
                <br> Tax number: ${document.getElementById('validationTaxNumber').value}
                <br> General Manager Name: ${document.getElementById('validationGeneralManager').value}
                <br> General Manager Email: ${document.getElementById('validationGeneralEmail').value}
                <br> General Manager Mobile: ${document.getElementById('validationGeneralMobile').value}
                <br> Procurement Director Name: ${document.getElementById('validationProcurementDirectorName').value}
                <br> Procurement Director Email: ${document.getElementById('validationProcurementDirectorEmail').value}
                <br> Procurement Director Mobile: ${document.getElementById('validationProcurementDirectorMobile').value}
                `
    }).then(
      () => alert("Form Sent Successfully")
    );
}
