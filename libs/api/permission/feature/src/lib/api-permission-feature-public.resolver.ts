
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { CorePaging } from '@case-clinical/api/core/data-access'
import {
  CtxUser,
} from '@case-clinical/api/auth/util'

import {
  ApiPermissionDataAccessPublicService,
  Permission,
} from '@case-clinical/api/permission/data-access'

import { User } from '@case-clinical/api/user/data-access'

@Resolver()
export class ApiPermissionFeaturePublicResolver {
  constructor(private readonly service: ApiPermissionDataAccessPublicService) {}
           
}

