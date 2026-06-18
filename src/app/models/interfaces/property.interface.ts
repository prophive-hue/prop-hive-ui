export interface Property {
  id: string;
  title: string;
  location: string;
  category: PropertyCategory;
  description: string;
  developer: string;
  developerInfo?: DeveloperInfo;
  expectedRoi: number;
  totalInvestment: number;
  status: PropertyStatus;
  investmentType?: string;
  managementType?: string;
  fundingOpen?: boolean;
  approvalStatus?: string;
  rejectionReason?: string;
  submittedBy?: string;
  imageUrls: string[];
  fundingProgress?: number;
  fundingRaised?: number;
  fundingTarget?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface DeveloperInfo {
  companyName: string;
  email: string;
  phone: string;
  developerType: string;
  yearsExperience: string;
  companyDescription: string;
  logoUrl?: string;
}

export interface CreateProperty {
  title: string;
  location: string;
  category: PropertyCategory;
  description: string;
  developerId?: string;
  expectedRoi: number;
  totalInvestment: number;
  status: PropertyStatus;
  investmentType?: string;
  managementType?: string;
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
  HOSPITALITY = 'Hospitality',
  MIXED_USE = 'Mixed-Use',
  STUDENT_ACCOMMODATION = 'Student Accommodation'
}

export enum PropertyStatus {
  NEW_DEVELOPMENT = 'New Development',
  JOINT_VENTURES = 'Joint Ventures',
  UNDER_CONSTRUCTION = 'Under Construction',
  PRE_SALE = 'Pre-Sale Investment'
}