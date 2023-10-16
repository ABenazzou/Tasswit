import { Routes } from '@angular/router';
import { CodeVerificationComponent } from '../code-verification/code-verification.component';
import { ElectionListComponent } from '../election-list/election-list.component';

import { HomeComponent } from '../home/home.component';
import { InformationComponent } from '../information/information.component';
import { PickVoteComponent } from '../pick-vote/pick-vote.component';
import { VerifyComponent } from '../verify/verify.component';
import { VoteComponent } from '../vote/vote.component';

export const routes: Routes = [
    { path: 'home',  component: HomeComponent },
    { path: 'vote',  component: VoteComponent },
    { path: 'verify/:cnie',     component: VerifyComponent },
    { path: 'pickVote/:cnie', component: PickVoteComponent},
    { path: 'codeVerify/:cnie', component: CodeVerificationComponent},
    { path: 'getInformed', component: InformationComponent},
    { path: 'list', component: ElectionListComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' }
    /*
    { path: 'menu',     component: MenuComponent },
    { path: 'dishdetail/:id',     component: DishdetailComponent },
    { path: 'contactus',    component: ContactComponent},
    { path: 'aboutus',  component:AboutComponent},
    */
  ];