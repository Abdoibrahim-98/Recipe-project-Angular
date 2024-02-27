import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorgaeService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  collapsed = true;
  constructor(private dataStorageService: DataStorgaeService){

  }
  onSave() {
    this.dataStorageService.storeRecipes();
  }
 
  onFetch(){
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
