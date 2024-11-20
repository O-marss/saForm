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

  // إعداد العرض والارتفاع الثابت
  const targetWidth = 1920; // عرض الدقة الثابتة المطلوبة
  const targetHeight = 1080; // ارتفاع الدقة الثابتة المطلوبة
  const actualWidth = window.innerWidth; // عرض الشاشة الفعلي
  const actualHeight = window.innerHeight; // ارتفاع الشاشة الفعلي

  // حساب مقياس العرض والارتفاع
  const scaleWidth = targetWidth / actualWidth;
  const scaleHeight = targetHeight / actualHeight;
  const scaleFactor = Math.min(scaleWidth, scaleHeight); // اختيار أصغر قيمة لضمان التناسب

  const options = {
      scale: scaleFactor, // ضبط المقياس بناءً على العرض والارتفاع
      useCORS: true // السماح بالصور المضمنة
  };

  // تحديد القسم الأول (قبل #sixthSectionTitle)
  const pageContainer = document.getElementById('pageContainer');
  const sixthSection = document.querySelector('#sixthSectionTitle');
  const part1Clone = pageContainer.cloneNode(true);

  // إزالة كل شيء بعد القسم المحدد في النسخة الأولى
  let node = sixthSection;
  while (node) {
      const next = node.nextElementSibling;
      if (next) next.remove();
      node = next;
  }

  // التقاط القسم الأول
  const canvas1 = await html2canvas(part1Clone, options);
  const imgData1 = canvas1.toDataURL('image/jpeg', 1.0);

  const pageWidth = 210; // العرض الافتراضي للصفحة (مم)
  const pageHeight = 297; // الطول الافتراضي للصفحة (مم)
  const imgWidth1 = pageWidth;
  const imgHeight1 = (canvas1.height * imgWidth1) / canvas1.width;

  pdf.addImage(imgData1, 'JPEG', 0, 0, imgWidth1, imgHeight1);

  // تحديد القسم الثاني (من #sixthSectionTitle فصاعدًا)
  const part2Clone = pageContainer.cloneNode(true);
  const part2 = part2Clone.querySelector('#sixthSectionTitle');

  // إزالة كل شيء قبل القسم المحدد في النسخة الثانية
  let current = part2.previousElementSibling;
  while (current) {
      const prev = current.previousElementSibling;
      if (current) current.remove();
      current = prev;
  }

  // التقاط القسم الثاني
  const canvas2 = await html2canvas(part2Clone, options);
  const imgData2 = canvas2.toDataURL('image/jpeg', 1.0);

  const imgWidth2 = pageWidth;
  const imgHeight2 = (canvas2.height * imgWidth2) / canvas2.width;

  pdf.addPage();
  pdf.addImage(imgData2, 'JPEG', 0, 0, imgWidth2, imgHeight2);

  // حفظ ملف PDF
  pdf.save('form.pdf');
});
