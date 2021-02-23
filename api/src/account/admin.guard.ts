import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const [req, res, next] = context.getArgs();
        try {
            if(res.locals.account.is_admin) {
                return true;
            } else {
                return false;
            }
        } catch(err) {
            return false;
        }
    }
}
