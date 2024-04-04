import { NgModule } from "@angular/core";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { DropwdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        LoadingSpinnerComponent,
        DropwdownDirective,
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LoadingSpinnerComponent,
        DropwdownDirective,
        CommonModule,
    ]
})
export class SharedModule {}