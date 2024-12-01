import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { TranslationService } from "src/app/services/translation.service";


@Injectable({
    providedIn: 'root'
})
export class TranslationResolver implements Resolve<unknown>
{

    constructor(private _translationService: TranslationService) {
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise <unknown> {
        return this._translationService.getConversations();
    }
}