import { Directive, ElementRef, inject, Input } from "@angular/core";
import { every } from "rxjs";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        "(click)": "onCofirmLeavePage($event)"
    }
})
export class SafeLinkDirective {

    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)
    @Input({ required: true, alias: 'appSafeLink' }) queryParam!: string;

    onCofirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm("Do you want to leave the app?")
        if (wantsToLeave) {
            this.hostElementRef.nativeElement.href += '?from=' + this.queryParam;
            return;
        }
        else {
            event.preventDefault();
        }
    }
}