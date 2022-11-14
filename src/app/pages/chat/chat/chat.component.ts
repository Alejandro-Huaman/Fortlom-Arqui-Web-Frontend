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
import { FanaticService } from 'src/app/services/fanatic/fanatic.service';
import { Forum } from 'src/app/models/forum';
import { ForumService } from 'src/app/services/forum/forum.service';

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
  contforum:number = 0
  objectforum:Forum
  auxLinks:any = [];
  @Input('messages') messages: Message[]=[];
  @Input('colorBackRight') colorBackRight: string = "";
  @Input('colorFontRight') colorFontRight: string = "";
  @Input('colorBackLeft') colorBackLeft: string = "";
  @Input('colorFontLeft') colorFontLeft: string = "";
  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any>;
  dataSource3: MatTableDataSource<any>;

  textInput = '';

  constructor(private chatService: ChatService,private publicationService: PublicationService,private eventService:EventService,private ActivatedRoute:ActivatedRoute, 
    private artistService:ArtistService, private fanaticService:FanaticService, private forumService:ForumService) {

    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2 = new MatTableDataSource<any>();
    this.dataSource3 = new MatTableDataSource<any>();
    this.object = {} as Publication;
    this.objectevent = {} as Event;
    this.artist = {} as Artist;
    this.objectforum = {} as Forum;
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
          if(res.responseMessage == "Se creo la publicación correctamente :D" || res.responseMessage == "Se creo el evento correctamente :D" || res.responseMessage == "Se creo el foro correctamente :D"){
            
          }else if(res.responseMessage == "Muy bien, que tipo de usuario es?"){
            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              if(resartist == true){

                this.artistService.checkremiumartistid(this.idurl).subscribe((respremium: any) => {
                
                if(respremium == true){
                  let premiummessage:Message = { text: "Es un artista con plan premium por lo cual puede crear publicaciones y eventos", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(premiummessage);
                }else{
                  let artistmessage:Message = { text: "Es un artista con plan free o normal por lo cual puede crear solo publicaciones", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(artistmessage);
                }
                
                });
                
              }else{
                  let fanmessage:Message = { text: "Es un fanatico por lo cual no puede crear contenido mil disculpas :c", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(fanmessage);
              }
            });
          }else if(res.responseMessage == "Perfecto! deseas crear un evento por favor coloque el nombre del evento a crear"){
            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              if(resartist == true){

                this.artistService.checkremiumartistid(this.idurl).subscribe((respremium: any) => {
                
                if(respremium == true){ 
                  this.messages.push(messageReturn);
                }else{
                  let artistmessage:Message = { text: "Es un artista con plan free o normal por lo cual puede crear solo publicaciones", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(artistmessage);
                }
                
                });
                
              }else{
                  let fanmessage:Message = { text: "Es un fanatico por lo cual no puede crear contenido mil disculpas :c", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(fanmessage);
              }
            });
          }else if(res.responseMessage == "Genial! ahora coloque la descripción que desea para su nuevo evento"){
            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              if(resartist == true){

                this.artistService.checkremiumartistid(this.idurl).subscribe((respremium: any) => {
                
                if(respremium == true){ 
                  this.messages.push(messageReturn);
                }else{
                  let artistmessage:Message = { text: "Es un artista con plan free o normal por lo cual puede crear solo publicaciones", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(artistmessage);
                }
                
                });
                
              }else{
                  let fanmessage:Message = { text: "Es un fanatico por lo cual no puede crear contenido mil disculpas :c", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(fanmessage);
              }
            });
          }else if(res.responseMessage == "Perfecto! deseas crear una publicación por favor coloque la descripción que desea colocar"){
            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              if(resartist == true){
                this.messages.push(messageReturn);
              }else{
                  let fanmessage:Message = { text: "Es un fanatico por lo cual no puede crear contenido mil disculpas :c", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(fanmessage);
              }
            });
          }else if(res.responseMessage == "Usted es el siguiente tipo de usuario"){
            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              if(resartist == true){

                this.artistService.checkremiumartistid(this.idurl).subscribe((respremium: any) => {
                
                if(respremium == true){
                  let premiummessage:Message = { text: "Es un artista con plan premium", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(premiummessage);
                }else{
                  let artistmessage:Message = { text: "Es un artista con plan free o normal", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(artistmessage);
                }
                
                });
                
              }else{
                  let fanmessage:Message = { text: "Es un fanatico", date: new Date().toDateString(), userOwner: false} 
                  this.messages.push(fanmessage);
              }
            });
          }else if(res.responseMessage == "Los datos son los siguientes"){
            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              this.fanaticService.checkfanatic(this.idurl).subscribe((resfanatic: any) => {
              
              
                if(resartist == true){
                  this.artistService.getById(this.idurl).subscribe((resobjectartist: any) => {
                      let artistmessage:Message = { text: `Nombre: ${resobjectartist.realname}\n Apellido: ${resobjectartist.lastname}\n Email: ${resobjectartist.email}\n Followers: ${resobjectartist.artistfollowers}` , date: new Date().toDateString(), userOwner: false} 
                      this.messages.push(artistmessage);
                  });
                  
                }
                
                if(resfanatic == true){
                    this.fanaticService.getById(this.idurl).subscribe((resobjectfanatic: any) => {
                      let fanmessage:Message = { text: `Nombre: ${resobjectfanatic.realname}\n Apellido: ${resobjectfanatic.lastname}\n Email: ${resobjectfanatic.email}\n Alias: ${resobjectfanatic.fanaticalias}`, date: new Date().toDateString(), userOwner: false} 
                      this.messages.push(fanmessage);
                    });
                }
              });
            });
          }
          else{
            this.messages.push(messageReturn);
          }

          console.log(messageBack)
          console.log(res.responseMessage)
          //Para crear publicaciones
          
          if(res.responseMessage == "Se creo la publicación correctamente :D"){
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
                  this.messages.push(messageReturn);
                });
              }else{
                let errormessage:Message = { text: "No se creo correctamente! :c", date: new Date().toDateString(), userOwner: false} 
                this.messages.push(errormessage);
                alert("No es un artista por tal motivo no puede crear publicaciones!")
              }

            });
          }
          //Para crear eventos
          //Para colocar el nombre del evento
          if(res.responseMessage == "Genial! ahora coloque la descripción que desea para su nuevo evento"){
            console.log(messageBack)
            console.log(res.responseMessage)

            this.objectevent.name = String(messageBack.text)
            console.log(this.objectevent)
            console.log(this.objectevent.name)
          }

          //Para colocar su descripcion del evento
          if(res.responseMessage == "Se creo el evento correctamente :D"){
            console.log(messageBack)
            console.log(res.responseMessage)

            this.artistService.checkartistid(this.idurl).subscribe((resartist: any) => {
              if(resartist == true){
                this.artistService.checkremiumartistid(this.idurl).subscribe((respremium: any) => {
                  if(respremium == true){

                    this.objectevent.description = String(messageBack.text)
                    this.objectevent.ticketLink = "https://teleticket.com.pe/"
                    console.log(this.objectevent)
                    this.eventService.create(this.idurl,this.objectevent).subscribe((response: any) => {
                      this.dataSource2.data.push( {...response});
                      this.dataSource2.data = this.dataSource2.data.map((o: any) => { return o; });
                      this.messages.push(messageReturn);
                    });
                  }else{
                    let errormessage:Message = { text: "No se creo correctamente! :c", date: new Date().toDateString(), userOwner: false} 
                    this.messages.push(errormessage);
                    alert("No es artista premium, por favor mejorar su cuenta a premium para crear un evento!")
                  }
                });
              }else{
                let errormessage:Message = { text: "No se creo correctamente! :c", date: new Date().toDateString(), userOwner: false} 
                this.messages.push(errormessage);
                alert("No es un artista por tal motivo no puede crear eventos!")
              }

            });
          }

          //Para crear foros
          //Para colocar su titulo del foro
          if(res.responseMessage == "Perfecto! ahora coloque la descripción que desea para su nuevo foro"){
            console.log(messageBack)
            console.log(res.responseMessage)

            this.objectforum.forumname = String(messageBack.text)
            console.log(this.objectforum)
            console.log(this.objectforum.forumname)
          }


          //Para colocar su descripcion del foro
          if(res.responseMessage == "Se creo el foro correctamente :D"){
            console.log(messageBack)
            console.log(res.responseMessage)


            this.objectforum.forumdescription = String(messageBack.text)
            console.log(this.objectforum)
            this.forumService.create(this.objectforum,this.idurl).subscribe((response)=> {
                      this.dataSource3.data.push( {...response});
                      this.dataSource3.data = this.dataSource3.data.map((o: any) => { return o; });
                      this.messages.push(messageReturn);
            },err=>{
              alert("Nombre ya utilizado por otro foro, vuelva a colocar un nombre diferente")
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
