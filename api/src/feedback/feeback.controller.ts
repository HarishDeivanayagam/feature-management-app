import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateFeedbackDto } from "./feedback.dto";
import { FeedbackService } from "./feedback.service";

@ApiTags("Feedback")
@Controller("feedback")
export class FeedbackController {
    
    constructor(private readonly _feedbackService:FeedbackService) {}

    @HttpCode(201)
    @Post("")
    public async addFeedback(@Res() res:Response, @Body() feedback:CreateFeedbackDto) {
        try {
            let resp = await this._feedbackService.insertFeedback(feedback.feedback, feedback.description, feedback.tenant, feedback.creatorName, feedback.creatorEmail);
            res.status(HttpStatus.CREATED).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

    @HttpCode(200)
    @Get("")
    @ApiBearerAuth()
    public async getAllFeedback(@Res() res:Response){
        try {
            let resp = await this._feedbackService.allFeedback(res.locals.account.tenant);
            res.status(HttpStatus.OK).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

}
