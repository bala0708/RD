import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { DragulaModule } from 'ng2-dragula/ng2-dragula';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {ConfirmationPopoverModule} from 'angular-confirmation-popover';
import {OpentokModule} from "ng2-opentok/dist/opentok.module"
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { DatePipe } from '@angular/common';
import { customHttpProvider } from './helpers/index';
import { AuthGuard } from './guards/index';
import { AlertService,
         AuthenticationService, 
         UserService,
         RoleService,
         ClientService,
         SettingService,
         CategoryService,
         HciService, 
         HcpService,
         RepService,
         SessionService,
         ContentService,
         RequestService,
         PollsService,
         PaymentService,
         TopicService } from './services/index';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppfooterComponent } from './components/appfooter/appfooter.component';
import { AppheaderComponent } from './components/appheader/appheader.component';
import { ManageRolesComponent } from './home/manage-roles/manage-roles.component';
import { AlertComponent } from './directive/alert.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { FilterByPipe, OrderByPipe, SearchPipe, DateByPipe,SearchUserPipe,rowPipe,columnPipe,SearchNamePipe,RemoveExtension} from './pipes/index';
import { ManageBrandsComponent } from './home/manage-brands/manage-brands.component';
import { FileUploaderModule } from "ng4-file-upload/file-uploader.module";
import { LoadingModule ,ANIMATION_TYPES  } from 'ngx-loading';
import { ImageUploadModule } from 'angular2-image-upload';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ManageTopicsComponent } from './home/manage-topics/manage-topics.component';
import { DndModule } from 'ng2-dnd';
import { ManageEligibilityComponent } from './home/manage-eligibility/manage-eligibility.component';
import { ManageRequestComponent } from './home/manage-request/manage-request.component';
import { TopicHciComponent } from './home/topic-hci/topic-hci.component';
import { ManageContentComponent } from './home/manage-content/manage-content.component';
import { ManageDetailComponent } from './home/manage-detail/manage-detail/manage-detail.component';
import { ManageContractsComponent } from './home/manage-contracts/manage-contracts.component';
import { ManageLivesessionComponent } from './home/manage-livesession/manage-livesession.component';
import { ManageHciComponent } from './home/manage-hci/manage-hci.component';
import { HciContentsComponent } from './home/manage-hci/hci-contents/hci-contents.component';
import { ManageHcpComponent } from './home/manage-hcp/manage-hcp.component';
import { HcpContentComponent } from './home/manage-hcp/hcp-content/hcp-content.component';
import { ManageEventsComponent } from './home/manage-events/manage-events.component';
import { RedirectComponent } from './home/redirect/redirect.component';
import { ManageRepComponent } from './home/manage-rep/manage-rep.component';
import { RepContentsComponent } from './home/manage-rep/rep-contents/rep-contents.component';
import { ManagePaymentsComponent } from './home/manage-payments/manage-payments.component';
import { UserDetailsComponent } from './home/user-details/user-details.component';
import { ManagePollsComponent } from './home/manage-polls/manage-polls.component';
import { OwlModule } from 'ngx-owl-carousel';
import { CategoryComponent } from './home/category/category.component';
import { DialogComponent } from './home/dialog/dialog.component';
import { PdfcontentComponent } from './pdfcontent/pdfcontent.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SubCategoryComponent } from './home/sub-category/sub-category.component';
import { QuestionsComponent } from './home/questions/questions.component';
import {VideoCallerComponent} from "./video-caller/video-caller.component";
import {VideoRecepientComponent} from "./video-recepient/video-recepient.component";
import {VideoCallWidgetComponent} from "./shared/video-call-widget/video-call-widget.component";
import {LoadingComponent} from "./shared/loading/loading.component";
const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'forgot-password/:token', component: ForgotPasswordComponent},
  { path: 'pdf/:url', component: PdfcontentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'manage-roles', component: ManageRolesComponent },
    { path: 'manage-brands', component: ManageBrandsComponent},
    { path: 'manage-brands/:brand/:product', component: ManageBrandsComponent,
      children: [
        { 
          path: ':brand',
          component: ManageBrandsComponent
        },
        {
          path: 'product',
          component: ManageBrandsComponent
        },
      ]
     },
    { path: 'manage-topics', component: ManageTopicsComponent },
    { path: 'manage-eligibility', component: ManageEligibilityComponent },
    { path: 'manage-request', component: ManageRequestComponent },
    { path: 'manage-content', component: ManageContentComponent },
    { path: 'topic-hci', component: TopicHciComponent },
    { path: 'manage-detail', component: ManageDetailComponent },
    { path: 'live-session', component: ManageLivesessionComponent },
    { path: 'manage-contracts', component: ManageContractsComponent },
    { path: 'hci', component: ManageHciComponent,
      children: [
        {
          path: ':id',
          component: HciContentsComponent
        },
        {
          path: 'hci',
          component: ManageHciComponent
        },
      ]
    },
    { path: 'hci/contents/:id', component: HciContentsComponent },
    { path: 'hcp', component: ManageHcpComponent,
      children: [
        {
          path: ':id',
          component: HcpContentComponent
        },
        {
          path: 'hcp',
          component: ManageHcpComponent
        },
      ]
    },
    { path: 'hcp/contents/:id', component: HcpContentComponent },
    { path: 'rep', component: ManageRepComponent,
      children: [
        {
          path: ':id',
          component: RepContentsComponent
        },
        {
          path: 'hcp',
          component: ManageRepComponent
        },
      ]
    },
    { path: 'rep/contents/:id', component: RepContentsComponent },
    { path: 'redirect/:id', component: RedirectComponent },
    { path: 'manage-events', component: ManageEventsComponent },
    { path: 'manage-payments', component: ManagePaymentsComponent },
    { path: 'manage-polls', component: ManagePollsComponent },
    { path: 'manage-category', component: CategoryComponent },
    { path: 'sub-category', component: SubCategoryComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'questions', component: QuestionsComponent },
    {
      path: 'recepient',
      component: VideoRecepientComponent
    },
    {
      path: 'caller',
      component: VideoCallerComponent
    }
   
  ]},  
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PageNotFoundComponent,
    AppfooterComponent,
    AppheaderComponent,
    ManageRolesComponent,
    AlertComponent,
    FilterByPipe,
    OrderByPipe,
    SearchPipe,
    DateByPipe,
    SearchNamePipe,
    RemoveExtension,
    SearchUserPipe,
    rowPipe,columnPipe,
    ManageBrandsComponent,
    ForgotPasswordComponent,
    ManageTopicsComponent,
    ManageEligibilityComponent,
    ManageRequestComponent,
    TopicHciComponent,
    ManageContentComponent,
    ManageDetailComponent,
    ManageContractsComponent,
    ManageLivesessionComponent,
    ManageHciComponent,
    HciContentsComponent,
    ManageHcpComponent,
    HcpContentComponent,
    ManageEventsComponent,
    RedirectComponent,
    ManageRepComponent,
    RepContentsComponent,
    ManagePaymentsComponent,
    UserDetailsComponent,
    ManagePollsComponent,
    ManagePollsComponent,
    CategoryComponent,
    DialogComponent,
    PdfcontentComponent,
    DashboardComponent,
    SubCategoryComponent,
    QuestionsComponent,
    VideoCallerComponent,
    VideoRecepientComponent,
    LoadingComponent,
    VideoCallWidgetComponent,
  ],
  imports: [
    BrowserModule,
    DragulaModule, 
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes,{ /*enableTracing: true  useHash: true */} ),
    ImageUploadModule.forRoot(),
    DndModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    OpentokModule.forRoot({apiKey: "45708332"}),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    Ng2AutoCompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,    
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    FormsModule,
    HttpModule,
    ToasterModule,
    FileUploaderModule,
    Ng2FilterPipeModule,
    OwlModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.threeBounce,
      backdropBackgroundColour: 'rgba(0,0,0,0.5)', 
      backdropBorderRadius: '4px',
      primaryColour: '#0080c6', 
      secondaryColour: '#fbb263', 
      tertiaryColour: '#7aa22f'
  })
  ],
  exports: [DndModule],
  providers: [
    customHttpProvider,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,    
    RoleService,
    ClientService,
    TopicService,
    SettingService,
    HciService,
    PollsService,
    HcpService,
    PaymentService,
    RepService,
    ContentService,
    CategoryService,
    SessionService,
    RequestService,
    DatePipe,
    OrderByPipe,
    DateByPipe,
    SearchUserPipe,
    SearchPipe,
    SearchNamePipe,
    rowPipe,columnPipe,
    {provide: APP_BASE_HREF, useValue: '/' },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
