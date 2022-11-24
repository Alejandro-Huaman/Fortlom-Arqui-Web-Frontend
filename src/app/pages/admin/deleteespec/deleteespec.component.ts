import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event/event.service';
import { PublicationService } from 'src/app/services/publication/publication.service';
import { TokenService } from './../../../services/token/token.service';

export interface Content{
  name:string
  description:string
}

@Component({
  selector: 'app-deleteespec',
  templateUrl: './deleteespec.component.html',
  styleUrls: ['./deleteespec.component.css']
})

export class DeleteespecComponent implements OnInit {
  idcontent!:number
  whois:string = ""
  objectcontent: Content
  constructor(private ActivatedRoute:ActivatedRoute,private cd:Router,private tokenService:TokenService,private publicationService:PublicationService,private eventService:EventService) { 
    this.objectcontent = {} as Content
  }

  ngOnInit() {
    let id=parseInt(this.ActivatedRoute.snapshot.paramMap.get('idcontent')!)
    this.idcontent = id
    console.log(this.idcontent)
    
    this.publicationService.existpublication(this.idcontent).subscribe((response:any)=>{
        if(response == true){
          this.whois = "Publication"
        }else{
          this.whois = "Event"
        }
        console.log(this.whois)

        this.GetInfoContent(this.whois)
    })
  }

  DeleteContent(who:string){
    if(who == "Publication"){
      this.publicationService.delete(this.idcontent).subscribe((response:any)=>{
        alert("Eliminacion de la publicación de manera correcta")
        this.cd.navigate(["admin",'delete'])
      })
    }else{
      this.eventService.delete(this.idcontent).subscribe((response:any)=>{
        alert("Eliminacion del evento de manera correcta")
        this.cd.navigate(["admin",'delete'])
      })
    }
  }

  GetInfoContent(who:string){
    if(who == "Publication"){
      this.publicationService.getById(this.idcontent).subscribe((response:any)=>{
        this.objectcontent.name = ""
        this.objectcontent.description  = response.description
      })
    }else{
      this.eventService.getById(this.idcontent).subscribe((response:any)=>{
        this.objectcontent.name = response.name
        this.objectcontent.description = response.description
      })
    }
  }

}
