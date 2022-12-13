import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { BoardResolver } from 'src/app/features/board/resolvers/board.resolver';
import { BoardComponent } from './board.component';

const routes: Routes = [{ path: '', component: BoardComponent, canActivate: [AuthGuard],  resolve: { data: BoardResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
