import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  id;
  chatBox:any;
  
  constructor(public chatService:ChatService,private router: ActivatedRoute, public session: SessionService) { }

  ngOnInit() {
    this.router.params.subscribe((params)=>{
      this.id = params
    })
  }


  sendMessage(message){
    console.log("hola")
    const id = this.id
    const myId = this.session.user["_id"]
    this.chatService.sendMessageTo( message, id, myId)
  }
}
