import { Component, OnInit,Input } from '@angular/core';
import { Rate } from 'src/app/models/rate';
import { RateService } from 'src/app/services/rate/rate.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {

  @Input() idcomment!:number
  idactualuser!:number
  constructor(private rateservice:RateService,private route:ActivatedRoute) {

    this.rate={}as Rate;

  }
  value!:number;
  val!: number
  rate!:Rate
  ngOnInit(): void {
    let pad=parseInt(this.route.snapshot.paramMap.get('id')!);
    let id2= pad;
    this.idactualuser=id2;
   
   
  }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    this.val = value;
    return value;
  }
  new_rate( aId: number){
    console.log('rate:' + aId)
    this.rate.review=aId;
    this.NewRate();


  }
  NewRate(){
    console.log("Entrando a funcion NewRate")

   
    this.rateservice.existbyartistoidandfanaticid(this.idcomment,this.idactualuser).subscribe((response:any)=>{
         console.log("entro")
      if(response==false){
        this.rateservice.create(this.idcomment,this.idactualuser,this.rate).subscribe((response: any) => {

          alert("Se ha calificado al artista")
          console.log("Se ha calificado al artista")
    
        });
      }
      else{
             this.rateservice.getByartistIdandfanaticid(this.idcomment,this.idactualuser).subscribe((response:any)=>{
                       console.log(response.content[0])
                       console.log(this.rate.review)
                       this.rateservice.update(response.content[0].id,this.rate).subscribe((response:any)=>{
                             alert("Se ha calificado al artista")
                             console.log("Se ha calificado al artista")
                             return(response)
                             
                       })
             })
      }

    })



   


  }

}
