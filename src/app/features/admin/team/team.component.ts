import { Component, ViewChild, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Button } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { MessageService } from 'primeng/api';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DialogAdminInviteComponent } from '../dialog/dialog-admin-invite/dialog-admin-invite.component';
import { TeamService } from '../services/team.service';
import { LoaderService } from '../../../core/services/loader.service';
import { SmartComponent } from '../../../shared/components/base/base.component';
import { takeUntil } from 'rxjs';
import type { AdminUser } from '../../../core/api/repositories/team.repository';

@Component({
  selector: 'app-team',
  imports: [
    ToolbarModule,
    ToastModule,
    TagModule,
    Button,
    NgxUiLoaderModule,
    DialogAdminInviteComponent
  ],
  providers: [MessageService],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent extends SmartComponent implements OnInit {

  @ViewChild('dialog') dialogComponent!: DialogAdminInviteComponent;

  admins: AdminUser[] = [];

  constructor(
    private teamService: TeamService,
    private messageService: MessageService,
    private loader: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.loadAdmins();
  }

  private loadAdmins() {
    this.teamService.getAllAdmins()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (admins) => {
          this.admins = admins;
          this.cdr.markForCheck();
        },
        error: (error) => this.handleError(error)
      });
  }

  handleCreate(data: any) {
    if (!data) return;

    this.loader.startLoader();
    this.teamService.createAdmin(data).subscribe({
      next: (response) => {
        this.loader.stopLoader();
        this.loadAdmins();
        this.messageService.add({
          severity: 'success',
          summary: 'Invitation Sent',
          detail: response.message,
          key: 'tl',
          life: 10000
        });
      },
      error: (error: Error) => {
        this.loader.stopLoader();
        this.messageService.add({
          severity: 'warn',
          summary: 'Error',
          detail: error.message,
          key: 'tl',
          life: 10000
        });
      }
    });
  }
}
