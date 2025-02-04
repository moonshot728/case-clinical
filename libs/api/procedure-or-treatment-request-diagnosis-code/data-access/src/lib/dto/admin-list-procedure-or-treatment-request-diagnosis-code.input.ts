import { Field,InputType } from '@nestjs/graphql'
import { CorePagingInput } from '@case-clinical/api/core/data-access'

@InputType()
export class AdminListProcedureOrTreatmentRequestDiagnosisCodeInput extends CorePagingInput {
  @Field({ nullable: true }) 
  name?: string


  @Field({ nullable: true }) 
  diagnosisCodeId?: string  


  @Field({ nullable: true }) 
  procedureOrTreatmentRequestId?: string  


}
