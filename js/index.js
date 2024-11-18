
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault(); // Prevent form submission
          downloadPdf()
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

function downloadPdf(){
  const { jsPDF } = window.jspdf;
  // Capture the HTML content
  const content = document.getElementById('pageContainer');
   
  // Use html2canvas to capture high-quality image
  html2canvas(content, {
    scale: 3, // Higher scale for better quality (3x)
    logging: false,
    useCORS: true, // Handles cross-origin images
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/jpeg', 1); // Convert canvas to image
    const imgWidth = 210; // Width of the image in the PDF (A4 minus margins)
    const pageHeight = 297; // Height of an A4 page in mm
    const imgHeight = ((canvas.height + 700) * imgWidth) / canvas.width; // Maintain aspect ratio
    let heightLeft = imgHeight; // Total image height remaining to render

    const pdf = new jsPDF({
      orientation: 'portrait', // or 'landscape'
      unit: 'mm', // Measurement units
      format: 'a4', // Standard A4
    });

    let position = 0; // Initial Y position on PDF

    // Add the first page
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if content exceeds one page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight; // Move to next page
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position , imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save('example.pdf'); // Download the PDF
  }).catch(error => {
    console.error('Error generating PDF:', error);
  });
}

