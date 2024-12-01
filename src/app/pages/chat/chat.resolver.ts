import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ChatService } from "../../services/chat.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ChatResolver implements Resolve<unknown>
{

    constructor(private _chatService: ChatService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise <unknown> {
        return this._chatService.getConversations();
    }
}