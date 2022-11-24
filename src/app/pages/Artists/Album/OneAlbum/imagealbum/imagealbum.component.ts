import { MultimediaService } from './../../../../../services/multimedia/multimedia.service';
import { Component, OnInit,Input } from '@angular/core';
import { Album } from 'src/app/models/Album';

@Component({
  selector: 'app-imagealbum',
  templateUrl: './imagealbum.component.html',
  styleUrls: ['./imagealbum.component.css']
})
export class ImagealbumComponent implements OnInit {

  constructor(private MultimediaService:MultimediaService) { }
  @Input() id!:number 
  retrievedImage!: string;
  ngOnInit() {
    console.log("this.id")
    console.log(this.id)
    this.MultimediaService.getImageByAlbum(this.id).subscribe((response:any)=>{
      if(response.numberOfElements==0){
        this.retrievedImage="https://cdn.discordapp.com/attachments/1008578583251406990/1031677299101286451/unknown.png"
        console.log(this.retrievedImage)
        
       }
       else{
        this.retrievedImage=response.content[0].imagenUrl
       }
    })
  }

}
