import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredients } from "../share/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

    // private recipes: Recipe[] = [
    //     new Recipe('Tasty Schnitzel',
    //      'A super-tasty Schnitzel - Just awesome!', 
    //     'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/331839.jpg',
    //     [
    //       new Ingredients('Meat', 1),
    //       new Ingredients('French Fries', 20)
    //     ]),
    //     new Recipe('Big Fat Burger', 
    //     'What else you need to say?', 
    //     'https://www.gardengourmet.it/sites/default/files/recipes/472a6839884de87337ab731dff8b9a48_200828_MEDIAMONKS_GG_Vegetarian.jpg',
    //     [
    //       new Ingredients('Buns', 2),
    //       new Ingredients('Meat', 1)
    //     ]),
    //   ];
    private recipes: Recipe[] = [];


    constructor(private slService: ShoppingListService){}

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index:number) {
        return this.recipes[index];
      }

      AddIngredientsToShoppingList(ingredients: Ingredients[]){
        this.slService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe){
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }

      setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }
}