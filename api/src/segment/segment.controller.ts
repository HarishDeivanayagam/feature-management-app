import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateSegmentDto } from "./segment.dto";
import { SegmentService } from "./segment.service";

@ApiTags("Segment")
@Controller("segments")
export class SegmentController {
    
    constructor(private readonly _segmentService:SegmentService) {}

    @HttpCode(200)
    @Get("")
    @ApiBearerAuth()
    public async getSegments(@Res() res:Response) {
        try {
            let resp = await this._segmentService.getAllSegments(res.locals.account.tenant);
            res.status(HttpStatus.OK).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

    @HttpCode(200)
    @Post("")
    @ApiBearerAuth()
    public async postSegment(@Res() res:Response, @Body() segment:CreateSegmentDto) {
        try {
            let resp = await this._segmentService.createNewSegment(segment.name, res.locals.account.user, res.locals.account.tenant);
            res.status(HttpStatus.OK).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

}
