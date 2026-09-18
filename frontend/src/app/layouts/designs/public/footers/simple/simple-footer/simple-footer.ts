import { Component, input } from '@angular/core';

@Component({
  selector: 'app-simple-footer',
  imports: [],
  templateUrl: './simple-footer.html',
  styleUrl: './simple-footer.css',
})
export class SimpleFooter {
  readonly text = input('Project App Starter');
}
