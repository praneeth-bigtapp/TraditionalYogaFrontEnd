import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class RolesService extends BaseHttp {
    getRoles: string = 'getAll?operation=roles';
    addRoleUrl: string = 'role?operation=add';
    saveRoleUrl: string = 'role?operation=save';
    activateRoleUrl: string = 'role?operation=active';
    deleteRoleUrl: string = 'role?operation=delete';
    deactiveRoleUrl: string = "role?operation=deactive"

    getRolesList() {
        return this.get<any>(this.getRoles);
    }

    addRoles(Role: any) {
        return this.post<any>(this.addRoleUrl, Role);
    }

    saveRole(Role: any) {
        return this.post<any>(this.saveRoleUrl, Role);
    }

    activateRole(Role: any) {
        return this.post<any>(this.activateRoleUrl, Role);
    }
    deactivateRole(Role: any) {
        return this.post<any>(this.deactiveRoleUrl, Role);
    }

    deleteRole(role: any) {
        return this.post<any>(this.deleteRoleUrl, role);
    }
}