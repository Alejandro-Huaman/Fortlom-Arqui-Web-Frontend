import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from './../../../services/token/token.service';
@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css']
})
export class NavegationComponent implements OnInit {

  constructor(private cd:Router,private route:ActivatedRoute,private tokenService:TokenService) { }

  ngOnInit() {
  }
  enterhome(){
    this.cd.navigate(['/admin'])
  }
  LogOut(){
    this.tokenService.logOut();
  }
  delete(){
    this.cd.navigate(['/admin/delete'])
  }
  create(){
    this.cd.navigate(['/admin/create'])
  }
  ban(){
    this.cd.navigate(['/admin/ban'])
  }
}
