import { Component } from '@angular/core';

import {
  
  RouterOutlet,
} from '@angular/router';
import { MinimalHeader } from '../designs/public/headers/minimal/minimal-header/minimal-header';
import { SimpleFooter } from '../designs/public/footers/simple/simple-footer/simple-footer';

@Component({
  selector: 'app-public-layout',
  imports: [
    
    RouterOutlet,
    MinimalHeader,
    SimpleFooter,
  ],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {}