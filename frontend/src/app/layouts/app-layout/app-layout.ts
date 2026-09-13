import { Component } from '@angular/core';

import {
  RouterLink,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-app-layout',
  imports: [
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.css',
})
export class AppLayout {}