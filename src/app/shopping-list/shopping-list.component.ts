import { Subscription } from 'rxjs';
import { Component } from '@angular/core';
import { Ingredients } from '../share/ingredients.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent {
    ingredients: Ingredients[] 
    private subscription: Subscription;

    constructor(private slService: ShoppingListService) {}

    ngOnInit(){
      this.ingredients = this.slService.getIngredients();
      this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredients[]) => {
          this.ingredients = ingredients;
        }
      )
    }

    onEditItem(index : number ){
        this.slService.startedEditing.next(index);
    }

    ngOnDestroy () {
      this.subscription.unsubscribe();
    }
    // onIngredientAdded(ingredient : Ingredients){
    //   this.ingredients.push(ingredient);
    // }

  

  

}
