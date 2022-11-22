import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistService } from 'src/app/services/artist/artist.service';

@Component({
  selector: 'app-upgrade-artist-dialog',
  templateUrl: './upgrade-artist-dialog.component.html',
  styleUrls: ['./upgrade-artist-dialog.component.css']
})
export class UpgradeArtistDialogComponent implements OnInit {

  constructor(private artistService: ArtistService, @Inject(MAT_DIALOG_DATA) public idartist:any) { 

  }

  ngOnInit(){
    console.log(this.idartist)
  }

  UpgradeArtist(){
    this.artistService.updateArtistPremium(this.idartist).subscribe((response: any)=>{
              alert("mejorada")
    })
  }
}
