import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedbackDto {
    @ApiProperty()
    feedback: string;

    @ApiProperty()
    description: string

    @ApiProperty()
    customer: string;

    @ApiProperty()
    creatorName: string;

    @ApiProperty()
    creatorEmail: string;
}

export class VoteFeedbackDto {

    @ApiProperty()
    feedback: number;

    @ApiProperty()
    customer: string;

}