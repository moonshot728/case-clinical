import { Field, InputType } from '@nestjs/graphql'



@InputType()
export class ClaimProcedureInput {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  claimProcedureCodeId?: string

  @Field({ nullable: true }) 
  procedureCodeId?: string

  @Field({ nullable: true }) 
  claimId?: string

  @Field({ nullable: true }) 
  fromDateOfService?: Date

  @Field({ nullable: true }) 
  toDateOfService?: Date

  @Field({ nullable: true }) 
  placeOfServiceId?: string

  @Field({ nullable: true }) 
  nationalDrugCode?: string

  @Field({ nullable: true }) 
  drugUnit?: string

  @Field({ nullable: true }) 
  drugQuantity?: string

  @Field({ nullable: true }) 
  quantity?: number

  @Field({ nullable: true }) 
  billedAmount?: number

  @Field({ nullable: true }) 
  approvedAmount?: number

  @Field({ nullable: true }) 
  adjustmentAmount?: number

  @Field({ nullable: true }) 
  netPaymentAmount?: number

  @Field({ nullable: true }) 
  paymentMethod?: string

  @Field({ nullable: true }) 
  internalMemo?: string

  @Field({ nullable: true }) 
  explainationOfBenefitsComment?: string

  @Field({ nullable: true }) 
  claimStatusId?: string

  @Field({ nullable: true }) 
  reason?: string

  @Field({ nullable: true }) 
  procedureCode?: string

  @Field({ nullable: true }) 
  diagnosisPointer?: string

  @Field({ nullable: true }) 
  modifier1?: string

  @Field({ nullable: true }) 
  modifier2?: string

  @Field({ nullable: true }) 
  modifier3?: string

  @Field({ nullable: true }) 
  modifier4?: string

  @Field({ nullable: true }) 
  appointmentId?: string

  @Field({ nullable: true }) 
  procedureId?: string

}
