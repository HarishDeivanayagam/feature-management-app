import { Body, Controller, HttpCode, HttpStatus, Post, Put, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CreateFeedbackDto, VoteFeedbackDto } from "./feedback.dto";
import { FeedbackService } from "./feedback.service";

@ApiTags("Feedback")
@Controller("feedback")
export class FeedbackController {
    
    constructor(private readonly _feedbackService:FeedbackService) {}

    @HttpCode(201)
    @Post("")
    public async addFeedback(@Res() res:Response, @Body() feedback:CreateFeedbackDto) {
        try {
            let resp = await this._feedbackService.insertFeedback(feedback.feedback, feedback.description, feedback.customer, feedback.creatorName, feedback.creatorEmail);
            res.status(HttpStatus.CREATED).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

    @HttpCode(200)
    @Put("/upvote")
    public async upVoteFeedback(@Res() res:Response, @Body() vote:VoteFeedbackDto) {
        try {
            let resp = await this._feedbackService.upVoteFeedback(vote.feedback, vote.customer);
            res.status(HttpStatus.OK).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }

    @HttpCode(200)
    @Put("/downvote")
    public async downVoteFeedback(@Res() res:Response, @Body() vote:VoteFeedbackDto) {
        try {
            let resp = await this._feedbackService.downVoteFeedback(vote.feedback, vote.customer);
            res.status(HttpStatus.OK).json(resp);
            return;
        } catch(err) {
            res.status(HttpStatus.BAD_REQUEST).json(err.message);
            return;
        }
    }
}
