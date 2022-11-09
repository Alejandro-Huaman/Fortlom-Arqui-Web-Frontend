import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { Message } from '../models/message.model';
import { TextMessage } from '../models/text-messsage.model';
import { ResponseMessage } from '../models/response-message.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../environments/environment';
import { ArtistNavegationComponent } from '../../Artists/ArtistNavegation/ArtistNavegation.component';
import { FanaticnavigationComponent } from '../../Fanatic/fanaticnavigation/fanaticnavigation.component';
import { PublicationService } from 'src/app/services/publication/publication.service';
import { Publication } from 'src/app/models/publication';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  whois=""
  idurl!:number
  home!:string
  BACK_ENABLED: boolean = true;
  object:Publication
  auxLinks:any = [];
  @Input('messages') messages: Message[]=[];
  @Input('colorBackRight') colorBackRight: string = "";
  @Input('colorFontRight') colorFontRight: string = "";
  @Input('colorBackLeft') colorBackLeft: string = "";
  @Input('colorFontLeft') colorFontLeft: string = "";
  dataSource: MatTableDataSource<any>;

  textInput = '';

  constructor(private chatService: ChatService,private publicationService: PublicationService,private ActivatedRoute:ActivatedRoute) {
    this.dataSource = new MatTableDataSource<any>();
    this.object = {} as Publication;
  }

  ngOnInit() {
    let id=parseInt(this.ActivatedRoute.snapshot.paramMap.get('id')!)
    console.log(this.ActivatedRoute.snapshot.url[0].path)

    this.whois=(this.ActivatedRoute.snapshot.url[0].path)
    this.idurl=id
    if(this.whois=="HomeArtist"){
      this.home="HomeArtist"
    }
    if(this.whois=="HomeFanatic"){
     this.home="HomeFanatic"
    }
    console.log(typeof this.textInput)
  }

  sendMessage(){
    if(this.textInput != ""){
      let newMessage: Message = { text: this.textInput, date: "", userOwner: true};

      this.messages.push(newMessage);

      let messageBack: TextMessage = { "firstname": environment.firstName, "text": this.textInput}
      if(this.BACK_ENABLED){
        this.chatService.sendMessage(messageBack)
        .subscribe((res: ResponseMessage) => {
          let messageReturn: Message = { text: res.responseMessage, date: new Date().toDateString(), userOwner: false}
          this.messages.push(messageReturn);
          console.log(messageBack)
          if(res.responseMessage == "Este será la descripción de tu contenido, seguro de esta respuesta?"){
            console.log(messageBack)
            this.object.description = String(messageBack.text)
            console.log(this.object)
            let mayus=this.auxLinks.length > 0
            this.publicationService.create(this.object,this.idurl,String(mayus)).subscribe((response: any) => {
              this.dataSource.data.push( {...response});
              this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
            });
          }
        });
        //this.ObtainMessage();
      }
      this.textInput = '';
    }
  }

  ObtainMessage(){
    let messageBack: TextMessage = { "firstname": environment.firstName, "text": this.textInput}
      
    if(this.BACK_ENABLED){
      this.chatService.sendMessage(messageBack).subscribe((res: ResponseMessage) => {
        if(res.responseMessage == "Este será la descripción de tu contenido, seguro de esta respuesta?"){
          this.object.description = this.textInput
          console.log(this.object)
          let mayus=this.auxLinks.length > 0
          this.publicationService.create(this.object,this.idurl,String(mayus)).subscribe((response: any) => {
            this.dataSource.data.push( {...response});
            this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
          });
        }
      });
    }
  }

  onKey(event: any){
    if(event.keyCode == 13){
      this.sendMessage();
    }
  }

 
}
