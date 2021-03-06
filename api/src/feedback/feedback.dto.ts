import { ApiProperty } from "@nestjs/swagger";

export class CreateFeedbackDto {
    @ApiProperty()
    feedback: string;

    @ApiProperty()
    description: string

    @ApiProperty()
    tenant: string;

    @ApiProperty()
    creatorName: string;

    @ApiProperty()
    creatorEmail: string;
}
