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
import { Event } from 'src/app/models/event'
import { EventService } from 'src/app/services/event/event.service';
import { ArtistService } from 'src/app/services/artist/artist.service';
import { Artist } from 'src/app/models/artist';

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
  objectevent:Event
  artist:Artist
  cont:number = 0
  auxLinks:any = [];
  @Input('messages') messages: Message[]=[];
  @Input('colorBackRight') colorBackRight: string = "";
  @Input('colorFontRight') colorFontRight: string = "";
  @Input('colorBackLeft') colorBackLeft: string = "";
  @Input('colorFontLeft') colorFontLeft: string = "";
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;

  textInput = '';

  constructor(private chatService: ChatService,private publicationService: PublicationService,private eventService:EventService,private ActivatedRoute:ActivatedRoute, 
    private artistService:ArtistService) {

    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    this.object = {} as Publication;
    this.objectevent = {} as Event;
    this.artist = {} as Artist;
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
        this.chatService.sendMessage(messageBack).subscribe((res: ResponseMessage) => {
          let messageReturn: Message = { text: res.responseMessage, date: new Date().toDateString(), userOwner: false}
          this.messages.push(messageReturn);
          console.log(messageBack)
          console.log(res.responseMessage)
          //Para crear publicaciones
          
          if(res.responseMessage == "Este será la descripción de tu publicación, seguro de esta respuesta?"){
            console.log(messageBack)
            console.log(res.responseMessage)

            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
            
              if(resartist == true){
                this.object.description = String(messageBack.text)
                console.log(this.object)
                let mayus=this.auxLinks.length > 0
                this.publicationService.create(this.object,this.idurl,String(mayus)).subscribe((response: any) => {
                  this.dataSource.data.push( {...response});
                  this.dataSource.data = this.dataSource.data.map((o: any) => { return o; });
                });
              }else{
                alert("No es un artista por tal motivo no puede crear publicaciones!")
              }

            });
          }
          //Para crear eventos

          if(res.responseMessage == "Este será la descripción de tu evento, seguro de esta respuesta?"){
            console.log(messageBack)
            console.log(res.responseMessage)
            
            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              if(resartist == true){
                this.artistService.checkremiumartistid(this.idurl).subscribe((respremium: any) => {
                  if(respremium == true){
                    this.cont+=1
                    this.objectevent.description = String(messageBack.text)
                    this.objectevent.name = "Event " + String(this.cont)
                    this.objectevent.ticketLink = "https://teleticket.com.pe/"
                    console.log(this.objectevent)
                    this.eventService.create(this.idurl,this.objectevent).subscribe((response: any) => {
                      this.dataSource2.data.push( {...response});
                      this.dataSource2.data = this.dataSource2.data.map((o: any) => { return o; });
                    });
                  }else{
                    alert("No es artista premium, por favor mejorar su cuenta a premium para crear un evento!")
                  }
                });
              }else{
                alert("No es un artista por tal motivo no puede crear eventos!")
              }

            });
          }

        });
      }
      this.textInput = '';
    }
  }

  onKey(event: any){
    if(event.keyCode == 13){
      this.sendMessage();
    }
  }

 
}
