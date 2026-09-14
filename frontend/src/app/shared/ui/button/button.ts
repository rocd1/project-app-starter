import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  protected readonly type = input<
    'button' | 'submit' | 'reset'
  >('button');

  protected readonly variant = input<
    'primary' | 'secondary'
  >('primary');
}
