import { Component } from '@angular/core';
import {Card} from "primeng/card";
import { PresentationComponent } from '../../../shared/components/base/base.component';

@Component({
  selector: 'app-admin-stats',
    imports: [
        Card
    ],
  templateUrl: './admin-stats.component.html',
  styleUrl: './admin-stats.component.css'
})
export class AdminStatsComponent extends PresentationComponent {

}
