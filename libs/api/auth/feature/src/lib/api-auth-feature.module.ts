import { Module } from '@nestjs/common'
import { ApiAuthDataAccessModule } from '@case-clinical/api/auth/data-access'
import { ApiAuthFeatureResolver } from './api-auth-feature.resolver'

@Module({
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthFeatureResolver],
})
export class ApiAuthFeatureModule {}
