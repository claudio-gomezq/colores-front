import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Clipboard} from "@angular/cdk/clipboard";
import {MatSnackBar} from "@angular/material/snack-bar";
import Color from "../../../../shared/models/color";
import {MessageService} from "../../../../core/services/message.service";

@Component({
  selector: 'app-colores-list',
  templateUrl: './colores-list.component.html',
  styleUrls: ['./colores-list.component.scss']
})
export class ColoresListComponent implements OnInit {
  @Input() colores: Color[];

  @Output() editItem = new EventEmitter<number>();
  @Output() deleteItem = new EventEmitter<number>();

  constructor(private clipboard: Clipboard,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  copyColor(event: Color){
    const success = this.clipboard.copy(event.color)
    if(success){
      this.messageService.showInfo('Color copiado al portapapeles!');
    }
  }

  trackByFn(index, item: Color) {
    return item.id;
  }

}
