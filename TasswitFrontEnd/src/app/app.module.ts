import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';


import { AppComponent } from './app.component';


import 'hammerjs';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { VoteComponent } from './vote/vote.component';
import { UserService } from './services/user.service';
import { VerifyComponent } from './verify/verify.component';
import { PickVoteComponent } from './pick-vote/pick-vote.component';
import { CodeVerificationComponent } from './code-verification/code-verification.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PartyService } from './services/party.service';
import { InformationComponent } from './information/information.component';
import { ElectionListComponent } from './election-list/election-list.component';
import { MembersComponent } from './members/members.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    VoteComponent,
    VerifyComponent,
    PickVoteComponent,
    CodeVerificationComponent,
    InformationComponent,
    ElectionListComponent,
    MembersComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    AppRoutingModule,
    HttpClientModule,
    MatSidenavModule,
    MatIconModule
  ],
  providers: [
    UserService,
    PartyService,
    ProcessHTTPMsgService
  ],
 entryComponents: [
   MembersComponent
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
