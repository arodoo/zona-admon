import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';

@Component({
  selector: 'app-use-prediction-module',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, FormsModule],
  templateUrl: './use-prediction-module.component.html',
  styleUrl: './use-prediction-module.component.scss'
})
export class UsePredictionModuleComponent implements OnInit {
  showInstructions = true;
  dontShowAgain = false;

  constructor(private authService: AuthService,
    private userService: UsersService) { }
  
  ngOnInit(): void {
    from(this.authService.getCurrentUserUid()).pipe(
      switchMap(uid => {
        if (uid) {
          return this.userService.getUserPreferences(uid);
        } else {
          return [null];
        }
      })
    ).subscribe(preferences => {
      if (preferences && preferences.showInstructions === false) {
        this.showInstructions = false;
      } else {
        from(this.authService.getCurrentUserUid()).subscribe(uid => {
          if (uid) {
            this.userService.setUserPreferences(uid, { showInstructions: true });
          }
        });
      }
    });
  }

  proceed(): void {
    from(this.authService.getCurrentUserUid()).subscribe(uid => {
      if (uid && this.dontShowAgain) {
        this.userService.setUserPreferences(uid, { showInstructions: false });
      }
    });
    this.showInstructions = false;
  }

  closeInstructions(): void {
    this.showInstructions = false;
  }
}
