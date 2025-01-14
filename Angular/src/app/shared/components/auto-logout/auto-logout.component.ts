import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-auto-logout',
  templateUrl: './auto-logout.component.html',
  styleUrls: ['./auto-logout.component.scss'],
})
export class AutoLogoutComponent {
  @Output() continueSession = new EventEmitter<void>();

  stayActive(): void {
    this.continueSession.emit();
  }
}
