import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class RolePermissionsService extends BaseHttp {
    getRolePermissionsByRoleIdUrl: string = 'um/rolePermissions';
    getModulesUrl: string = 'um/getAll?operation=modules';
    getSubModulesUrl: string = 'um/getAll?operation=submodules';
    getRolesUrl: string = 'um/getAll?operation=roles';
    getAccessPermissionsUrl: string = 'um/getAll?operation=accessPemissions';
    SavePermissionsUrl: string = 'um/saveRolePermission';
    getTableNamesUrl: string = 'um/getAll?operation=tables';

    getRolePermissionsByRoleId(roleId: any) {
        return this.get<any>(this.getRolePermissionsByRoleIdUrl + "?roleId=" + roleId);
    }

    getAllModules() {
        return this.get<any>(this.getModulesUrl);
    }

    getAllSubModules() {
        return this.get<any>(this.getSubModulesUrl);
    }

    getRoles() {
        return this.get<any>(this.getRolesUrl);
    }

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