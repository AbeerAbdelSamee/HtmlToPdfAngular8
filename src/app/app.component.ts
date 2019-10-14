import { Component, OnInit, ElementRef , ViewChild} from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testpdf';

  public convertToPdf() {
    const data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 600;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF
    });
  }
  downloadPDF() {

              const node = document.getElementById('contentToConvert');

              let img;
              let filename;
              let newImage;


              domtoimage.toPng(node, { bgcolor: '#fff' })

                // tslint:disable-next-line:only-arrow-functions
                .then( function(dataUrl) {

                  img = new Image();
                  img.src = dataUrl;
                  newImage = img.src;

                  // tslint:disable-next-line:only-arrow-functions
                  img.onload = function() {

                  const pdfWidth = img.width;
                  const pdfHeight = img.height;

                    // FileSaver.saveAs(dataUrl, 'my-pdfimage.png'); // Save as Image

                  let doc;

                  if(pdfWidth > pdfHeight) {
                      doc = new jspdf('l', 'px', [pdfWidth , pdfHeight]);
                    } else {
                      doc = new jspdf('p', 'px', [pdfWidth , pdfHeight]);
                    }


                  const width = doc.internal.pageSize.getWidth();
                  const height = doc.internal.pageSize.getHeight();


                  doc.addImage(newImage, 'PNG',  10, 10, width, height);
                  filename = 'mypdf_' + '.pdf';
                  doc.save(filename);

                  };


                })
                // tslint:disable-next-line:only-arrow-functions
                .catch(function(error) {

                 // Error Handling

                });



            }
}
