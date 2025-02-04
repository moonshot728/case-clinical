import { UseGuards, ValidationPipe } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import {
  AccountCreateEmailInput,
  AccountUpdatePasswordInput,
  AccountUpdateProfileInput,
  ApiAccountDataAccessService,
} from '@case-clinical/api/account/data-access'
import { CtxUser, GqlAuthGuard } from '@case-clinical/api/auth/util'
import { User } from '@case-clinical/api/user/data-access'
import { Email } from '@case-clinical/api/email/data-access'

@Resolver()
@UseGuards(GqlAuthGuard)
export class ApiAccountFeatureResolver {
  constructor(private readonly service: ApiAccountDataAccessService) {}

  @Query(() => [Email], { nullable: true })
  accountEmails(@CtxUser() user: User) {
    return this.service.accountEmails(user.id)
  }

  @Query(() => User, { nullable: true })
  accountProfile(@CtxUser() user: User) {
    return this.service.accountProfile(user.id)
  }

  @Query(() => Boolean, { nullable: true })
  accountUsernameAvailable(@CtxUser() user: User, @Args('username') username: string) {
    return this.service.accountUsernameAvailable(user.id, username)
  }

  @Mutation(() => Email, { nullable: true })
  accountCreateEmail(@CtxUser() user: User, @Args('input', new ValidationPipe()) input: AccountCreateEmailInput) {
    return this.service.accountCreateEmail(user.id, input)
  }

  @Mutation(() => Email, { nullable: true })
  accountDeleteEmail(@CtxUser() user: User, @Args('emailId') emailId: string) {
    return this.service.accountDeleteEmail(user.id, emailId)
  }

  @Mutation(() => Email, { nullable: true })
  accountMarkEmailPrimary(@CtxUser() user: User, @Args('emailId') emailId: string) {
    return this.service.accountMarkEmailPrimary(user.id, emailId)
  }

  @Mutation(() => Email, { nullable: true })
  accountMarkEmailPrivate(@CtxUser() user: User, @Args('emailId') emailId: string) {
    return this.service.accountMarkEmailPrivate(user.id, emailId)
  }

  @Mutation(() => Email, { nullable: true })
  accountMarkEmailPublic(@CtxUser() user: User, @Args('emailId') emailId: string) {
    return this.service.accountMarkEmailPublic(user.id, emailId)
  }

  @Mutation(() => User, { nullable: true })
  accountUpdateProfile(@CtxUser() user: User, @Args('input') input: AccountUpdateProfileInput) {
    return this.service.accountUpdateProfile(user.id, input)
  }

  @Mutation(() => User, { nullable: true })
  accountUpdateUsername(@CtxUser() user: User, @Args('username') username: string) {
    if(username === user.username) return user;
    return this.service.accountUpdateUsername(user.id, username)
  }

  @Mutation(() => Boolean, { nullable: true })
  accountResetPassword(@CtxUser() user: User) {
    return this.service.accountResetPassword(user.id)
  }

  @Mutation(() => Boolean, { nullable: true })
  accountUpdatePassword(@CtxUser() user: User, @Args('input', new ValidationPipe()) input: AccountUpdatePasswordInput) {
    return this.service.accountUpdatePassword(user.id, input)
  }
}
