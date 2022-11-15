import { Component, Input, OnInit } from '@angular/core';
import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  idurl!:number
  retrievedImage!:string
  @Input('text') text: string = "";
  @Input('date') date: any;
  @Input('owner') owner!: boolean;
  @Input('colorBackRight') colorBackRight: string = "";
  @Input('colorFontRight') colorFontRight: string= "";
  @Input('colorBackLeft') colorBackLeft: string= "";
  @Input('colorFontLeft') colorFontLeft: string= "";

  constructor(private multimediaService:MultimediaService, private ActivatedRoute:ActivatedRoute){


  }

  ngOnInit(){
    let id = parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)
    this.idurl = id
    
    this.getImage()
  }

  getImage(){
    this.multimediaService.getImageByUserId(this.idurl).subscribe((response: any)=>{
           this.retrievedImage=response.content[0].imagenUrl
           console.log(this.retrievedImage)
    })
  }
}
