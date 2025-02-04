import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common'
import { ApiCoreDataAccessService } from '@case-clinical/api/core/data-access'
import { hashPassword, validatePassword } from '@case-clinical/api/core/util'
import { AccountCreateEmailInput } from './dto/account-create-email.input'
import { AccountUpdatePasswordInput } from './dto/account-update-password.input'
import { AccountUpdateProfileInput } from './dto/account-update-profile.input'
import { UserUpdateEmailInput } from '@case-clinical/api/email/data-access'

@Injectable()
export class ApiAccountDataAccessService {
  constructor(private readonly data: ApiCoreDataAccessService) {}

  accountEmails(userId: string) {
    return this.data.email.findMany({
      where: { owner: { id: userId } },
      orderBy: { primary: 'desc' },
    })
  }

  accountProfile(userId: string) {
    return this.data.findUserById(userId)
  }

  async accountCreateEmail(userId: string, input: AccountCreateEmailInput) {
    const exists = await this.data.findUserByEmail(input.email)
    if (exists) {
      throw new BadRequestException(`Can't add email address ${input.email}`)
    }
    return this.data.email.create({
      data: { ownerId: userId, email: input.email, primary: false },
    })
  }

  async accountDeleteEmail(userId: string, userEmailId: string) {
    const owner = await this.data.email.findUnique({ where: { id: userEmailId } }).owner()
    if (owner.id !== userId) {
      throw new UnauthorizedException()
    }
    const email = await this.data.email.findUnique({
      where: { id: userEmailId },
    })
    if (email.primary) {
      throw new BadRequestException(`You can't delete your primary email`)
    }
    return this.data.email.delete({ where: { id: userEmailId } })
  }

  accountUpdateProfile(userId: string, input: AccountUpdateProfileInput) {
    console.log('accountUpdateProfile')
    console.log(input);
    return this.data.user.update({
      where: { id: userId },
      data: {
        avatarUrl: input.document ? input.document.attachment : null,
        firstName: input.firstName,
        lastName: input.lastName,
        bio: input.bio,
        phone: input.phone,
        dateOfBirth: input.dateOfBirth,
        cellPhone: input.phone,
        line1: input.line1,
        line2: input.line2,
        city: input.city,
        state: input.state,
        postalCode: input.postalCode,
      },
    })
  }

  async accountUpdateUsername(userId: string, username: string) {
    const available = await this.accountUsernameAvailable(userId, username)

    if (!available) {
      throw new BadRequestException(`Username ${username} is not available`)
    }

    return this.data.user.update({ where: { id: userId }, data: { username } })
  }

  async accountUsernameAvailable(userId: string, username: string): Promise<boolean> {
    const denied = await this.data.usernameDenyList(username)

    if (denied) {
      throw new BadRequestException(`Username ${username} is not available`)
    }

    const count = await this.data.user.count({
      where: { username },
    })
    return count === 0
  }

  async userEmailOwner(userId: string, userEmailId: string) {
    const owner = await this.data.email.findUnique({ where: { id: userEmailId } }).owner()
    console.log(owner)
    if (owner.id !== userId) {
      console.log('hit this unauth 1')
      throw new UnauthorizedException()
    }
    return owner
  }

  async updateUserEmail(userId: string, userEmailId: string, input: UserUpdateEmailInput) {
    await this.userEmailOwner(userId, userEmailId)
    return this.data.email.update({
      where: { id: userEmailId },
      data: {
        name: input.name,
        email: input.email,
        ownerId: input.ownerId,
        isPublic: input.isPublic,
        primary: input.primary,
        verified: input.verified,
        verifyToken: input.verifyToken,
        verifyExpires: input.verifyExpires
       },
    })
  }

  async accountMarkEmailPrivate(userId: string, userEmailId: string) {
    return this.updateUserEmail(userId, userEmailId, { isPublic: false })
  }

  async accountMarkEmailPublic(userId: string, userEmailId: string) {
    return this.updateUserEmail(userId, userEmailId, { isPublic: true })
  }

  async accountMarkEmailPrimary(userId: string, userEmailId: string) {
    // Check if we are the owner
    await this.userEmailOwner(userId, userEmailId)
    // Mark all emails as non primary
    await this.data.email.updateMany({
      where: { owner: { id: userId } },
      data: { primary: false },
    })
    // Mark the chosen one
    return this.updateUserEmail(userId, userEmailId, { primary: true })
  }

  async accountResetPassword(userId: string) {
    const emails = await this.accountEmails(userId)
    const primary = emails.find((email) => email.primary)

    if (!primary) {
      throw new BadRequestException(`Could not find primary email for user with id ${userId}`)
    }
    Logger.verbose(`TODO: Implement Account Reset Password`)
    // await this.auth.forgotPassword(primary.email)
    return true
  }

  async accountUpdatePassword(userId: string, input: AccountUpdatePasswordInput) {
    const user = await this.data.findUserById(userId)
    // We need to make sure the user provides the correct current password
    const currentPasswordCorrect = await validatePassword(input.currentPassword, user.password)
    if(!currentPasswordCorrect) {
      throw new BadRequestException(`Current password is wrong`)
    }
    // The new password must be the same as the verified new password
    if (input.password !== input.verified) {
      throw new BadRequestException(`Passwords do not match!`)
    }
    // We can now update the password
    await this.data.user.update({
      where: { id: userId },
      data: { password: hashPassword(input.password) },
    })
    return true
  }
}
