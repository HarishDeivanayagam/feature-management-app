import { EntityManager } from "@mikro-orm/core";
import { Inject, Injectable } from "@nestjs/common";
import { Tenant } from "src/database/models/tenant.model";
import { User } from "src/database/models/user.model";
import { BcryptLib, IBcrypt, IJwt, JwtLib } from "src/misc/external.dep";

@Injectable()
export class AccountService {

    constructor(
        private readonly _em:EntityManager,
        @Inject(JwtLib.provide) private readonly _jwt:IJwt,
        @Inject(BcryptLib.provide) private readonly _bcrypt:IBcrypt
    ) {}

    private _appsecret:string = "DFUSKHKR(@*&!@FJDIBDSFB1513DFS";

    public async createAccount(tenantName:string, userName:string, email:string, password:string):Promise<string> {
        try {
            let tenant = new Tenant();
            tenant.name = tenantName;
            tenant.plan = "FREE_TIER";
            let user = new User();
            user.tenant = tenant;
            user.name = userName;
            user.email = email;
            let hashPass = await this._bcrypt.hash(password,10);
            user.password = hashPass;
            user.isAdmin = true;
            await this._em.persistAndFlush([tenant, user]);
            return "Account Created";
        } catch(err) {
            throw new Error("Account Creation Failed");
        }
    }

    public async authenticate(email:string, password:string): Promise<Object> {
        try {
            let user = await this._em.findOne(User, { email: email })
            let match = await this._bcrypt.compare(password, user.password);
            if(match) {
                let data = {
                    user: user.id,
                    user_name: user.name,
                    tenant: user.tenant.id,
                    email: user.email,
                    is_verified: user.isVerified,
                    is_admin: user.isAdmin
                }
                let jwtToken:string = this._jwt.sign(data, this._appsecret, {expiresIn: 24*60*60*30})
                return {
                    user: data.user,
                    tenant: data.tenant,
                    authToken: jwtToken
                }
            } else {
                throw new Error("Account Authentication Failed");
            } 
        } catch(err) {
            throw new Error("Account Authentication Failed");
        }
    }

    public async ping(token: string): Promise<Object> {
        try {
          let decoded = this._jwt.verify(token, this._appsecret);
          if (decoded) {
            return decoded;
          } else {
            throw new Error('Invalid Token');
          }
        } catch (err) {
          throw new Error(err.message);
        }
    }

    public async addUser(tenant:string, name:string, email:string, password:string, isAdmin:boolean = false): Promise<User> {
        try {
            let ttenant = await this._em.findOne(Tenant, { id: tenant });
            let tuser = new User();
            tuser.name = name;
            tuser.email = email;
            tuser.isAdmin = isAdmin;
            let hashPass = await this._bcrypt.hash(password,10);
            tuser.tenant = ttenant;
            tuser.password = hashPass;
            await this._em.persistAndFlush(tuser);
            return tuser;
        } catch(err) {
            throw new Error("Unable to add user");
        }
    }

    public async getUsers(tenant:string) {
        try {
            let users = await this._em.find(User, { tenant: tenant });
            return users;
        } catch(err) {
            throw new Error("Unable to fetch users");
        }
    }

}
