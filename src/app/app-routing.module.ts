import { AdminGuard } from './guard/admin/admin.guard';
import { LoginadminComponent } from './pages/admin/loginadmin/loginadmin.component';
import { DeleteespecComponent } from './pages/admin/deleteespec/deleteespec.component';
import { DeleteContentComponent } from './pages/admin/deleteContent/deleteContent.component';
import { CreateContentComponent } from './pages/admin/createContent/createContent.component';
import { ChangePasswordComponent } from './pages/ForgotPassword/change-password/change-password.component';
import { RegisterFanaticComponent } from './pages/Register/RegisterFanatic/RegisterFanatic.component';
import { RegisterArtistComponent } from './pages/Register/RegisterArtist/RegisterArtist.component';
import { FanaticGuard } from './guard/fanatic/fanatic.guard';
import { ArtistGuard } from './guard/artist/artist.guard';
import { ConfigurationArtistComponent } from './pages/configuration/configuration-artist/configuration-artist.component';
import { ArtistEventComponent } from './pages/Artists/ArtistEvent/ArtistEvent.component';
import { ConfigurationFanaticComponent } from './pages/configuration/configuration-fanatic/configuration-fanatic.component';
import { ArtistListComponent } from './pages/Fanatic/artist-list/artist-list.component';
import { ForumPageComponent } from './pages/ForumPage/ForumPage.component';
import { FanaticForumCreateComponent } from './pages/Fanatic/FanaticForumCreate/FanaticForumCreate.component';
import { FanaticForumComponent } from './pages/Fanatic/Fanatic-Forum/Fanatic-Forum.component';
import { EventFanaticComponent } from './pages/Fanatic/EventFanatic/EventFanatic.component';
import { HomeFanaticComponent } from './pages/Fanatic/HomeFanatic/HomeFanatic.component';
import { ArtistForumsComponent } from './pages/Artists/artist-forums/artist-forums.component';
import { HomeArtistComponent } from './pages/Artists/home-artist/home-artist.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostPageComponent } from './pages/publication/post-page/post-page.component';
import { LoginComponent } from './pages/Login/Login.component';
import { LoginGuard } from './guard/login.guard';
import { SendEmailComponent } from './pages/ForgotPassword/send-email/send-email.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { BanPersonComponent } from './pages/admin/banPerson/banPerson.component';
import { ArtistEventCreateComponent } from './pages/Artists/artist-event-create/artist-event-create.component';
import { AlbumComponent } from './pages/Artists/Album/Album.component';
import { CreateAlbumComponent } from './pages/Artists/Album/CreateAlbum/CreateAlbum.component';
import { CreateMusicComponent } from './pages/Artists/Album/CreateMusic/CreateMusic.component';
import { OneAlbumComponent } from './pages/Artists/Album/OneAlbum/OneAlbum.component';

const routes: Routes = [

  {path:'HomeArtist/:id',component:HomeArtistComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] } },
  {path:'HomeArtist/:id/ArtistForum',component:ArtistForumsComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path:'HomeArtist/:id/ArtistForum/CreateForum',component:FanaticForumCreateComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path:'HomeArtist/:id/ArtistForum/ForumPage/:forumid',component:ForumPageComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path:'HomeArtist/:id/Event',component:ArtistEventComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path:'HomeArtist/:id/Event/CreateEvent',component:ArtistEventCreateComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path: 'HomeArtist/:id/posts',component:PostPageComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path: 'HomeArtist/:id/ConfigureArtist',component:ConfigurationArtistComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path: 'HomeArtist/:id/Albums',component:AlbumComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path: 'HomeArtist/:id/CreateAlbums',component:CreateAlbumComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path: 'HomeArtist/:id/Album/:albumid/CreateMusics',component:CreateMusicComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path: 'HomeArtist/:id/Album/:albumid',component:OneAlbumComponent,canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},


  {path:'HomeFanatic/:id',component:HomeFanaticComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path:'HomeFanatic/:id/Event',component:EventFanaticComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path:'HomeFanatic/:id/FanaticForum',component:FanaticForumComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path:'HomeFanatic/:id/FanaticForum/CreateForum',component:FanaticForumCreateComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path:'HomeFanatic/:id/FanaticForum/ForumPage/:forumid',component:ForumPageComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path:'HomeFanatic/:id/artists',component:ArtistListComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path: 'HomeFanatic/:id/posts',component:PostPageComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path:'HomeFanatic/:id/ConfigureFanatic',component:ConfigurationFanaticComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path: 'HomeFanatic/:id/ArtistAlbums',component:AlbumComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},
  {path: 'HomeFanatic/:id/ArtistAlbum/:albumid',component:OneAlbumComponent,canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},


  {path:'',component:LoginComponent,canActivate: [LoginGuard], data: { expectedRol: ['Role_Artist','Role_Fanatic','Role_Upgrade_Artist'] }},
  {path:'login',component:LoginComponent,canActivate: [LoginGuard], data: { expectedRol: ['Role_Artist','Role_Fanatic','Role_Upgrade_Artist'] }},


  {path:'registerartist',component:RegisterArtistComponent,canActivate: [LoginGuard], data: { expectedRol: ['Role_Artist','Role_Fanatic','Role_Upgrade_Artist'] }},
  {path:'registerfanatic',component:RegisterFanaticComponent},
  { path: 'sendemail', component: SendEmailComponent, canActivate: [LoginGuard] , data: { expectedRol: ['Role_Artist','Role_Fanatic','Role_Upgrade_Artist'] }},
  { path: 'change-password/:tokenPassword', component: ChangePasswordComponent, canActivate: [LoginGuard], data: { expectedRol: ['Role_Artist','Role_Fanatic','Role_Upgrade_Artist'] } },
  {path:'HomeArtist/:id/fortlomchat',component:ChatComponent, canActivate: [ArtistGuard], data: { expectedRol: ['Role_Artist','Role_Upgrade_Artist'] }},
  {path:'HomeFanatic/:id/fortlomchat',component:ChatComponent, canActivate: [FanaticGuard], data: { expectedRol: ['Role_Fanatic'] }},

  {path:'admin',component:HomeComponent,canActivate: [AdminGuard],data: { expectedRol: ['Role_Admin'] }},
  {path:'adminlogin',component:LoginadminComponent,canActivate: [LoginGuard],data: { expectedRol: ['Role_Artist','Role_Fanatic','Role_Upgrade_Artist','Role_Admin'] }},
  {path:'admin/create',component:CreateContentComponent,canActivate: [AdminGuard],data: { expectedRol: ['Role_Admin'] }},
  {path:'admin/delete',component:DeleteContentComponent,canActivate: [AdminGuard],data: { expectedRol: ['Role_Admin'] }},
  {path:'admin/delete/:idcontent',component:DeleteespecComponent,canActivate: [AdminGuard],data: { expectedRol: ['Role_Admin'] }},
  {path:'admin/ban',component:BanPersonComponent,canActivate: [AdminGuard],data: { expectedRol: ['Role_Admin'] }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
