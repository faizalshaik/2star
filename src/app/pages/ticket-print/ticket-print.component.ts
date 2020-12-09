import { Component, OnInit, ViewChild, HostListener, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVar } from 'src/app/core/GlobalVar';
import { CacheService, DatetimeService } from 'src/app/core/service';

@Component({
  selector: 'app-ticket-print',
  templateUrl: './ticket-print.component.html'
})

export class TicketPrintComponent{
  @Input() userInfo;
  @Input() bet: any;  
  @Input() bet_results: any[];

  constructor(public datetimeService: DatetimeService, public modalService: NgbModal) {     
  }
  on_print_ticket()
  {
    let contents =document.getElementById('ticket-content').outerHTML;

    let modalRef = GlobalVar.latestModal;    
    modalRef.close();

    let iframe = document.createElement("iframe");
    document.body.appendChild(iframe);

    iframe.contentDocument.write('<html><head><title>' + document.title + '</title>');
//    iframe.contentDocument.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></head>');
    iframe.contentDocument.write('</head>');
    iframe.contentDocument.write('<style>');
    iframe.contentDocument.write(this.stylesheet_html());
    iframe.contentDocument.write('</style><body>');
    iframe.contentDocument.write(contents);
    iframe.contentDocument.write('</body></html>');
    iframe.contentDocument.close();
    iframe.contentWindow.onload = function() {
      iframe.style.display = "none";      
      iframe.contentWindow.print();
      setTimeout(function() { document.body.removeChild(iframe) }, 1000);
    }       
  }

  stylesheet_html() {
    let css = [];
    for (let sheeti = 0; sheeti < document.styleSheets.length; sheeti++) {
        let sheet = <CSSStyleSheet>document.styleSheets[sheeti];
        try {
          var rules = sheet.cssRules ? sheet.cssRules : sheet.rules;          
            for (let rulei = 0; rulei < rules.length; rulei++) {
                let rule = rules[rulei];
                css.push(rule.cssText);
            }
        } catch (ex) { }
    }
    return css.join('\n');
  }


  on_close()
  {
    let modalRef = GlobalVar.latestModal;
    modalRef.close();
  }


}
