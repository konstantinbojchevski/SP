import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {RestDataService} from "../rest-data.service";
import {Router} from "@angular/router";
import {LoggedService} from "../logged.service";
import {DeletedService} from "../deleted.service";
import {ConnectionService} from '../services/connection.service';

@Component({
  selector: 'app-deletad',
  templateUrl: './deletad.component.html',
  styleUrls: ['./deletad.component.css']
})
export class DeletadComponent implements OnInit {

  @Output() deleted = new EventEmitter<string>();
  @Input() id = null;
  constructor(public activeModal: NgbActiveModal,
              private restService: RestDataService,
              private router: Router,
              private data: DeletedService,
              private connectionService: ConnectionService) {}

  public isConnection(): boolean {
    return this.connectionService.isConnection;
  }

  ngOnInit(): void {
  }

  deleteAd() {
    console.log("HERe");
    this.restService
      .deleteAd(this.id)
      .subscribe({
        next: () => {
          this.data.emitId(this.id);
          this.activeModal.close();
          this.router.navigate(['/personprofile']);
        },
        error: (err: any) => {
          console.log("ERRORORORORO")
          console.log(err);
        }
      })
  }
}
