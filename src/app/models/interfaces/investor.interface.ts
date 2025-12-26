export interface Investor {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  status: InvestorStatus;
  verificationLevel: VerificationLevel;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvestorOnboarding {
  personalInfo?: PersonalInfo;
  identityVerification?: IdentityVerification;
  bankingDetails?: BankingDetails;
  financialDetails?: FinancialDetails;
  riskProfile?: RiskProfile;
  legalAgreements?: LegalAgreements;
  kycAml?: KycAml;
  creditCheck?: CreditCheck;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IdentityVerification {
  documentType: DocumentType;
  documentNumber: string;
  documentImages: string[];
}

export interface BankingDetails {
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  accountType: AccountType;
}

export interface FinancialDetails {
  annualIncome: number;
  netWorth: number;
  investmentExperience: InvestmentExperience;
}

export interface RiskProfile {
  riskTolerance: RiskTolerance;
  investmentGoals: InvestmentGoal[];
  timeHorizon: TimeHorizon;
}

export interface LegalAgreements {
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  investorAgreementAccepted: boolean;
}

export interface KycAml {
  politicallyExposed: boolean;
  sanctionsList: boolean;
  sourceOfFunds: string;
}

export interface CreditCheck {
  creditScore?: number;
  creditReportDate?: string;
  approved: boolean;
}

export enum InvestorStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  REJECTED = 'REJECTED'
}

export enum VerificationLevel {
  UNVERIFIED = 'UNVERIFIED',
  BASIC = 'BASIC',
  ENHANCED = 'ENHANCED',
  PREMIUM = 'PREMIUM'
}

export enum DocumentType {
  PASSPORT = 'PASSPORT',
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  NATIONAL_ID = 'NATIONAL_ID'
}

export enum AccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS'
}

export enum InvestmentExperience {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  PROFESSIONAL = 'PROFESSIONAL'
}

export enum RiskTolerance {
  CONSERVATIVE = 'CONSERVATIVE',
  MODERATE = 'MODERATE',
  AGGRESSIVE = 'AGGRESSIVE'
}

export enum InvestmentGoal {
  CAPITAL_GROWTH = 'CAPITAL_GROWTH',
  PASSIVE_INCOME = 'PASSIVE_INCOME',
  DIVERSIFICATION = 'DIVERSIFICATION',
  TAX_BENEFITS = 'TAX_BENEFITS'
}

export enum TimeHorizon {
  SHORT_TERM = 'SHORT_TERM', // < 2 years
  MEDIUM_TERM = 'MEDIUM_TERM', // 2-5 years
  LONG_TERM = 'LONG_TERM' // > 5 years
}