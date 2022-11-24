import { ImagealbumComponent } from './pages/Artists/Album/OneAlbum/imagealbum/imagealbum.component';
import { SetreportComponent } from './pages/admin/setreport/setreport.component';
import { DeleteespecComponent } from './pages/admin/deleteespec/deleteespec.component';
import { NavegationComponent } from './pages/admin/navegation/navegation.component';
import { DeleteContentComponent } from './pages/admin/deleteContent/deleteContent.component';
import { CreateContentComponent } from './pages/admin/createContent/createContent.component';
import { BanPersonComponent } from './pages/admin/banPerson/banPerson.component';
import { FollowsComponent } from './pages/Fanatic/follows/follows.component';
import { OpinionpublicationComponent } from './pages/Opinionpublication/Opinionpublication.component';
import { OpinionComponent } from './pages/Opinion/Opinion.component';
import { ChangePasswordComponent } from './pages/ForgotPassword/change-password/change-password.component';
import { ConfigurationArtistComponent } from './pages/configuration/configuration-artist/configuration-artist.component';
import { ArtistEventComponent } from './pages/Artists/ArtistEvent/ArtistEvent.component';
import { ConfigurationFanaticComponent } from './pages/configuration/configuration-fanatic/configuration-fanatic.component';
import { CommentComponent } from './pages/publication/comment/comment.component';
import { PostComponent } from './pages/publication/post/post.component';
import { CommentFormComponent } from './pages/publication/comment-form/comment-form.component';
import { PostListComponent } from './pages/publication/post-list/post-list.component';
import { PostFormComponent } from './pages/publication/post-form/post-form.component';
import { RateComponent } from './pages/rate/rate.component';
import { ArtistListComponent } from './pages/Fanatic/artist-list/artist-list.component';
import { UserInformationforForumComponent } from './pages/UserInformationforForum/UserInformationforForum.component';
import { FanaticForumcommentComponent } from './pages/Fanatic/Fanatic-Forumcomment/Fanatic-Forumcomment.component';
import { ForumPageComponent } from './pages/ForumPage/ForumPage.component';
import { FanaticForumComponent } from './pages/Fanatic/Fanatic-Forum/Fanatic-Forum.component';
import { EventFanaticComponent } from './pages/Fanatic/EventFanatic/EventFanatic.component';
import { HomeFanaticComponent } from './pages/Fanatic/HomeFanatic/HomeFanatic.component';
import { FanaticnavigationComponent } from './pages/Fanatic/fanaticnavigation/fanaticnavigation.component';
import { MaterialModule } from './material/material.module';
import { ArtistNavegationComponent } from './pages/Artists/ArtistNavegation/ArtistNavegation.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeArtistComponent } from './pages/Artists/home-artist/home-artist.component';
import { ArtistForumsComponent } from './pages/Artists/artist-forums/artist-forums.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FanaticForumCreateComponent } from './pages/Fanatic/FanaticForumCreate/FanaticForumCreate.component';
import { PostPageComponent } from './pages/publication/post-page/post-page.component';
import { Post2Component } from './pages/publication/post2/post2.component';
import { LoginComponent } from './pages/Login/Login.component';
import { interceptorProvider } from './interceptors/Interceptor.service';
import { RegisterArtistComponent } from './pages/Register/RegisterArtist/RegisterArtist.component';
import { RegisterFanaticComponent } from './pages/Register/RegisterFanatic/RegisterFanatic.component';
import { SendEmailComponent } from './pages/ForgotPassword/send-email/send-email.component';
import { DialogOverviewReportDialog } from './pages/publication/post/dialogreport/dialogreport.component';
import { DialogreportforumComponent } from './pages/ForumPage/dialogreportforum/dialogreportforum.component';
import { DialogreportcommentComponent } from './pages/Fanatic/Fanatic-Forumcomment/dialogreportcomment/dialogreportcomment.component';
import { ImageforlistComponent } from './pages/Fanatic/imageforlist/imageforlist.component';
import { MessageComponent } from './pages/chat/message/message.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { HomeComponent } from './pages/admin/home/home.component';
import { LoginadminComponent } from './pages/admin/loginadmin/loginadmin.component';
import { AlbumComponent } from './pages/Artists/Album/Album.component';
import { CreateAlbumComponent } from './pages/Artists/Album/CreateAlbum/CreateAlbum.component';
import { CreateMusicComponent } from './pages/Artists/Album/CreateMusic/CreateMusic.component';
import { OneAlbumComponent } from './pages/Artists/Album/OneAlbum/OneAlbum.component';
import { SwiperModule } from "swiper/angular";
import { ArtistEventCreateComponent } from './pages/Artists/artist-event-create/artist-event-create.component';
import { UpgradeArtistDialogComponent } from './pages/configuration/configuration-artist/upgrade-artist-dialog/upgrade-artist-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeArtistComponent,
    ArtistNavegationComponent,
    ArtistForumsComponent,
    HomeFanaticComponent,
    FanaticnavigationComponent,
    EventFanaticComponent,
    FanaticForumComponent,
    FanaticForumCreateComponent,
    ForumPageComponent,
    FanaticForumcommentComponent,
    UserInformationforForumComponent,
    ArtistListComponent,
    RateComponent,
    PostPageComponent,
    PostFormComponent,
    PostListComponent,
    CommentFormComponent,
    CommentComponent,
    Post2Component,
    PostComponent,
    ConfigurationFanaticComponent,
    ArtistEventComponent,
    ConfigurationArtistComponent,
    LoginComponent,
    RegisterArtistComponent,
    RegisterFanaticComponent,
    SendEmailComponent,
    ChangePasswordComponent,
    DialogOverviewReportDialog,
    DialogreportforumComponent,
    DialogreportcommentComponent,
    OpinionComponent,
    OpinionpublicationComponent,
    FollowsComponent,
    ImageforlistComponent,
    ChatComponent,
    MessageComponent,
    HomeComponent,
    BanPersonComponent,
    CreateContentComponent,
    DeleteContentComponent,
    NavegationComponent,
    DeleteespecComponent,
    LoginadminComponent,
    LoginadminComponent,
    SetreportComponent,
    ArtistEventCreateComponent,
    AlbumComponent,
    CreateAlbumComponent,
    CreateMusicComponent,
    OneAlbumComponent,
    UpgradeArtistDialogComponent,
    ImagealbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SwiperModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
