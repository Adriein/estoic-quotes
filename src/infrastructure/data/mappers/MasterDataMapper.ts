import { MasterData } from '../../../core/entities';
import { TopicDoc, OriginDoc, AuthorDoc } from '../schemas';

export class MasterDataMapper {
  masterDataToDomain(
    authors: AuthorDoc[],
    topics: TopicDoc[],
    origins: OriginDoc[]
  ): MasterData {
    return {
      topics,
      authors,
      origins,
    } as MasterData;
  }
}
