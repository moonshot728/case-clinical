import { Field, InputType } from '@nestjs/graphql'

import { AdminCreateAccidentTypeInput } from '@case-clinical/api/accident-type/data-access' 
import { AdminCreatePatientInput } from '@case-clinical/api/patient/data-access' 
import { AdminCreateMedLevelInput } from '@case-clinical/api/med-level/data-access' 
import { AdminCreateFirmInput } from '@case-clinical/api/firm/data-access' 
import { AdminCreateAttorneyInput } from '@case-clinical/api/attorney/data-access' 
import { AdminCreateCaseStatusInput } from '@case-clinical/api/case-status/data-access' 
import { AdminCreateCaseTypeInput } from '@case-clinical/api/case-type/data-access' 
import { AdminCreatePatientTreatmentStatusInput } from '@case-clinical/api/patient-treatment-status/data-access' 
import { AdminCreateCaseProgressStatusInput } from '@case-clinical/api/case-progress-status/data-access' 
import { AdminCreateAdverseInsuranceStatusInput } from '@case-clinical/api/adverse-insurance-status/data-access' 
import { AdminCreateCaseAccountInput } from '@case-clinical/api/case-account/data-access' 
import { AdminCreateCasePreAccidentInput } from '@case-clinical/api/case-pre-accident/data-access' 
import { AdminCreateCasePreInjuryInput } from '@case-clinical/api/case-pre-injury/data-access' 
import { AdminCreateCasePreProblemInput } from '@case-clinical/api/case-pre-problem/data-access' 
import { AdminCreateInsuranceInput } from '@case-clinical/api/insurance/data-access' 
import { AdminCreateCasePreProcedureInput } from '@case-clinical/api/case-pre-procedure/data-access' 
import { AdminCreateCaseProcedureInput } from '@case-clinical/api/case-procedure/data-access' 
import { AdminCreatePriorMedsToDateInput } from '@case-clinical/api/prior-meds-to-date/data-access' 
import { AdminCreateAppointmentInput } from '@case-clinical/api/appointment/data-access' 


@InputType()
export class AdminCreateLegalCaseInput {

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  accidentTypeId?: string

  @Field({ nullable: true }) 
  patientId?: string

  @Field({ nullable: true }) 
  medLevelId?: string

  @Field({ nullable: true }) 
  firmId?: string

  @Field({ nullable: true }) 
  attorneyId?: string

  @Field({ nullable: true }) 
  agentId?: string

  @Field({ nullable: true }) 
  caseStatusId?: string

  @Field({ nullable: true }) 
  caseTypeId?: string

  @Field({ nullable: true }) 
  patientTreatmentStatusId?: string

  @Field({ nullable: true }) 
  medicalRecordNumber?: string

  @Field({ nullable: true }) 
  pharmacyControlNumber?: string

  @Field({ nullable: true }) 
  pchGroupNumber?: string

  @Field({ nullable: true }) 
  dateOfLoss?: Date

  @Field({ nullable: true }) 
  caseStatusDate?: Date

  @Field({ nullable: true }) 
  caseStatusOther?: string

  @Field({ nullable: true }) 
  paralegal?: string

  @Field({ nullable: true }) 
  paralegalContact?: string

  @Field({ nullable: true }) 
  caseNoteSummary?: string

  @Field({ nullable: true }) 
  policyLimit?: number

  @Field({ nullable: true }) 
  attorneyFee?: number

  @Field({ nullable: true }) 
  referringPhysician?: string

  @Field({ nullable: true }) 
  noMoreTreatment?: boolean

  @Field({ nullable: true }) 
  medpay?: boolean

  @Field({ nullable: true }) 
  fileNumber?: string

  @Field({ nullable: true }) 
  caseNumber?: string

  @Field({ nullable: true }) 
  accidentState?: string

  @Field({ nullable: true }) 
  assignedTo?: string

  @Field({ nullable: true }) 
  attorneyPaid?: boolean

  @Field({ nullable: true }) 
  attorneySentDate?: Date

  @Field({ nullable: true }) 
  writeOff?: boolean

  @Field({ nullable: true }) 
  noMRI?: boolean

  @Field({ nullable: true }) 
  noPT?: boolean

  @Field({ nullable: true }) 
  noFirstAppointment?: boolean

  @Field({ nullable: true }) 
  hot?: boolean

  @Field({ nullable: true }) 
  documentsUploaded?: boolean

  @Field({ nullable: true }) 
  attorneyReview?: boolean

  @Field({ nullable: true }) 
  escalatedReview?: boolean

  @Field({ nullable: true }) 
  inActive?: boolean

  @Field({ nullable: true }) 
  criteria1712?: boolean

  @Field({ nullable: true }) 
  documentUploadedDate?: Date

  @Field({ nullable: true }) 
  patientDischargedGatheringRecordsDate?: Date

  @Field({ nullable: true }) 
  resubmitted?: Date

  @Field({ nullable: true }) 
  caseProgressStatusId?: string

  @Field({ nullable: true }) 
  firmCaseManager?: string

  @Field({ nullable: true }) 
  adverseInsuranceStatusId?: string

  @Field({ nullable: true }) 
  createdBy?: string

  @Field({ nullable: true }) 
  renegotiatePayOffDate?: Date

  @Field(() => [AdminCreateCaseAccountInput], { nullable: true }) 
  caseAccounts?: AdminCreateCaseAccountInput[]

  @Field(() => [AdminCreateCasePreAccidentInput], { nullable: true }) 
  casePreAccidents?: AdminCreateCasePreAccidentInput[]

  @Field(() => [AdminCreateCasePreInjuryInput], { nullable: true }) 
  casePreInjuries?: AdminCreateCasePreInjuryInput[]

  @Field(() => [AdminCreateCasePreProblemInput], { nullable: true }) 
  casePreProblems?: AdminCreateCasePreProblemInput[]

  @Field(() => [AdminCreateInsuranceInput], { nullable: true }) 
  insurances?: AdminCreateInsuranceInput[]

  @Field(() => [AdminCreateCasePreProcedureInput], { nullable: true }) 
  casePreProcedures?: AdminCreateCasePreProcedureInput[]

  @Field(() => [AdminCreateCaseProcedureInput], { nullable: true }) 
  caseProcedures?: AdminCreateCaseProcedureInput[]

  @Field(() => [AdminCreatePriorMedsToDateInput], { nullable: true }) 
  priorMedsToDates?: AdminCreatePriorMedsToDateInput[]

  @Field(() => [AdminCreateAppointmentInput], { nullable: true }) 
  appointments?: AdminCreateAppointmentInput[]

  @Field({ nullable: true }) 
  underwriting_dateCreated?: Date
  @Field({ nullable: true }) 
  underwriting_lastUpdateDate?: Date
  @Field({ nullable: true }) 
  underwriting_timeSensitive?: boolean
  @Field({ nullable: true }) 
  underwriting_needsMoreInfo?: number
  @Field({ nullable: true }) 
  underwriting_billsAttached?: boolean
  @Field({ nullable: true }) 
  underwriting_completedMedRecs?: boolean
  @Field({ nullable: true }) 
  underwriting_balance?: number
  @Field({ nullable: true }) 
  underwriting_signedLien?: boolean
  @Field({ nullable: true }) 
  underwriting_procedureRequested?: string
  @Field({ nullable: true }) 
  underwriting_medBills?: string
  @Field({ nullable: true }) 
  underwriting_estimate?: boolean
  @Field({ nullable: true }) 
  underwriting_plaintiff?: string
  @Field({ nullable: true }) 
  underwriting_covered?: string
  @Field({ nullable: true }) 
  underwriting_remarks?: string
  @Field({ nullable: true }) 
  accidentInformation_accidentDescription?: string
  @Field({ nullable: true }) 
  accidentInformation_dateOfLoss?: Date
  @Field({ nullable: true }) 
  accidentInformation_review?: string
  @Field({ nullable: true }) 
  accidentInformation_initialEvaluation?: string
  @Field({ nullable: true }) 
  accidentInformation_evaluation?: string
  @Field({ nullable: true }) 
  accidentInformation_evaluationAfterHowLong?: string
  @Field({ nullable: true }) 
  accidentInformation_evaluatedIn?: string
  @Field({ nullable: true }) 
  accidentInformation_complaints?: string
  @Field({ nullable: true }) 
  accidentInformation_previousHistory?: boolean
  @Field({ nullable: true }) 
  accidentInformation_gapInCare?: boolean
  @Field({ nullable: true }) 
  accidentInformation_gapInCareWhen?: string
  @Field({ nullable: true }) 
  accidentInformation_preExistingProblems?: string
  @Field({ nullable: true }) 
  accidentInformation_priorInjuries?: string
  @Field({ nullable: true }) 
  accidentInformation_otherInjuriesSince?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaDriver?: boolean
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaPassenger?: boolean
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaVehicle?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaClaimants?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaOperable?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaTar?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaDamage?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaLess?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaGreater?: string
  @Field({ nullable: true }) 
  motorVehicleAccident_mvaAmount?: string
  @Field({ nullable: true }) 
  premiseAccident_clientHasObtainedPlaintiffAdvance?: boolean
  @Field({ nullable: true }) 
  premiseAccident_advanceAmount?: number
  @Field({ nullable: true }) 
  premiseAccident_lossOfEarningsIsBeingFiled?: boolean
  @Field({ nullable: true }) 
  premiseAccident_doYouAnticipateAdditionalMedicalTreatmentOnDifferentBodyPart?: boolean
  @Field({ nullable: true }) 
  premiseAccident_explain?: string
  @Field({ nullable: true }) 
  premiseAccident_clientHasCriminalHistory?: boolean
  @Field({ nullable: true }) 
  premiseAccident_criminalHistory?: string
  @Field({ nullable: true }) 
  premiseAccident_locationOfIncident?: string
  @Field({ nullable: true }) 
  productLiability_product?: string
  @Field({ nullable: true }) 
  productLiability_whereDidItHappen?: string
  @Field({ nullable: true }) 
  productLiability_proofOfLiability?: string
  @Field({ nullable: true }) 
  productLiability_productWasRecalled?: boolean
  @Field({ nullable: true }) 
  workRelated_selfInsuredWorkComp?: boolean
  @Field({ nullable: true }) 
  workRelated_workCompCaseIsOpenClosed?: string
  @Field({ nullable: true }) 
  workRelated_workCompCaseSettledAmount?: number
  @Field({ nullable: true }) 
  workRelated_workCompCaseSettlementIncludesFutureMedicals?: boolean
  @Field({ nullable: true }) 
  workRelated_reasonNotFiledUnderWorkComp?: string

  @Field(() => AdminCreateAccidentTypeInput ,{ nullable: true }) 
  accidentType?: AdminCreateAccidentTypeInput  


  @Field(() => AdminCreatePatientInput ,{ nullable: true }) 
  patient?: AdminCreatePatientInput  


  @Field(() => AdminCreateMedLevelInput ,{ nullable: true }) 
  medLevel?: AdminCreateMedLevelInput  


  @Field(() => AdminCreateFirmInput ,{ nullable: true }) 
  firm?: AdminCreateFirmInput  


  @Field(() => AdminCreateAttorneyInput ,{ nullable: true }) 
  attorney?: AdminCreateAttorneyInput  


  @Field(() => AdminCreateCaseStatusInput ,{ nullable: true }) 
  caseStatus?: AdminCreateCaseStatusInput  


  @Field(() => AdminCreateCaseTypeInput ,{ nullable: true }) 
  caseType?: AdminCreateCaseTypeInput  


  @Field(() => AdminCreatePatientTreatmentStatusInput ,{ nullable: true }) 
  patientTreatmentStatus?: AdminCreatePatientTreatmentStatusInput  


  @Field(() => AdminCreateCaseProgressStatusInput ,{ nullable: true }) 
  caseProgressStatus?: AdminCreateCaseProgressStatusInput  


  @Field(() => AdminCreateAdverseInsuranceStatusInput ,{ nullable: true }) 
  adverseInsuranceStatus?: AdminCreateAdverseInsuranceStatusInput  

}