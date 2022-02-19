import { HttpException, HttpStatus, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Errors } from 'src/common/errors';
import { AuthToken } from 'src/shared/interfaces';
import { TokenService } from 'src/shared/services/token.service';
import { UserRepository, UserRoleRepository } from '../../shared/repository';
import { UserLoginDto } from './dto/user-login.dto';
import { handleError, createHash, match } from './../../utils/utils';
import { UserCreateDto } from './dto/user-create.dto';
import { User, UserRole } from 'src/database/entities';
// import { verify } from '../../shared/services/token.service'
// import { generateEmailTokenId } from '../../shared/services/token.service'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly userRoleRepo: UserRoleRepository, 
    private readonly tokenService: TokenService
  ) { }

  public async login(data: UserLoginDto): Promise<AuthToken> {
    try {
      const { email, password, roleId } = data;
      const checkUser = await this.userRepo.findUserAccountByEmail({email,roleId});
      console.log(checkUser);
      
      if (!checkUser) {
        throw new NotFoundException(Errors.ErrorMessages.USER_NOT_FOUND);
      }
      const matchPassword = match(checkUser.password, password);
      if (!matchPassword) {
        throw new BadRequestException(Errors.ErrorMessages.INVALID_PASSWORD);
      }
      delete checkUser?.userRole;
      checkUser['roleId'] = roleId;
      return await this.tokenService.generateNewTokens(checkUser);
    } catch (e) {
      handleError(e);
    }
  }

  public async signup(data: UserCreateDto): Promise<any>
  // Promise<AuthToken> 
  {
    try {
      const { email, password, firstName, lastName, roleId, organization } = data;
      let user = await this.userRepo.findUserAccountByEmail(email);
      if (user) {

        const userRole = await this.userRoleRepo.findByUserIdAndRoleId({
          userId: user.id,
          roleId: roleId,
        })

        if (userRole) {
          throw new BadRequestException(Errors.ErrorMessages.USER_EXISTS);
        }
      } else {
        const hashPassword = createHash(password);
        user = await this.userRepo.save(Object.assign(new User(), {
          email: data.email,
          password: hashPassword,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          organization: organization.trim()
        }));
      }
      
      await this.userRoleRepo.save(Object.assign(new UserRole(), {
        user: user.id,
        role: roleId
      }));
      // send Email
      const endAttachmentForEmail = process.env.EMAIL_VALIDATION_URL + '/' + await this.tokenService.generateEmailTokenId(user.email);
      console.log('Email Sended', endAttachmentForEmail);
      delete user?.userRole;
      user["isCategoryNeeded"] = true;
      user["roleId"] = roleId;
      user['verifyLink'] = endAttachmentForEmail; // TODO : delete when Email Service Integrated...
      return await this.tokenService.generateNewTokens(user);
    } catch (e) {
      handleError(e);
    }
  }

  public async getToken(refreshToken: string): Promise<AuthToken> {
    try {
      const match = await this.tokenService.verify(refreshToken);
      if (!match) {
        throw new BadRequestException({ message: Errors.ErrorMessages.INVALID_TOKEN });
      }
      const user = await this.userRepo.findOne({ id: match.id });
      if (!user) {
        throw new BadRequestException({ message: Errors.ErrorMessages.USER_NOT_FOUND });
      }
      return await this.tokenService.generateNewTokens(user);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.PARTIAL_CONTENT);
    }
  }
}
