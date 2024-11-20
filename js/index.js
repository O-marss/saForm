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


function downloadPdf() {
  document.getElementById('download').addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({
              orientation: "portrait", // or 'landscape'
              unit: "mm", // measurement units: 'mm', 'cm', 'pt', or 'in'
              hotfixes: ["px_scaling"]
            });
            
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 0; // 10mm margin on all sides
    const contentHeight = pageHeight - 2 * margin; // Available height for content

    const content = document.getElementById('pageContainer');
    const canvas = await html2canvas(content, { scale: 2 });

    const imgWidth = pageWidth - 2 * margin;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;

    while (position < canvas.height) {
        const croppedCanvas = document.createElement('canvas');
        const croppedHeight = Math.min(canvas.height - position, contentHeight * canvas.width / pageWidth);

        croppedCanvas.width = canvas.width;
        croppedCanvas.height = croppedHeight;

        const ctx = croppedCanvas.getContext('2d');
        ctx.drawImage(
            canvas,
            0,
            position,
            canvas.width,
            croppedHeight,
            0,
            0,
            canvas.width,
            croppedHeight
        );

        const imgData = croppedCanvas.toDataURL('image/jpeg');

        if (position > 0) {
            pdf.addPage();
        }

        pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, (imgWidth / canvas.width) * croppedHeight);

        position += croppedHeight;
    }

    pdf.save('Contract.pdf');
});
}
