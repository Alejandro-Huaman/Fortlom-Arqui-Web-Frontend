import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Music } from 'src/app/models/Music';
import { MusicService } from 'src/app/services/music/music.service';

@Component({
  selector: 'app-CreateMusic',
  templateUrl: './CreateMusic.component.html',
  styleUrls: ['./CreateMusic.component.css']
})
export class CreateMusicComponent implements OnInit {
  createform!:FormGroup;
  dataSource: MatTableDataSource<any>;
  objectMusic:Music;
  categories:string[] = ["Rock","Pop","Metal","Regueton","Jazz","Classic","Blues","Country"]
  idurl!:number
  albumidurl!:number;
  constructor(private musicService:MusicService, private formBuilder:FormBuilder,private route:ActivatedRoute, private cd:Router) {
    this.dataSource = new MatTableDataSource<any>();
    this.objectMusic = {} as Music;
   }

  ngOnInit() {
    this.createform=this.formBuilder.group({
      name:['',Validators.required],
      musicurl:['',Validators.required],
      category:['',Validators.required],
     })

    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let albumpod=parseInt(this.route.snapshot.paramMap.get('albumid')!);
    this.idurl= pod;
    this.albumidurl = albumpod;
    console.log(this.idurl)
    console.log(this.albumidurl)
  }

  CrearMusica(){
    console.log(this.objectMusic)
    this.musicService.create(this.albumidurl,this.objectMusic).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      alert("Se creo la canción correctamente")
      this.cd.navigate(["HomeArtist",this.idurl,'Album',this.albumidurl])
    },err=>{
      alert("campos mal puestos")
    });
  }
  
}