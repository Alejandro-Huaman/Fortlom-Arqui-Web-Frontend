import { ReportService } from './../../../services/report/report.service';
import { ArtistService } from './../../../services/artist/artist.service';
import { FanaticService } from './../../../services/fanatic/fanatic.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-banPerson',
  templateUrl: './banPerson.component.html',
  styleUrls: ['./banPerson.component.css']
})
export class BanPersonComponent implements OnInit {
  selectedValue!: string;
  dataSource !:MatTableDataSource<any>;
  isartist!:boolean
  isfanatic!:boolean
  constructor(private FanaticService:FanaticService,private ArtistService:ArtistService,private ReportService:ReportService) { 
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit() {
  }

  change(){
    if(this.selectedValue=="artist"){
        this.isartist=true
        this.isfanatic=false;
        this.getartist()
    }
    if(this.selectedValue=="fanatic"){
     this.isartist=false
     this.isfanatic=true;
     this.getfanatics()
 }
 
 
   }
  getartist(){
      this.ArtistService.getAll().subscribe((response: any)=>{
        this.dataSource.data = response.content;
         console.log( this.dataSource.data)
      })
  }
  getfanatics(){
    this.FanaticService.getAll().subscribe((response: any)=>{
      this.dataSource.data = response.content;
       console.log( this.dataSource.data)
    })
  }
  banartist(id:number){
     this.ArtistService.updateArtistBan(id).subscribe((response: any)=>{
               alert("usuario baneado")
     })


  }
  banfanbatic(id:number){

    this.FanaticService.updateFanaticBan(id).subscribe((response: any)=>{
      alert("usuario baneado")
    })

  }





}
