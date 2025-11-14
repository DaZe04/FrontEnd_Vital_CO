import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from "@angular/router";
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-menu',
 imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterLink,MatMenuModule,MatCardModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {

}
