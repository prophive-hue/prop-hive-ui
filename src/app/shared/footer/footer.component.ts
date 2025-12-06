import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [
    NgForOf
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  bankLogos = [
    {
      name: 'FNB',
      logo: 'https://property-funding.s3.eu-west-1.amazonaws.com/assets/fnb.png'
    },
    {
      name: 'ABSA',
      logo: 'https://property-funding.s3.eu-west-1.amazonaws.com/assets/absa.jpg'
    },
    {
      name: 'Standard Bank',
      logo: 'https://property-funding.s3.eu-west-1.amazonaws.com/assets/standardbank.png'
    },
    {
      name: 'Nedbank',
      logo: 'https://property-funding.s3.eu-west-1.amazonaws.com/assets/nedbank.png'
    },
    {
      name: 'Investec',
      logo: 'https://property-funding.s3.eu-west-1.amazonaws.com/assets/investec.png'
    },
    {
      name: 'African Bank',
      logo: 'https://property-funding.s3.eu-west-1.amazonaws.com/assets/african+bank.jpg'
    },
    {
      name: 'Capitec',
      logo: 'https://property-funding.s3.eu-west-1.amazonaws.com/assets/capitec.png'
    },
  ];

}
