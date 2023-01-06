import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class RolePermissionsService extends BaseHttp {
    getRolePermissionsByRoleIdUrl: string = 'rolePermissions?roleId=';
    getAccessPermissionsUrl: string = 'getAll?operation=pemissions';
    saveRolePermissionsUrl: string = 'saveRolePermission';
    getTableNamesUrl: string = 'getAll?operation=tables';
    setDefaultPermissionsUrl: string = 'saveDefaultRolePermission';

    getAccessPermissions() {
        return this.get<any>(this.getAccessPermissionsUrl);
    }

    getAllTableNames() {
        return this.get<any>(this.getTableNamesUrl);
    }

    getRolePermissionsByRoleId(roleId: any) {
        return this.get<any>(this.getRolePermissionsByRoleIdUrl + roleId);
    }

    saveRolepermission(RolePermissions: any) {
        return this.post<any>(this.saveRolePermissionsUrl, RolePermissions);
    }

    setDefaultPermissions(RolePermissions: any) {
        return this.post<any>(this.setDefaultPermissionsUrl, RolePermissions);
    }
}