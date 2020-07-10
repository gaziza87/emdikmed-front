import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable()
export class FeedbackService {

    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';

    constructor(
        private snackBar: MatSnackBar
    ) {}

    public displayCustomizedMessage(message: string, timer: number, horizontalPosition: MatSnackBarHorizontalPosition, verticalPosition: MatSnackBarVerticalPosition): void {
        this.snackBar.open(message, '', {
            duration: timer,
            horizontalPosition,
            verticalPosition,
        });
    }

    public displayTimedMessage(message: string, timer: number): void {
        this.snackBar.open(message, '', {
            duration: timer,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }

    public displayMessage(message: string): void {
        this.snackBar.open(message, '', {
            duration: 5000,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
        });
    }
}
