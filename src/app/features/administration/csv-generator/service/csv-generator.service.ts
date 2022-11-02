import { Injectable } from '@angular/core';
import { BaseHttp } from 'src/app/core/services/baseHttp.service';

@Injectable({
    providedIn: 'root',
})
export class CsvGeneratorService extends BaseHttp {
    getAllTablesListdUrl: string = 'um/getAllCsvTables';
    getSchedulerListUrl: string = 'um/getSchedulerMaster';
    SaveTableDetails: string= 'um/updateSchedulerMaster';

    getAllTables() {
        return this.get<any>(this.getAllTablesListdUrl);
    }

    getSchedularList() {
        return this.get<any>(this.getSchedulerListUrl);
    }

   saveTableDetails(tableDetails: any){
       return this.post<any>(this.SaveTableDetails, tableDetails)
   }
}