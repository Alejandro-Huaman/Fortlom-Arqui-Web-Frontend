import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/models/Album';
import { AlbumService } from 'src/app/services/album/album.service';
import { MusicService } from 'src/app/services/music/music.service';

@Component({
  selector: 'app-OneAlbum',
  templateUrl: './OneAlbum.component.html',
  styleUrls: ['./OneAlbum.component.css']
})
export class OneAlbumComponent implements OnInit {
  idnumber!:number;
  whois!:string
  albumidnumber!:number;
  onealbumobject:Album;
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  retrievedImage!: string;
  constructor(private cd:Router, private route:ActivatedRoute, private albumService:AlbumService, private musicService:MusicService) {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    this.onealbumobject = {} as Album;
   }

  ngOnInit() {
    let pod = parseInt(this.route.snapshot.paramMap.get('id')!);
    let albumpod = parseInt(this.route.snapshot.paramMap.get('albumid')!);
    this.idnumber = pod;
    this.albumidnumber = albumpod;
    let home=(this.route.snapshot.url[0].path);
    if(home == 'HomeArtist'){
      this.whois = 'HomeArtist'
    }else{
      this.whois = 'HomeFanatic'
    }

    console.log(this.idnumber)
    console.log(this.albumidnumber)

    this.getMusicsByAlbumId()
    this.getByIdAlbum()
    
  }

  CreateMusic(){

    this.cd.navigate(['/HomeArtist',this.idnumber,'Album',this.albumidnumber,'CreateMusics'])
    
  }

  getByIdAlbum(){
    this.albumService.getAll().subscribe((response: any) => {
      this.dataSource2.data = response.content;
      console.log(this.dataSource2.data)
      console.log(this.dataSource2.data.length)
      console.log(this.dataSource2.data[0])

      for(let i=0;i<this.dataSource2.data.length;i++){
        if(this.albumidnumber == this.dataSource2.data[i].id){
          this.onealbumobject = this.dataSource2.data[i]
          console.log(this.onealbumobject)
        }
      }

    });
  }

  getMusicsByAlbumId(){
    this.musicService.getSongsByAlbumId(this.albumidnumber).subscribe((response: any) => {
      this.dataSource.data = response.content;
      console.log(this.dataSource.data)
    });
  }

}
