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


// function downloadPdf() {
//   document.getElementById('download').addEventListener('click', async () => {
//     const { jsPDF } = window.jspdf;

//     const pdf = new jsPDF({
//               orientation: "portrait", // or 'landscape'
//               unit: "mm", // measurement units: 'mm', 'cm', 'pt', or 'in'
//               hotfixes: ["px_scaling"]
//             });
            
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     const margin = 0; // 10mm margin on all sides
//     const contentHeight = pageHeight - 2 * margin; // Available height for content

//     const content = document.getElementById('pageContainer');
//     const canvas = await html2canvas(content, { scale: 2 });

//     const imgWidth = pageWidth - 2 * margin;
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;

//     let position = 0;

//     while (position < canvas.height) {
//         const croppedCanvas = document.createElement('canvas');
//         const croppedHeight = Math.min(canvas.height - position, contentHeight * canvas.width / pageWidth);

//         croppedCanvas.width = canvas.width;
//         croppedCanvas.height = croppedHeight;

//         const ctx = croppedCanvas.getContext('2d');
//         ctx.drawImage(
//             canvas,
//             0,
//             position,
//             canvas.width,
//             croppedHeight,
//             0,
//             0,
//             canvas.width,
//             croppedHeight
//         );

//         const imgData = croppedCanvas.toDataURL('image/jpeg');

//         if (position > 0) {
//             pdf.addPage();
//         }

//         pdf.addImage(imgData, 'JPEG', margin, margin, imgWidth, (imgWidth / canvas.width) * croppedHeight);

//         position += croppedHeight;
//     }

//     pdf.save('document.pdf');
// });
// }


// function downloadPdf(){
//   document.getElementById('download').addEventListener('click', () => {
//     const { jsPDF } = window.jspdf;

//     // Capture the HTML content
//     const content = document.getElementById('pageContainer');
//     html2canvas(content).then(canvas => {
//       const imgData = canvas.toDataURL('image/jpeg'); // Convert to image
//       const pdf = new jsPDF({
//         orientation: "portrait", // or 'landscape'
//         unit: "mm", // measurement units: 'mm', 'cm', 'pt', or 'in'
//         format: [210, 270], // width x height (e.g., custom height for taller pages)
//       });
//       // Add the image to the PDF
//       pdf.addImage(imgData, 'JPEG', 0, 0, 210, 0); // 190 is for A4 width, adjust as needed
//       pdf.save('example.pdf'); // Download the PDF
//     });
//   });
// }


document.getElementById('download').addEventListener('click', async function () {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4'); // إعداد PDF بحجم A4
  const pageContainer = document.getElementById('pageContainer');

  // إعداد ارتفاع ثابت
  const targetHeight = 1080; // ارتفاع الدقة الثابتة المطلوبة
  const actualHeight = window.innerHeight; // ارتفاع الشاشة الفعلي
  const scaleFactor = targetHeight / actualHeight; // مقياس الدقة

  // إعداد html2canvas لالتقاط الصور
  const options = {
      scale: scaleFactor, // ضبط المقياس بناءً على ارتفاع الشاشة
      useCORS: true // السماح بالصور المضمنة
  };

  // التقاط الصورة الكاملة للمحتوى
  const canvas = await html2canvas(pageContainer, options);
  const imgData = canvas.toDataURL('image/jpeg', 1.0); // استخراج الصورة بصيغة JPEG

  const pageWidth = 210; // العرض الافتراضي للصفحة (مم)
  const pageHeight = 297; // الطول الافتراضي للصفحة (مم)
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * pageWidth) / canvas.width;

  // تقسيم الصورة يدويًا إلى قسمين بناءً على الارتفاع
  const partHeight = imgHeight / 2; // تقسيم الصورة إلى نصفين
  const canvas1 = document.createElement('canvas');
  const canvas2 = document.createElement('canvas');
  canvas1.width = canvas.width;
  canvas1.height = canvas.height / 2;
  canvas2.width = canvas.width;
  canvas2.height = canvas.height / 2;

  const ctx1 = canvas1.getContext('2d');
  const ctx2 = canvas2.getContext('2d');

  // نسخ الجزء الأول
  ctx1.drawImage(canvas, 0, 0, canvas.width, canvas.height / 2, 0, 0, canvas.width, canvas.height / 2);
  const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);

  // نسخ الجزء الثاني
  ctx2.drawImage(canvas, 0, canvas.height / 2, canvas.width, canvas.height / 2, 0, 0, canvas.width, canvas.height / 2);
  const imgData2 = canvas2.toDataURL('image/jpeg', 1.0);

  // إضافة الجزء الأول كصفحة PDF
  pdf.addImage(imgData1, 'JPEG', 0, 0, pageWidth, pageHeight);

  // إضافة صفحة جديدة للجزء الثاني
  pdf.addPage();
  pdf.addImage(imgData2, 'JPEG', 0, 0, pageWidth, pageHeight);

  // حفظ ملف PDF
  pdf.save('form.pdf');
});
