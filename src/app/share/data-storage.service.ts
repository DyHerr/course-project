import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipesService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://ng-recipe-book-63c9a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', 
        recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes(){

                return this.http.get<Recipe[]>(
                    'https://ng-recipe-book-63c9a-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
                ).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                        };
                    });
                }),
                tap(recipes => {
                     this.recipesService.setRecipes(recipes);
                })
            );
        }
}