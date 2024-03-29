import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('f', {static:false}) slForm : NgForm;
  subscription : Subscription;
  editMode = false; 
  editedItemIndex: number;
  editedItem : Ingredient;
  constructor(private slService:ShoppingListService){

  }
 ngOnInit(): void {
   this.subscription = this.slService.startedEditing.subscribe(
    (index: number)=>{
      this.editedItemIndex = index;
      this.editMode = true; 
      this.editedItem = this.slService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      })
   })
 }

  onAddUpdateItem(form : NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);    
    if(this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
      this.editMode = false;
    } else{
      this.slService.addIngredient(newIngredient);
    }
    this.slForm.reset();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(index: number){
   this.slService.deleteIngredient(index);
   this.slForm.reset();
   this.editMode = false
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
