import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-auto-logout',
  templateUrl: './auto-logout.component.html',
  styleUrls: ['./auto-logout.component.scss'],
})
export class AutoLogoutComponent implements OnInit, OnDestroy {
  @Output() continueSession = new EventEmitter<void>();

  timeLeft: number = 60; 
  private intervalId: any; 

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  stayActive(): void {
    this.continueSession.emit();
  }

  private startCountdown(): void {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalId); 
      }
    }, 1000);
  }
}
