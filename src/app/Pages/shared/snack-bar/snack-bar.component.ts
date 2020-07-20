import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    if (!this.data.showUndoButton || (this.data.undoButtonDuration >= this.data.duration)) {
      return;
    }

    this.delayForUndoButton(this.data.undoButtonDuration).subscribe(() => {
      this.data.showUndoButton = false;
    });
  }

  delayForUndoButton(timeToDelay) {
    return of('').pipe(delay(timeToDelay));
  }

  public onDismissWithAction() { this.data.snackBar.dismiss(); }

  public onDismiss() { this.data.snackBar.dismiss(); }

}
