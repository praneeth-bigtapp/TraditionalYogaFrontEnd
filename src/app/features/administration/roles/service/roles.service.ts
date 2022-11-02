import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class RolesService extends BaseHttp {
    getRoles: string = 'um/getAll?operation=roles';
    addRoleUrl: string = 'um/role?operation=add';
    saveRoleUrl: string = 'um/role?operation=save';
    deleteRoleUrl: string = 'um/role?operation=delete';

    getRolesList() {
        return this.get<any>(this.getRoles);
    }

    addRoles(Role: any) {
        return this.post<any>(this.addRoleUrl, Role);
    }

    saveRole(Role: any) {
        return this.post<any>(this.saveRoleUrl, Role);
    }

    deleteRole(role: any) {
        return this.post<any>(this.deleteRoleUrl, role);
    }
}