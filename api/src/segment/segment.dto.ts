import { ApiProperty } from "@nestjs/swagger";

export class CreateSegmentDto {
    @ApiProperty()
    name: string;
}
