import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { Space } from "../entities/space.entity";

//https://stackoverflow.com/questions/72957962/how-to-extend-typeorm-repository-in-nestjs-9-typeorm-3
@Injectable()
export class CustomSpaceRepository extends Repository<Space> {
  constructor(
    @InjectRepository(Space)
    private readonly repository: Repository<Space>,
    private readonly dateSource: DataSource,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}