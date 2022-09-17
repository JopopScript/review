import { BaseEntity } from "@/common/entities/base-entity";

type findOptions = {
  // relations?: string[]   여러 entity의 mockrepository 구현에 어려움
  skip?: number
  take?: number
}

export class MockRepository<T extends BaseEntity> {
  // # === private
  #data: T[] = [];
  #autoIncreamentKey: number = 1;

  private getData() {
    return this.#data;
  }

  private partialCompareWithOriginal<T>(t: T, partialT: Partial<T>): boolean {
    for (const prop in partialT) {
        if (t[prop] !== partialT[prop]) {
            return false;
        }
    }
    return true;
  }

  private getBaseEntity() {
    const id = this.#autoIncreamentKey;
    this.#autoIncreamentKey++;
    const createdAt = new Date();
    const updatedAt = new Date(createdAt);
    const deletedAt = null;
    return { id, createdAt, updatedAt, deletedAt };
  }

  async find(findOptions?: findOptions): Promise<Array<T>> {
    const foundAll = this.#data.filter(d => d?.deletedAt === null);
    if (findOptions?.skip || findOptions?.take) {
      const startPoint = typeof findOptions.skip == 'number' ? findOptions.skip : 0;
      const selectCount = typeof findOptions.take === 'number' ? findOptions.take : 0;
      return foundAll.slice(startPoint, startPoint + selectCount);
    }
    return foundAll; 
  }

  async findBy(partialT: Partial<T>): Promise<Array<T>> {
    return (await this.find()).filter((d: T) => this.partialCompareWithOriginal(d, partialT));
  }

  async findOneBy(partialT: Partial<T>): Promise<T | null> {
    const found = (await this.find()).find((d: T) => this.partialCompareWithOriginal(d, partialT));
    return found ? found : null;
  }

  async save(partialT: Partial<T>): Promise<T> {
    const selectedTIndex = this.#data.findIndex(db => (db?.deletedAt === null && db.id === partialT.id));

    //update
    if (selectedTIndex !== -1) {
      const updateT = { ...this.#data[selectedTIndex], ...partialT };
      updateT.updatedAt = new Date();
      this.#data.splice(selectedTIndex, 1, updateT);
      return updateT;
    }
    
    //create
    const t = partialT as T;
    const baseEntity = this.getBaseEntity();
    const saveEntity = { ...t, ...baseEntity };
    this.#data.push(saveEntity);
    return saveEntity;
  }

  async softRemove(t: T): Promise<void> {
    for (let i = 0; i < this.#data.length; i++) {
      if (this.#data[i].id === t.id) {
        this.#data[i].deletedAt = new Date();
      }
    }
  }
}