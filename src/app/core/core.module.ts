import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SideNavComponent } from './layout/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { HeaderService } from './layout/header/service/header.service';
import { CasetilePipe } from './layout/side-nav/casetile.pipe';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SideNavComponent, CasetilePipe],
  imports: [CommonModule, RouterModule],
  exports: [HeaderComponent, FooterComponent, SideNavComponent],
  providers: [HeaderService]
})
export class CoreModule { }
