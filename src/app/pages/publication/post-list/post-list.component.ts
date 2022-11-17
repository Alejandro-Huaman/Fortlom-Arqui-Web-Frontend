import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import { ActivatedRoute } from '@angular/router';
import { FanaticService } from 'src/app/services/fanatic/fanatic.service';
import { PublicationService } from 'src/app/services/publication/publication.service';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  studentData: any;
  dataSource: MatTableDataSource<any>;
  haveInfo = false;
  idurl!:number
  isFanatic:boolean = false

  constructor(private postService: PublicationService,private ActivatedRoute:ActivatedRoute, private fanaticService:FanaticService) {
    this.studentData = {}
    this.dataSource = new MatTableDataSource<any>();
    this.haveInfo = false;
  }

  ngOnInit(): void {
    let id=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)    
    this.idurl = id
    console.log(this.idurl)

    this.fanaticService.checkfanatic(this.idurl).subscribe((response:any) =>{
      this.isFanatic = response
      console.log(this.isFanatic)
    });
  }

  getPosts(): void {
    this.postService.getAll().subscribe((response: any) => {
      
      this.dataSource.data = response.content;
      this.studentData = this.dataSource.data;
      if(this.haveInfo == false){
        this.haveInfo = true;
      }else{
        this.haveInfo = false;
      }
    });
  }

}
