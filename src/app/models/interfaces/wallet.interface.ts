export interface Wallet {
  id: string;
  balance: number;
  active: boolean;
}

export interface WalletTransaction {
  id: string;
  amount: number;
  type: WalletTransactionType;
  status: WalletTransactionStatus;
  reference: string;
  description: string;
  createdAt: string;
}

export interface DepositRequest {
  amount: number;
}

export interface DepositResponse {
  paymentUrl: string;
  paymentData: Record<string, string>;
  transactionReference: string;
}

export interface InvestRequest {
  propertyId: string;
  amount: number;
}

export interface Investment {
  id: string;
  propertyTitle: string;
  propertyLocation: string;
  amount: number;
  sharePercentage: number;
  expectedRoi: number;
  status: InvestmentStatus;
  investedAt: string;
}

export interface InvestorStats {
  totalInvested: number;
  totalReturns: number;
  activeProperties: number;
  walletBalance: number;
}

export interface FundingRound {
  id: string;
  propertyId: string;
  propertyTitle: string;
  targetAmount: number;
  currentAmount: number;
  percentageFunded: number;
  status: FundingRoundStatus;
  deadline: string;
}

export enum WalletTransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  INVESTMENT = 'INVESTMENT',
  RETURN = 'RETURN',
  FEE = 'FEE'
}

export enum WalletTransactionStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REVERSED = 'REVERSED'
}

export enum InvestmentStatus {
  ACTIVE = 'ACTIVE',
  MATURED = 'MATURED',
  CANCELLED = 'CANCELLED'
}

export enum FundingRoundStatus {
  OPEN = 'OPEN',
  FUNDED = 'FUNDED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED'
}
