import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from 'src/app/services/album/album.service';

@Component({
  selector: 'app-Album',
  templateUrl: './Album.component.html',
  styleUrls: ['./Album.component.css']
})
export class AlbumComponent implements OnInit {
  
  idnumber!:number;
  albumsList:string[] = ["Hola","Hola","Hola","Hola",]
  whois!:string
  dataSource: MatTableDataSource<any>;
  constructor(private cd:Router, private route:ActivatedRoute, private albumService: AlbumService) { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
    let pod = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.idnumber = pod;
    let home=(this.route.snapshot.url[0].path);
    if(home == 'HomeArtist'){
      this.whois = 'HomeArtist'
    }else{
      this.whois = 'HomeFanatic'
    }

    this.getAllAlbums()
  }

  CreateAlbum(){

    this.cd.navigate(['/HomeArtist',this.idnumber,'CreateAlbums'])

  }

  GoToOneAlbum(albumid:number){
    if(this.whois == 'HomeArtist'){
      this.cd.navigate([this.whois,this.idnumber,'Album',albumid])  
    }else{
      this.cd.navigate([this.whois,this.idnumber,'ArtistAlbum',albumid])
    }
    
  }

  getAllAlbums(){
    this.albumService.getAll().subscribe((response: any) => {
      this.dataSource.data = response.content;
      console.log(this.dataSource.data)
    });
  }

}
