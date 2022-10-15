import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';
import { Message } from '../models/message.model';
import { TextMessage } from '../models/text-messsage.model';
import { ResponseMessage } from '../models/response-message.model';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  BACK_ENABLED: boolean = true;
  @Input('messages') messages: Message[]=[];
  @Input('colorBackRight') colorBackRight: string = "";
  @Input('colorFontRight') colorFontRight: string = "";
  @Input('colorBackLeft') colorBackLeft: string = "";
  @Input('colorFontLeft') colorFontLeft: string = "";

  textInput = '';

  constructor(private chatService: ChatService) {}

  ngOnInit() {


  }

  sendMessage(){
    let newMessage: Message = { text: this.textInput, date: "", userOwner: true};

    this.messages.push(newMessage);

    let messageBack: TextMessage = { "firstname": environment.firstName, "text": this.textInput}
    if(this.BACK_ENABLED){
      this.chatService.sendMessage(messageBack)
      .subscribe((res: ResponseMessage) => {
        let messageReturn: Message = { text: res.responseMessage, date: new Date().toDateString(), userOwner: false}
        this.messages.push(messageReturn);

      });
    }
    this.textInput = '';
  }

  onKey(event: any){
    if(event.keyCode == 13){
      this.sendMessage();
    }
  }

 

}
