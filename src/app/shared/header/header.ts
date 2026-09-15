import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
   menuAbierto = false;
 
  alternarMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }
 
  cerrarMenu(): void {
    this.menuAbierto = false;
  }
}
