import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Album } from 'src/app/models/Album';
import { AlbumService } from 'src/app/services/album/album.service';

@Component({
  selector: 'app-CreateAlbum',
  templateUrl: './CreateAlbum.component.html',
  styleUrls: ['./CreateAlbum.component.css']
})
export class CreateAlbumComponent implements OnInit {
  createform!:FormGroup;
  dataSource: MatTableDataSource<any>;
  objectAlbum:Album;
  idurl!:number
  constructor(private albumService:AlbumService,private formBuilder:FormBuilder,private route:ActivatedRoute, private cd:Router) {
    this.dataSource = new MatTableDataSource<any>();
    this.objectAlbum = {} as Album;
  }

  ngOnInit() {
    this.createform=this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
     })

    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    this.idurl= pod;
    console.log(this.idurl)
  }

  CrearAlbum(){
    console.log(this.objectAlbum)
    this.albumService.create(this.idurl,this.objectAlbum).subscribe((response: any) => {
      this.dataSource.data.push( {...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
      alert("Se creo el álbum correctamente")
      this.cd.navigate(["HomeArtist",this.idurl,'Albums'])
    },err=>{
      alert("campos mal puestos")
    });
  }
}