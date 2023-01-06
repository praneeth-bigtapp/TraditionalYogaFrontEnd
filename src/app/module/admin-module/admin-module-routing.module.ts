import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth.service';
import { MyCourseMatriealsComponent } from './course-management/course-material/my-course-matrieals/my-course-matrieals.component';
import { ViewMycourseMatriealsComponent } from './course-management/course-material/view-mycourse-matrieals/view-mycourse-matrieals.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./admin-dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./admin-management/admin-management.module').then((m) => m.AdministrationModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./donation-management/donation-management.module').then((m) => m.DonationManagementModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin-management/admin-management.module').then((m) => m.AdministrationModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./donation-management/donation-management.module').then((m) => m.DonationManagementModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/add-course-main/add-course-main.module').then((m) => m.AddCourseMainModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/audio-management/audio-management.module').then((m) => m.AudioMainModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/class-media/class-media.module').then((m) => m.ClassMediaModule)
  },

  {
    path: 'courseMaterials',
    canActivate: [AuthGuard],
    component: MyCourseMatriealsComponent
  },
  {
    path: 'viewCourseMaterial',
    canActivate: [AuthGuard],
    component: ViewMycourseMatriealsComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/course-media/courses.module').then((m) => m.CoursesModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/member/member.module').then((m) => m.MemberModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/online-exam/online-exam.module').then((m) => m.OnlineExamModule)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/region-management/region-management.module').then((m) => m.RegionManagementModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./course-management/tasks-assignment/tasks-assignment.module').then((m) => m.TasksAssignmentModule)
  },

  // Resources
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./resources/practice-library/pratice-library.module').then((m) => m.PraticeLibraryModule)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./resources/scripctures/scripctures.module').then((m) => m.ScripcturesModule)
  },

  // Users Management
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user-management/blacklist-user/blacklist-user.module').then((m) => m.BlacklistUserModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user-management/map-users/map-users.module').then((m) => m.MapUsersModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user-management/student-master/student-master.module').then((m) => m.StudentMasterModule)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user-management/user/user.module').then((m) => m.UserFilterModule)
  },


  // Website Management
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/alert/alert.module').then((m) => m.AlertMainModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/banner/banner.module').then((m) => m.BannerMainModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/mapping-regions-to-chief-mentor/mapping-regions-to-chief-mentor.module').then((m) => m.MappingRegionsToChiefMentorModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/pearl-widsom/pearl-widsom.module').then((m) => m.PearlWidsomModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/photo-gallery/photo-gallery.module').then((m) => m.PhotoGalleryModule)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/testimonials/testimonials.module').then((m) => m.TestimonialsModule)
  },

  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./website-management/video-gallery/video-gallery.module').then((m) => m.VideoGalleryModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
