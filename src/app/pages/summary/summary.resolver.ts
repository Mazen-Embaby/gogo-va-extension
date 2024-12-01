import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { SummaryService } from "src/app/services/summary.service";

@Injectable({
    providedIn: 'root'
})
export class SummaryResolver implements Resolve<unknown>
{

    constructor(private _summaryService: SummaryService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise <unknown> {
        return this._summaryService.getConversations();
    }
}