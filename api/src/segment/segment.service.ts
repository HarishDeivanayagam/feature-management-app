import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";
import { Segment } from "src/database/models/segment.model";
import { Tenant } from "src/database/models/tenant.model";
import { User } from "src/database/models/user.model";

@Injectable()
export class SegmentService {
    
    constructor(private readonly _em:EntityManager) {}

    public async getAllSegments(tenant:string) {
        try {
            let segments = await this._em.find(Segment, {tenant: tenant});
            return segments;
        } catch(err) {
            throw new Error("Unable to fetch the segments");
        }
    }

    public async createNewSegment(name:string, creator:string, tenant:string) {
        try {
            let segment = new Segment();
            let usr = await this._em.findOne(User,{ id: creator, tenant: tenant });
            let tnt = await this._em.findOne(Tenant,{ id: tenant });
            if(usr && tnt) {
                segment.name = name;
                segment.creator = usr;
                segment.tenant = tnt;
                await this._em.persistAndFlush(segment);
                return segment;    
            } else {
                throw new Error("Unable to fetch the segments");
            }
        } catch(err) {
            throw new Error("Unable to fetch the segments");
        }
    }



}
