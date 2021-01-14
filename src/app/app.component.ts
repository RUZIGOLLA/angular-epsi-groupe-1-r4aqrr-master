import { Component } from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {SessionService} from './core/services/session.service';
import {Router} from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get isSignedIn(): boolean {
    return AuthService.isSignedIn;
  }
  openSnackBar(message: string, action: string ) {
    this._snackBar.open(message , "", {
      duration: 2000,
    });
  }
  signout(): void {
    AuthService.user = null;
    this.sessionService.clear();
    this.openSnackBar("You've signed out successfuly !!", "nada")

    this.router.navigate(['/auth/landingpage']);
  }

}
