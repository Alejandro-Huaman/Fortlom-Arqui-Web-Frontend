import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Album',
  templateUrl: './Album.component.html',
  styleUrls: ['./Album.component.css']
})
export class AlbumComponent implements OnInit {
  
  idnumber!:number;
  albumsList:string[] = ["Hola","Hola","Hola","Hola",]
  whois!:string
  constructor(private cd:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    let pod = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.idnumber = pod;
    let home=(this.route.snapshot.url[0].path);
    if(home == 'HomeArtist'){
      this.whois = 'HomeArtist'
    }else{
      this.whois = 'HomeFanatic'
    }
  }

  CreateAlbum(){

    this.cd.navigate(['/HomeArtist',this.idnumber,'CreateAlbums'])

  }

  CreateMusic(){

    this.cd.navigate(['/HomeArtist',this.idnumber,'CreateMusics'])

  }

  GoToOneAlbum(){
    if(this.whois == 'HomeArtist'){
      this.cd.navigate([this.whois,this.idnumber,'Album',1])  
    }else{
      this.cd.navigate([this.whois,this.idnumber,'ArtistAlbum',1])
    }
    
  }

}
