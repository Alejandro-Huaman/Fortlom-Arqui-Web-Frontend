import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-OneAlbum',
  templateUrl: './OneAlbum.component.html',
  styleUrls: ['./OneAlbum.component.css']
})
export class OneAlbumComponent implements OnInit {
  idnumber!:number;
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

  

}
