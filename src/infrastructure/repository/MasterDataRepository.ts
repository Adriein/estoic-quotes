import { MasterData, Repository } from '../../core/entities';
import { AuthorModel, TopicModel, OriginModel } from '../data/schemas';
import { MasterDataMapper } from '../data/mappers';

export class MasterDataRepository implements Repository<MasterData> {
  private mapper: MasterDataMapper;

  constructor() {
    this.mapper = new MasterDataMapper();
  }

  async find(searchObj: any): Promise<MasterData[]> {
    const [authors, topics, origins] = await Promise.all([
      AuthorModel.find({}).exec(),
      TopicModel.find({}).exec(),
      OriginModel.find({}).exec(),
    ]);
    return [
      this.mapper.masterDataToDomain(authors, topics, origins),
    ] as MasterData[];
  }

  async fetch(id: string): Promise<MasterData> {
    throw new Error();
  }

  async save(body: MasterData): Promise<MasterData> {
    throw new Error();
  }

  async put(id: string, body: MasterData): Promise<MasterData> {
    throw new Error();
  }

  async delete(id: string): Promise<number> {
    throw new Error();
  }
}
