import { Injectable } from "../../node_modules/@angular/core";
import * as io from 'socket.io-client';
import {SessionService} from '../services/session';
import { environment } from '../environments/environment';
interface Message {
 origin:string;
 content:string;
}
const {BASEURL} = environment;
@Injectable()
export class ChatService {

 socket:SocketIOClient.Socket;
 messages:Array<Message> = [];

 constructor(private sessionService: SessionService){

   // Connect to websocket for chat
   this.socket = io(`${BASEURL}`);
   this.socket.on('connect',() =>console.log("Connected to Chat"));

   // Save messages into array as they arrive from server
   this.socket.on('FreackMessage',(data) => {
     // Actually push the message when arrives
     this.messages.push({
       origin:'Server',
       content:data
     });
   })

   this.sessionService.isLogged().subscribe(user =>{
    this.socket.on(`${user._id}`,(data) => {
      this.messages.push({
        origin:'Server',
        content:data
      });
    })

   })

 }

 sendMessageTo(message, id, myId){
  
   var idbueno = id.id
   console.log(idbueno)
   this.socket.emit('messageto', {message, idbueno, myId})
 }

 sendMessage(message:string){
   console.log(`Sending message -> ${message}`);
   this.socket.emit('FreackMessage', message);
   this.messages.push({
     origin: this.sessionService.user.username,
     content:message
   });
 }

}