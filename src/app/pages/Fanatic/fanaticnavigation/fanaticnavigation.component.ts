import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token/token.service';
@Component({
  selector: 'app-fanaticnavigation',
  templateUrl: './fanaticnavigation.component.html',
  styleUrls: ['./fanaticnavigation.component.css']
})
export class FanaticnavigationComponent implements OnInit {

  idnumber!:number
  constructor(private cd:Router,private route:ActivatedRoute,private tokenService:TokenService) { }

  ngOnInit() {
    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id= pod;
    this.idnumber=id;
    console.log(this.idnumber)

  }



enterevent(){
  console.log(this.idnumber)
  this.cd.navigate(['/HomeFanatic',this.idnumber,'Event'])


}

enterartists(){
  console.log(this.idnumber)
  this.cd.navigate(['/HomeFanatic',this.idnumber,'artists'])
}

enterfanaticforum(){
  console.log(this.idnumber)
  this.cd.navigate(['/HomeFanatic',this.idnumber,'FanaticForum'])


}
enterPublication(){

 console.log(this.idnumber)
this.cd.navigate(['/HomeFanatic',this.idnumber,'posts'])


}
enterHome(){
  console.log(this.idnumber)
  this.cd.navigate(['/HomeFanatic',this.idnumber])
}

enterConfigurationFanatic(){
  this.cd.navigate(['/HomeFanatic',this.idnumber,'ConfigureFanatic']);
}

enterAlbum(){
  this.cd.navigate(['/HomeFanatic',this.idnumber,'ArtistAlbums'])
}

Logout(){
  this.tokenService.logOut();
}

}
