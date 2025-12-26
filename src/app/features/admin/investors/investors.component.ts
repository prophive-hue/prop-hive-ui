import {Component, OnInit, ViewChild, ChangeDetectionStrategy} from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {Tag} from 'primeng/tag';
import {Toolbar} from 'primeng/toolbar';
import {CustomerService} from '../services/customer.service';
import {
  AdminInvestorsPagination,
} from '../services/admin-properties.service';
import {MessageService} from 'primeng/api';
import {AdminInvestorsService} from '../services/admin-investors.service';
import {StatsService} from '../services/stats.service';
import {DialogInvestorVerifyComponent} from '../dialog/dialog-investor-verify/dialog-investor-verify.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../core/services/loader.service';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import { TrackByFunctions } from '../../../shared/utils/track-by.functions';

@Component({
  selector: 'app-investors',
  imports: [ButtonModule, Toolbar, Tag, DialogInvestorVerifyComponent, NgxUiLoaderModule
  ],
  templateUrl: './investors.component.html',
  styleUrl: './investors.component.css',
  providers: [CustomerService, AdminInvestorsService, MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestorsComponent extends SmartComponent implements OnInit {

  trackByEmail = TrackByFunctions.trackByEmail;

  @ViewChild('investorVerify') investorVerifyComponent!: DialogInvestorVerifyComponent;


  statuses!: any[];

  loading: boolean = true;


  investors: any[] = [];

  totalElements: number = 0;
  page: number = 0;
  size: number = 5;

  searchInvestorInput:string = "";

  investorStats:any = {
    totalActive: 0,
    totalInvested: 0,
    totalPending: 0
  };


  constructor(private customerService: CustomerService, private investorsService: AdminInvestorsService, private messageService: MessageService, private statsService:StatsService, private loader:LoaderService) {
  }

  ngOnInit() {
    this.getInvestorStats()
    this.getAllInvestors();
  }


  getSeverity(status: string) {
    switch (status) {
      case 'SUSPENDED':
        return 'danger';

      case 'ACTIVE':
        return 'success';

      case 'PENDING':
        return 'warn';

      case 'renewal':
        return null;
    }


    return ''
  }

  getAllInvestors() {
    const paginator: AdminInvestorsPagination = {
      investorName: this.searchInvestorInput,
      page: this.page,
      size: this.size
    }

    this.setLoading(true);
    this.investorsService.getAllInvestors(paginator)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.investors = response.content;
          this.totalElements = response.totalElements;
          this.setLoading(false);
        },
        error: (error: any) => {
          this.handleError(error);
        }
      });
  }

  suspendInvestor(email:string){
    this.investorsService.suspendInvestor(email).subscribe({
      next: (response) => {
        this.getAllInvestors();
      },
      error: (error: Error) => {
        // this.errorMessage = error.message;
        this.loading = false;
      }
    });
  }


  getInvestorStats(){
    this.loader.startLoader();
    this.statsService.getAdminInvestorStats().subscribe({
      next: (response) => {
        console.log(response);
        this.investorStats = response;
        this.loader.stopLoader();
      },
      error: (error: Error) => {
        this.loader.stopLoader();
      }
    });
  }

  handleVerify(verify: any) {
    this.loader.startLoader();
    this.investorsService.verifyInvestor(verify).subscribe({
      next: (response) => {
        this.loader.stopLoader();
        this.getAllInvestors();
        this.getInvestorStats();
      },
      error: (error: Error) => {
        this.loading = false;
        this.loader.stopLoader();
      }
    });
  }
}
