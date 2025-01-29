import { Component, HostListener } from "@angular/core";
import { MainService } from "./services/services/main.service";
import { Router, NavigationEnd } from "@angular/router";
import { ContextService } from "./services/services/context.service";
import { Resultado } from "./shared/models/general.model";
import { UtilsService } from "./shared/utils/utils.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Resultant Partner Portal";
  showWarning: boolean = false;

  constructor(
    private router: Router,
    private _mainService: MainService,
    private contextService: ContextService,
    private _utilsSvc: UtilsService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const usuario = sessionStorage.getItem("usuario");
        const registro = {
          ruta: event.urlAfterRedirects,
          hora: new Date().toISOString(),
          usuario: usuario,
        };

        this._mainService.logRouteVisit(registro);

        this.handleRouteChange();
      }
    });
    this.resetInactivityTimer();
  }

  resetInactivityTimer(): void {
    const currentRoute = this.router.url;
    if (currentRoute === "/login") {
      this.showWarning = false;
      this.contextService.clearTimers();
      return;
    }

    this.contextService.resetInactivityTimer(
      () => this.showWarningModal(),
      () => this.handleAutoLogout()
    );
  }

  showWarningModal(): void {
    this.showWarning = true;
  }

  handleContinueSession(): void {
    this.showWarning = false;
    this.resetInactivityTimer();
  }

  handleLogout(): void {
    this.contextService.logout();
    this.router.navigate(["/login"]);
  }

  handleAutoLogout(): void {
    this.contextService.logout();
    this.router.navigate(["/login"]);
  }

  private handleRouteChange(): void {
    const currentRoute = this.router.url;
    if (currentRoute === "/login") {
      this.contextService.clearTimers();
      this.showWarning = false;
    }
  }
}
