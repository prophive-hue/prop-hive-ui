export interface Developer {
  id: string;
  companyName: string;
  email: string;
  phone: string;
  developerType: DeveloperType;
  yearsExperience: number;
  companyDescription: string;
  contactPerson: ContactPerson;
  status: DeveloperStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateDeveloper {
  companyName: string;
  email: string;
  phone: string;
  developerType: DeveloperType;
  yearsExperience: number;
  companyDescription: string;
  contactPerson: ContactPerson;
}

export interface ContactPerson {
  name: string;
  surname: string;
  email: string;
  phone: string;
  position?: string;
}

export enum DeveloperType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  MIXED_USE = 'MIXED_USE',
  INDUSTRIAL = 'INDUSTRIAL'
}

export enum DeveloperStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED'
}