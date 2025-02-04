import { Field, ObjectType } from '@nestjs/graphql'

import { Patient } from '@case-clinical/api/patient/data-access'

import { ClinicalProvider } from '@case-clinical/api/clinical-provider/data-access'

import { Attorney } from '@case-clinical/api/attorney/data-access'
import { Setting } from '@case-clinical/api/setting/data-access' 
import { UserRole } from '@case-clinical/api/user-role/data-access' 
import { Email } from '@case-clinical/api/email/data-access' 
import { PriorAuthorizationRequest } from '@case-clinical/api/prior-authorization-request/data-access' 
import { Message } from '@case-clinical/api/message/data-access' 
import { Navigation } from '@case-clinical/api/navigation/data-access' 
import { Notification } from '@case-clinical/api/notification/data-access' 
import { Shortcut } from '@case-clinical/api/shortcut/data-access' 
import { Document } from '@case-clinical/api/document/data-access' 
import { Chat } from '@case-clinical/api/chat/data-access' 
import { AssignedDocument } from '@case-clinical/api/assigned-document/data-access' 
import { UserFeature } from '@case-clinical/api/user-feature/data-access' 
import { TeamUser } from '@case-clinical/api/team-user/data-access' 
import { UserFeaturePermission } from '@case-clinical/api/user-feature-permission/data-access' 


@ObjectType()
export class User {

  @Field({ nullable: true }) 
  id?: string

  @Field({ nullable: true }) 
  createdAt?: Date

  @Field({ nullable: true }) 
  updatedAt?: Date

  @Field({ nullable: true }) 
  name?: string

  @Field({ nullable: true }) 
  developer?: boolean

  @Field({ nullable: true }) 
  username?: string

  @Field({ nullable: true }) 
  password?: string

  @Field({ nullable: true }) 
  firstName?: string

  @Field({ nullable: true }) 
  lastName?: string

  @Field({ nullable: true }) 
  avatarUrl?: string

  @Field({ nullable: true }) 
  line1?: string

  @Field({ nullable: true }) 
  line2?: string

  @Field({ nullable: true }) 
  city?: string

  @Field({ nullable: true }) 
  state?: string

  @Field({ nullable: true }) 
  postalCode?: string

  @Field({ nullable: true }) 
  phone?: string

  @Field({ nullable: true }) 
  bio?: string

  @Field({ nullable: true }) 
  slug?: string

  @Field({ nullable: true }) 
  status?: string

  @Field({ nullable: true }) 
  signupStatus?: number

  @Field({ nullable: true }) 
  verified?: boolean

  @Field({ nullable: true }) 
  customerId?: string

  @Field({ nullable: true }) 
  planId?: string

  @Field({ nullable: true }) 
  dateOfBirth?: Date

  @Field({ nullable: true }) 
  cellPhone?: string

  @Field({ nullable: true }) 
  education?: string
  
  @Field({ nullable: true }) 
  officeName?: string

  @Field(() => [Setting], { nullable: true }) 
  settings?: Setting[]

  @Field(() => [UserRole], { nullable: true }) 
  userRoles?: UserRole[]

  @Field(() => [Email], { nullable: true }) 
  emails?: Email[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  priorAuthorizationRequestsReferredTo?: PriorAuthorizationRequest[]

  @Field(() => [PriorAuthorizationRequest], { nullable: true }) 
  priorAuthorizationRequestsMedicalProvider?: PriorAuthorizationRequest[]

  @Field(() => [Message], { nullable: true }) 
  messages?: Message[]

  @Field(() => [Navigation], { nullable: true }) 
  navigations?: Navigation[]

  @Field(() => [Notification], { nullable: true }) 
  notifications?: Notification[]

  @Field(() => [Shortcut], { nullable: true }) 
  shortcuts?: Shortcut[]

  @Field(() => [Document], { nullable: true }) 
  providerDocuments?: Document[]

  @Field(() => [Chat], { nullable: true }) 
  chats?: Chat[]

  @Field(() => [AssignedDocument], { nullable: true }) 
  assignedDocuments?: AssignedDocument[]

  @Field(() => [UserFeature], { nullable: true }) 
  userFeatures?: UserFeature[]

  @Field(() => [TeamUser], { nullable: true }) 
  teamUsers?: TeamUser[]

  @Field(() => [UserFeaturePermission], { nullable: true }) 
  userFeaturePermissions?: UserFeaturePermission[]

  @Field({ nullable: true }) 
  attorneyId?: string

  @Field({ nullable: true }) 
  providerId?: string

  @Field({ nullable: true }) 
  patientId?: string


  @Field(() => Patient, { nullable: true }) 
  patient?: Patient  

  @Field(() => ClinicalProvider, { nullable: true }) 
  provider?: ClinicalProvider  

  @Field(() => Attorney, { nullable: true }) 
  attorney?: Attorney  

}
