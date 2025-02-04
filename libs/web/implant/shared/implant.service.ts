
import { Injectable, Inject, Optional } from "@angular/core";
import { LoggingService } from "@schema-driven/logging";
import { Observable } from "rxjs";
import { Implant, UserCreateImplantInput, UserUpdateImplantInput, UpdateResult, ImplantCategory, Contact, Manufacturer } from "@case-clinical/shared/util/sdk";
import { ImplantBusinessProviderService } from "./implant.business-provider.service";
import { ServiceBase, ServiceContext } from "@schema-driven/foundation";

@Injectable({providedIn: 'root'})
export class ImplantService extends ServiceBase {
 constructor(
  @Inject(ImplantBusinessProviderService)
  @Optional() serviceContext: ServiceContext,
  private businessProvider: ImplantBusinessProviderService,
  loggingService: LoggingService
 ) {
    super("ImplantService", loggingService, serviceContext);
 }

    createImplant(input: UserCreateImplantInput): Observable<Implant> {
        const filteredObj = Object.fromEntries(Object.entries(input).filter(([key, value]) => value !== null));
        return this.businessProvider.createImplant(filteredObj);
    }

    updateImplant(input: UserUpdateImplantInput, implantId: string): Observable<Implant> {
        return this.businessProvider.updateImplant(input, implantId);
    }

    importImplants(implants: UserUpdateImplantInput[]): Observable<UpdateResult> {
        return this.businessProvider.importImplants(implants);
    }

    validateImplantExcelData(excelData: any[], implantCategories: ImplantCategory[], salesRepresentatives: Contact[], manufacturers: Manufacturer[]) {
      return this.businessProvider.validateImplantExcelData(excelData, implantCategories, salesRepresentatives, manufacturers);
    }
}

