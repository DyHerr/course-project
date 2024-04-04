import { NgModule } from "@angular/core";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../share/shared.module";



@NgModule({
    declarations: [ShoppingListComponent, ShoppingEditComponent],
    imports: [
        FormsModule,
        SharedModule,
        RouterModule.forChild([
            { path: '', component: ShoppingListComponent },
        ]),
    ]
})

export class ShoppingListModule {}