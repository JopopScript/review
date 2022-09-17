import { OmitType } from "@nestjs/swagger";
import { Location } from "../entities/location.entity";

export class ExcludeRelationLocation extends OmitType(Location, ['space']){};