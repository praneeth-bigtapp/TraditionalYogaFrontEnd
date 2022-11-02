import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class TableConfiguratorService extends BaseHttp {
    getTableNamesBySubModuleIdAndRoleIdUrl: string = 'um/subModulePermissions';
    getAllTemplatesUrl: string = "api/getAllTemplates";
    getTableColumnsUrl: string = "api/getTableColumns";
    getTableTemplateByTableIdUrl: string = "api/getTableTemplate";
    getTemplateDetailsUrl: string = 'api/getTemplateDetails';
    getSaveTemplateDetailsUrl: string = "api/saveTemplateDetails";
    getAlltablesUrl: string = "um/getAllTables";

    getTableNamesBySubModuleIdAndRoleId(RoleId: any, SubModuleId: any) {
        return this.get<any>(this.getTableNamesBySubModuleIdAndRoleIdUrl + "?roleId=" + RoleId + "&subModuleId=" + SubModuleId);
    }

    getAllTemplates() {
        return this.get<any>(this.getAllTemplatesUrl);
    }

    getTableColumns(tableDetails: any) {
        return this.post<any>(this.getTableColumnsUrl, tableDetails);
    }

    getTableTemplateByTableId(tableId: any) {
        return this.get<any>(this.getTableTemplateByTableIdUrl + "?tableId=" + tableId);
    }

    getTemplateDetails(tableId: any, templateId: any) {
        return this.get<any>(this.getTemplateDetailsUrl + "?tableId=" + tableId + "&templateId=" + templateId);
    }

    getSaveTemplateDetails(templateDetails: any) {
        return this.post<any>(this.getSaveTemplateDetailsUrl, templateDetails);
    }

    getAllTables(){
        return this.get<any>(this.getAlltablesUrl);
    }
}