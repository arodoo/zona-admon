import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-enlarged-image',
  standalone: true,
  imports: [],
  templateUrl: './enlarged-image.component.html',
  styleUrl: './enlarged-image.component.scss'
})
export class EnlargedImageComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }) { }
}
