import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
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

  constructor(private postService: PublicationService) {
    this.studentData = {}
    this.dataSource = new MatTableDataSource<any>();
    this.haveInfo = false;
  }

  ngOnInit(): void {
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
