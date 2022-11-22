import { HttpClient } from '@angular/common/http';
import { Person } from 'src/app/models/Person';
import { Fanatic } from 'src/app/models/fanatic';
import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {NgForm} from "@angular/forms";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FanaticService } from 'src/app/services/fanatic/fanatic.service';
import { PersonService } from 'src/app/services/person/person.service';
import { MultimediaService } from 'src/app/services/multimedia/multimedia.service';
@Component({
  selector: 'app-configuration-fanatic',
  templateUrl: './configuration-fanatic.component.html',
  styleUrls: ['./configuration-fanatic.component.css']
})
export class ConfigurationFanaticComponent implements OnInit {

  fanaticdata!: Fanatic;
  userdata!: Person;
  idnumber!:number;
  numberuser : number = 5;
  dataSource!: MatTableDataSource<any>;
  arraygenders : string[] = [];
  aleatorygender: string[] = ["Rock","Pop","Indie","Complex","Jazz","Blues","Electro"]

  @ViewChild('UserForm', {static: false})
  UserForm!: NgForm;

  @ViewChild('FanaticForm', {static: false})
  FanaticForm!: NgForm;

  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;

  constructor(private fanaticService: FanaticService,private userService: PersonService,private dialog:MatDialog,private route:ActivatedRoute,private MultimediaService:MultimediaService) {
    this.fanaticdata = {} as Fanatic;
    this.userdata = {} as Person;
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit():void {
    this.dataSource.paginator = this.paginator;
    console.log(this.arraygenders);
    
    

    let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id= pod;
    this.idnumber=id;

    this.getFanaticByUserId();
  }

  AddGenders(){
    var n = this.aleatorygender.length;
    console.log(n);
    var i = Math.floor(Math.random() * (n-0)) + 0;
    console.log(i);
    var genderselection = this.aleatorygender[i];
    console.log(genderselection)
    this.arraygenders.push(genderselection);
    console.log(this.arraygenders);
  }

  getAllFanatics() {
    this.fanaticService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      console.log(response)
    });
  }



  updateFanatic() {
    console.log(this.fanaticdata.id)
    this.fanaticService.update(this.fanaticdata.id, this.fanaticdata).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Fanatic) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  updateUser() {
    console.log(this.userdata.id);
    this.userService.update(this.userdata.id, this.userdata).subscribe((response: any) => {
      this.dataSource.data = this.dataSource.data.map((o: Person) => {
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }

  updatepassword() {
    console.log(this.userdata.id);
    this.userService.updatepassword(this.userdata.id, this.userdata).subscribe((response: any) => {
      alert("password change")
      this.dataSource.data = this.dataSource.data.map((o: Person) => {
        
        if (o.id === response.id) {
          o = response;
        }
        return o;
      });
    });
  }






  getByIdFanatic(id:number) {
    this.fanaticService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;

      console.log(response);
    });
  }

  getByIdUser(id:number) {
    this.userService.getById(id).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.userdata = response;
      console.log(this.userdata);
    });
  }

  getFanaticByUserId(){
    console.log(this.idnumber)
    this.fanaticService.getById(this.idnumber).subscribe((response: any) => {
      this.dataSource.data = response;
      this.dataSource.paginator=this.paginator;
      this.fanaticdata = response;
      console.log(this.fanaticdata);
         this.getImage()
        this.userService.getById(this.fanaticdata.id).subscribe((response: any) => {
          this.dataSource.data = response;
          this.dataSource.paginator=this.paginator;
          this.userdata = response;
          console.log(this.userdata)

        });
    });
  }




  imagenMin!: File;
  selectedFile!: File;
  public onFileChanged(event:any) {
    this.selectedFile = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    };
    fr.readAsDataURL(this.selectedFile);
    console.log("image")
    this.MultimediaService.getImageByUserId(this.userdata.id).subscribe((response: any)=>{

           if(response.content.length){
                 console.log(response.content[0])
                 this.MultimediaService.delete(response.content[0].id).subscribe((response: any)=>{
                 
                  this.MultimediaService.createimageforuser(this.selectedFile,this.userdata.id).subscribe((response: any)=>{
                           console.log("actualizado")
                           this.retrievedImage=response.body.imagenUrl
                  })
                })

           }else{
            console.log("sin imagen")
            this.MultimediaService.createimageforuser(this.selectedFile,this.userdata.id).subscribe((response: any)=>{
                    this.retrievedImage=response.imagenUrl
            })
           }

    })
  
  
  
  
  
  }
  retrievedImage: any;
    base64Data: any;
    retrieveResonse: any;
  getImage(){
    this.MultimediaService.getImageByUserId(this.fanaticdata.id).subscribe((response: any)=>{
      if(response.numberOfElements==0){
        this.retrievedImage="https://cdn.discordapp.com/attachments/1008578583251406990/1031677299101286451/unknown.png"
       }
       else{
        this.retrievedImage=response.content[0].imagenUrl
       }
      },err=>{
        this.retrievedImage="https://cdn.discordapp.com/attachments/1008578583251406990/1031677299101286451/unknown.png"
    })
  }








}
