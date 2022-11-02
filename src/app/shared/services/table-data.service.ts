import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
  providedIn: 'root'
})
export class TableDataService extends BaseHttp {
  getTableNamesBySubModuleIdAndRoleIdUrl: string = 'um/subModulePermissions'
  uploadTableUrl: string = 'api/excel/upload';
  getTableTemplateByTableIdUrl: string = "api/getTableTemplate";
  getTemplateDetailsUrl: string = 'api/getTemplateDetails';
  getAlltablesUrl: string = "um/getAllTables";

  getTableNamesBySubModuleIdAndRoleId(roleId: any, subModuleId: any) {
    return this.get<any>(this.getTableNamesBySubModuleIdAndRoleIdUrl + `?roleId=${roleId}&subModuleId=${subModuleId}`);
  }

  uploadTableData(tableData: any) {
    return this.post<any>(this.uploadTableUrl, tableData);
  }

  getTableTemplateByTableId(tableId: any) {
    return this.get<any>(this.getTableTemplateByTableIdUrl + "?tableId=" + tableId);
  }
  getTemplateDetails(tableId: any, templateId: any) {
    return this.get<any>(this.getTemplateDetailsUrl + "?tableId=" + tableId + "&templateId=" + templateId);
  }

  getTemplatePermission(tableId: any) {
    return this.get<any>(this.getTableTemplateByTableIdUrl + "?tableId=" + tableId);
  }

  getAllTables(){
    return this.get<any>(this.getAlltablesUrl);
}
}
