import { ArtistService } from 'src/app/services/artist/artist.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum/forum.service';
@Component({
  selector: 'app-FanaticForumCreate',
  templateUrl: './FanaticForumCreate.component.html',
  styleUrls: ['./FanaticForumCreate.component.css']
})
export class FanaticForumCreateComponent implements OnInit {

  public createform!:FormGroup;
  Forum!:Forum
  isHidden=true
  idnumber!:number;
  dataSource !:MatTableDataSource<any>;
  constructor(private formBuilder:FormBuilder,private service:ForumService,
    private route:ActivatedRoute,private cd:Router,private ArtistService:ArtistService) {
this.Forum={}as Forum;
this.Forum.forumname;

this.dataSource = new MatTableDataSource<any>();
   }

  ngOnInit() {
    this.createform=this.formBuilder.group({
      name:['',Validators.required],
      description:['',Validators.required],
     })
     let pod=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id= pod;
    this.idnumber=id;
    let sa=(this.route.snapshot.url[0].path);
    console.log(sa)
    this.getartist()
  }

crearforo(){

//this.Forum.user.id=this.idnumber

this.AddForum(this.idnumber)
let pod=(this.route.snapshot.url[0].path);
if (pod=='HomeArtist'){
  this.cd.navigate(['/HomeArtist',this.idnumber])
}
else{
  this.cd.navigate(['/HomeFanatic',this.idnumber])
}


}
getartist(){
  this.ArtistService.checkartistid(this.idnumber).subscribe((response:any)=>{
            this.isHidden=response
  })
}

AddForum(id:number){


  this.service.create(this.Forum,id).subscribe((response: any) => {
    this.dataSource.data.push( {...response});
    this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
    alert("se creo su foro exitosamente")
  },err=>{
    alert("este foro ya existe")
  });

}

}
