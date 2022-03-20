import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() errorHead = null;
  @Input() error = null;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
