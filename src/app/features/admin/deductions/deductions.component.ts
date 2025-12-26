import {Component, ViewChild} from '@angular/core';
import {Button, ButtonModule} from "primeng/button";
import {DialogDeveloperCreateComponent} from "../dialog/dialog-developer-create/dialog-developer-create.component";
import {TableModule} from "primeng/table";
import {Tag, TagModule} from "primeng/tag";
import {Toast, ToastModule} from "primeng/toast";
import {Toolbar, ToolbarModule} from "primeng/toolbar";
import {DialogDeductionCreateComponent} from '../dialog/dialog-deduction-create/dialog-deduction-create.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {AnimateOnScrollModule} from 'primeng/animateonscroll';
import {TabsModule} from 'primeng/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {BlockUIModule} from 'primeng/blockui';
import {CalendarModule} from 'primeng/calendar';
import {DatePickerModule} from 'primeng/datepicker';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DrawerModule} from 'primeng/drawer';
import {DeferModule} from 'primeng/defer';
import {DockModule} from 'primeng/dock';
import {DragDropModule} from 'primeng/dragdrop';
import {SelectModule} from 'primeng/select';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {EditorModule} from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FocusTrapModule} from 'primeng/focustrap';
import {GalleriaModule} from 'primeng/galleria';
import {IftaLabelModule} from 'primeng/iftalabel';
import {InplaceModule} from 'primeng/inplace';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {TextareaModule} from 'primeng/textarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputOtpModule} from 'primeng/inputotp';
import {ImageModule} from 'primeng/image';
import {ImageCompareModule} from 'primeng/imagecompare';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MeterGroupModule} from 'primeng/metergroup';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OrderListModule} from 'primeng/orderlist';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Paginator, PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {ScrollerModule} from 'primeng/scroller';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SkeletonModule} from 'primeng/skeleton';
import {SliderModule} from 'primeng/slider';
import {SpeedDialModule} from 'primeng/speeddial';
import {SplitterModule} from 'primeng/splitter';
import {StepperModule} from 'primeng/stepper';
import {SplitButtonModule} from 'primeng/splitbutton';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToggleSwitchModule} from 'primeng/toggleswitch';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeSelectModule} from 'primeng/treeselect';
import {TreeTableModule} from 'primeng/treetable';
import {CardModule} from 'primeng/card';
import {RippleModule} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';
import {FloatLabelModule} from 'primeng/floatlabel';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {AutoFocusModule} from 'primeng/autofocus';
import {OverlayBadgeModule} from 'primeng/overlaybadge';
import {AdminDevelopersService, CreateDeveloper} from '../services/admin-developers.service';
import {MessageService} from 'primeng/api';
import {RegisterRequest} from '../../auth/services/auth.service';
import {AdminDeductionsService, DeductionPagination} from '../services/admin-deductions.service';
import {Pagination} from '../services/admin-properties.service';
import {PaginatorComponent} from '../../../shared/components/paginator/paginator.component';
import {SearchButtonComponent} from '../../../shared/components/search-button/search-button.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LoaderService} from '../../../core/services/loader.service';

@Component({
  selector: 'app-deductions',
  imports: [
    ProgressBarModule,
    DialogDeductionCreateComponent,
    Toast,
    Button,
    Toolbar,
    PaginatorComponent,
    SearchButtonComponent,
    NgxUiLoaderModule
  ],
  providers: [MessageService],
  templateUrl: './deductions.component.html',
  styleUrl: './deductions.component.css'
})
export class DeductionsComponent {


  @ViewChild('dialog') dialogComponent!: DialogDeductionCreateComponent;

  deductions: any[] =[];

  totalElements: number =0;
  page: number = 0;
  size: number = 5;

  searchDeductionInput:string = "";

  constructor(private deductionsService: AdminDeductionsService, private messageService: MessageService, private loader:LoaderService) {
  }

  ngOnInit() {
    this.getAllDeductions();
  }


  getAllDeductions() {
    const paginator: DeductionPagination = {
      deductionName: this.searchDeductionInput,
      page: this.page,
      size: this.size
    }

    console.log("paginator: " + paginator.size);

    this.loader.startLoader();

    this.deductionsService.getAllDeductions(paginator).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.deductions = response.content;
        this.totalElements = response.totalElements;
        this.loader.stopLoader();
        // Navigate to dashboard or home page after login
        // this.router.navigate(['/dashboard']);
      },
      error: (error: Error) => {
        // this.errorMessage = error.message;
        this.loader.stopLoader();
      }
    });
  }

  handleCreate(data: any) {
    if (data) {
      console.log('Resource created:', data);
      // TODO: Persist data to a service or backend

      this.loader.startLoader();
      this.deductionsService.createDeduction(data).subscribe({
        next: (response) => {
          console.log('deduction created successfully', response);
          this.loader.stopLoader();
          this.getAllDeductions();
          this.messageService.add({
            severity: 'success',
            summary: "Deduction Creation",
            detail: response.message,
            key: 'tl',
            life: 10000
          });
          //Navigate to dashboard or home page after login
          //this.router.navigate(['/dashboard']);
        },
        error: (error: Error) => {
          this.messageService.add({
            severity: 'warn',
            summary: "Error creating deduction",
            detail: error.message,
            key: 'tl',
            life: 10000
          });
          //this.errorMessage = error.message;
          this.loader.stopLoader();
        }
      });
    }
  }


  resetPagination() {
    this.page = 0;
    this.size = 5;
  }


  triggerSearchInput(value: string) {
    this.searchDeductionInput = value;

    this.resetPagination();
    this.getAllDeductions();
  }


  paginate(paginate: any) {
    this.page = paginate.page;
    this.size = paginate.rows;
    this.getAllDeductions();
  }
}
