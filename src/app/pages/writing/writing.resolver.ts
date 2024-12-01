import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { WritingService } from "src/app/services/writing.service";

@Injectable({
    providedIn: 'root'
})
export class WritingResolver implements Resolve<unknown>
{

    constructor(private _writingService: WritingService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise <unknown> {
        return this._writingService.getConversations();
    }
}