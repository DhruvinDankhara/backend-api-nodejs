import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { TokenService } from "src/shared/services/token.service";

@Injectable()
export class ClientAuthGuard implements CanActivate {
  public constructor(
    private readonly tokenService: TokenService
    ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.getArgByIndex(0);
    const BearerToken = request.headers["authorization"];
    let token;
    if (BearerToken && BearerToken.startsWith("Bearer ")) {
      // Read the ID Token from the Authorization header.
      token = BearerToken.split("Bearer ")[1];
    }
    const verify = await this.tokenService.verify(token);
    if (!verify) {
      throw new UnauthorizedException();
    }
    // const checkUserExist = await this.tokenService.checkUserExist(verify.id);
    // if (!checkUserExist) {
    //   throw new UnauthorizedException();
    // }
    request.user = verify;
    return true;
  }
}
