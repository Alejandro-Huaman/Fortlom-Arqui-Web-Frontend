import { EventService } from './../../../services/event/event.service';
import { PublicationService } from 'src/app/services/publication/publication.service';
import { Publication } from 'src/app/models/publication';
import { Event } from './../../../models/event';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from "@angular/forms";
@Component({
  selector: 'app-createContent',
  templateUrl: './createContent.component.html',
  styleUrls: ['./createContent.component.css']
})
export class CreateContentComponent implements OnInit {
  img!:any;
  selectedFile!: File;
  selectedValue!: string;
  isevent!:boolean
  ispublication!:boolean
  Event!:Event
  Publication!:Publication
  constructor(private PublicationService:PublicationService,private EventService:EventService,private cd:Router) {
      this.Event = {} as Event;
      this.Publication= {} as Publication;

   }
   @ViewChild('EventForm', {static: false})
   EventForm!: NgForm;
 
   @ViewChild('PublicationForm', {static: false})
   PublicationForm!: NgForm;
  ngOnInit() {
    this.img="https://cdn.discordapp.com/attachments/1008578583251406990/1033911806848147456/image_23.png"
  }
  change(){
    if(this.selectedValue=="event"){
        this.isevent=true
        this.ispublication=false;
       
    }
    if(this.selectedValue=="publication"){
     this.isevent=false
     this.ispublication=true;
    
 }
}
  onFileChanged(event:any){
    this.selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('multipartFile', this.selectedFile);
    this.img=formData
    
  }
  setfecha( event: MatDatepickerInputEvent<Date>){
    console.log(event.value)
    this.Event.registerdate=event.value!
  }
  createevent(){
    console.log(this.Event)
          this.EventService.create(1,this.Event).subscribe((response:any)=>{

         

            this.cd.navigate(['/admin'])
          },err=>{
            alert("campos mal puestos")
          });
         
  }
  createpublicarion(){
    this.PublicationService.create(this.Publication,1,"false").subscribe((response:any)=>{
        this.cd.navigate(['/admin'])
    })
  }
}
