import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class ViewDataService extends BaseHttp {
    getTableNamesBySubModuleIdAndRoleIdUrl: string = 'um/subModulePermissions';
    getViewDataUrl: string = 'api/getTableData';

    getTableNamesBySubModuleIdAndRoleId(RoleId: any, SubModuleId: any) {
        return this.get<any>(this.getTableNamesBySubModuleIdAndRoleIdUrl + "?roleId=" + RoleId + "&subModuleId=" + SubModuleId);
    }

    getViewData(data: any) {
        return this.post<any>(this.getViewDataUrl, data)
    }

    getViewDataAsArray(pkTableDetails:any,fkTableDetails:any): Observable<any[]>{
        let PKUrl=this.post<any>(this.getViewDataUrl, pkTableDetails);
        let FKUrl=this.post<any>(this.getViewDataUrl, fkTableDetails);
        return forkJoin([PKUrl,FKUrl]);
    }

    getViewDataFK(data: any) {
        return this.post<any>(this.getViewDataUrl, data).toPromise();
    }

}