import { Component, ViewChild } from '@angular/core';
import { Ingredients } from '../../share/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  // @Output() ingredientAdded = new EventEmitter<{name: string, amount: number}>();
  @ViewChild('f', { static: false} ) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem: Ingredients;

  constructor(private slService: ShoppingListService){}

  ngOnInit(){
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm){
    const value = form.value;
    const newIngredients = new Ingredients(value.name, value.amount);
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredients);
    } else {
      this.slService.addIngredient(newIngredients);
    }
    this.editMode = false;
    form.reset();
    // this.ingredientAdded.emit(newIngredients);
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
