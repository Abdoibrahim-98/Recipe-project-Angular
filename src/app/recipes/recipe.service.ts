import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredients.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";


@Injectable()
export class RecipeService{
    recipeSelected = new Subject<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('Kebab','A very delicious turkish Kebab','https://www.ndtv.com/cooks/images/seekh-kebab-620.jpg',[new Ingredient('Lamb', 1), new Ingredient('Black pepper',2)]),
        new Recipe('Burger',' A big fat burger!!','https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg',[new Ingredient("meet", 2), new Ingredient('chees', 4)]),
        new Recipe('Schnitzel','You shouuld not miss this german recipe!','https://www.thespruceeats.com/thmb/BS5BdyQsGh5qQyRiuZMannmcxoY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-wiener-schnitzel-recipe-1447089-hero-02-18827aac4cbd4aec926350d4f9778e70.jpg',[new Ingredient('Chicken', 2), new Ingredient('French Fries',20)])
      ];

      constructor(private slService: ShoppingListService){}

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
      }
}