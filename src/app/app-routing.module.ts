import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth/auth.service';
import { ViewDataComponent } from './features/view-data/view-data.component';
import { NotificationComponent } from './shared/notification/notification.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/member/member.module').then((m) => m.MemberModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/blacklist-user/blacklist-user.module').then((m) => m.BlacklistUserModule)
  },
  {
    path: "",
    loadChildren: () =>
      import('./features/mapping-regions-to-chief-mentor/mapping-regions-to-chief-mentor.module').then((m) => m.MappingRegionsToChiefMentorModule)
  },
  {
    path: "",
    loadChildren: () =>
      import('./features/onlineexam/onlineexam.module').then((m) => m.OnlineexamModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/websitemanagement/websitemanagement.module').then((m) => m.WebsitemanagementModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/map-users/map-users.module').then((m) => m.MapUsersModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/donation-management/donation-management.module').then((m) => m.DonationManagementModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/onlineexam/onlineexam.module').then((m) => m.OnlineexamModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/scripctures/scripctures.module').then((m) => m.ScripcturesModule)
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/banner/banner.module').then((m) => m.BannerModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/list-of-practice-library/list-of-practice-library.module').then((m) => m.ListOfPracticeLibraryModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/pratice-library/pratice-library.module').then((m) => m.PraticeLibraryModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/banner-main/banner-main.module').then((m) => m.BannerMainModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/audio-main/audio-main.module').then((m) => m.AudioMainModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/class-media/class-media.module').then((m) => m.ClassMediaModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/Photo-gallery/photo-gallery.module').then((m) => m.PhotoGalleryModule)
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/mapping-regions-to-chief-mentor/mapping-regions-to-chief-mentor.module').then((m) => m.MappingRegionsToChiefMentorModule)
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/alert-main/alert-main.module').then((m) => m.AlertMainModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/media-live/media-live.module').then((m) => m.MediaLiveModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/add-course-main/add-course-main.module').then((m) => m.AddCourseMainModule)
  },

  {
    path: '',
    loadChildren: () =>
      import('./studentmodule/registration/registration.module').then((m) => m.RegistrationModule)
  },

  {
    path: '',
    loadChildren: () =>
      import('./studentmodule/student-dashboard/student-dashboard.module').then((m) => m.StudentDashboardModule)
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/testimonials/testimonials.module').then((m) => m.TestimonialsModule)
  },

  {
    path: '',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'studentMaster',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/student-master/student-master.module').then((m) => m.StudentMasterModule)
  },
  {
    path: 'administration',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/administration/administration.module').then((m) => m.AdministrationModule)
  },
  {
    path: 'securityMaster',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/security-master/security-master.module').then((m) => m.SecurityMasterModule)
  },

  {
    path: 'dataUpload',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/static-data-upload/static-data-upload.module').then((m) => m.StaticDataUploadModule)
  },
  {
    path: 'viewData/dataView',
    canActivate: [AuthGuard],
    component: ViewDataComponent
  },
  {
    path: 'notification',
    canActivate: [AuthGuard],
    component: NotificationComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
