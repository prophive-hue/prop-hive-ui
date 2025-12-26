import { Injectable } from '@angular/core';
import { Gender, InvestmentType, PropertyCompletionType, PropertyValue, PropertyManagementType, Nationality } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  genders(): string[] {
    return Object.values(Gender);
  }

  investmentTypes(): string[] {
    return Object.values(InvestmentType);
  }

  propertyCompletionTypes(): string[] {
    return Object.values(PropertyCompletionType);
  }

  propertyTypes(): string[] {
    return ['Residential', 'Commercial', 'Industrial', 'Land'];
  }

  propertyValues(): string[] {
    return Object.values(PropertyValue);
  }

  propertyManagementTypes(): string[] {
    return Object.values(PropertyManagementType);
  }

  nationalities(): string[] {
    return Object.values(Nationality);
  }
}
