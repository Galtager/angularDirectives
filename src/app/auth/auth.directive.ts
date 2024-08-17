import { Directive, effect, ElementRef, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';
import { Permission } from './auth.model';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {

  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef)
  private viewContainerRef = inject(ViewContainerRef)
  @Input({ required: true }) appAuth!: Permission;

  constructor() {
    effect(() => {
      if (this.appAuth === this.authService.activePermission()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef)
      }
      else {
        this.viewContainerRef.clear();
      }

    })
  }

}
