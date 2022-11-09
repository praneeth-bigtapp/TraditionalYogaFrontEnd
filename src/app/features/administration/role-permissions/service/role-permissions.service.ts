import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class RolePermissionsService extends BaseHttp {
    getRolePermissionsByRoleIdUrl: string = 'rolePermissions?roleId=';
    getAccessPermissionsUrl: string = 'getAll?operation=accessPemissions';
    SavePermissionsUrl: string = 'saveRolePermission';
    getTableNamesUrl: string = 'getAll?operation=tables';

    getRolePermissionsByRoleId(roleId: any) {
        return this.get<any>(this.getRolePermissionsByRoleIdUrl + roleId);
    }

    // getAllModules() {
    //     return this.get<any>(this.getModulesUrl);
    // }

    // getAllSubModules() {
    //     return this.get<any>(this.getSubModulesUrl);
    // }

    // getRoles() {
    //     return this.get<any>(this.getRolesUrl);
    // }

    getAccessPermissions() {
        return this.get<any>(this.getAccessPermissionsUrl);
    }

    SaveRolepermission(RolePermissions: any) {
        return this.post<any>(this.SavePermissionsUrl, RolePermissions);
    }

    getAllTableNames() {
        return this.get<any>(this.getTableNamesUrl);
    }
}