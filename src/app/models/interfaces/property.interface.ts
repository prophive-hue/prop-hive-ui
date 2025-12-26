export interface Property {
  id: string;
  title: string;
  location: string;
  category: PropertyCategory;
  description: string;
  developer: string;
  expectedRoi: number;
  totalInvestment: number;
  status: PropertyStatus;
  imageUrls: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProperty {
  title: string;
  location: string;
  category: PropertyCategory;
  description: string;
  developer: string;
  expectedRoi: number;
  totalInvestment: number;
  status: PropertyStatus;
  base64Images: Base64File[];
}

export interface Base64File {
  base64: string;
  fileName?: string;
  fileType?: string;
}

export enum PropertyCategory {
  RESIDENTIAL = 'Residential',
  COMMERCIAL = 'Commercial',
  INDUSTRIAL = 'Industrial',
  LAND = 'Land'
}

export enum PropertyStatus {
  NEW_DEVELOPMENT = 'New Development',
  JOINT_VENTURES = 'Joint Ventures',
  UNDER_CONSTRUCTION = 'Under Construction',
  PRE_SALE = 'Pre-Sale Investment'
}