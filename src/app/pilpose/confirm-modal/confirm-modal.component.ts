import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { interval, Observable, PartialObserver, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogData } from 'src/app/model/dialog-data.model';

export const TIMER_MS = 30;

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  commentValide: boolean = true;
  diffComment!: String;
  ispause = new Subject();
  time = TIMER_MS;
  timer!: Observable<number>;
  timerObserver!: PartialObserver<number>;

  constructor(
    public translate: TranslateService,
    public dialogRef: MatDialogRef<ConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: DialogData
  ) {
    this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initCountDown();
  }

  /**
   * inti timers for countdown
   */
  initCountDown() {
    this.timer = interval(1000).pipe(takeUntil(this.ispause));
    this.timerObserver = {
      next: (_: number) => {
        this.time -= 1;
    
      },
    };
  }

  /**
   * start countdown
   */
  startCountDown() {
    if (this.time == 0) {
      this.confirm(true);
    } else if (this.time == TIMER_MS) {
      this.timer.subscribe(this.timerObserver);
    }
  }

  /**
   * show countdown
   *
   */
  showCountDown() {
    return this.time;
  }

  /**
   * if isClose is true quit the popUp
   *  otherwise stay on the popUp
   * @param isClose
   */
  confirm(isClose: boolean) {
    this.closeDialog(isClose);
  }

  /**
   * quit the popUp
   */
  closeDialog(isClose: boolean): void {
      this.dialogRef.close(isClose);
  }

  close() {
    this.dialogRef.close();
  }
}
