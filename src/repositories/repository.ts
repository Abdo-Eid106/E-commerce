export default interface IRepository {
  findById(id: string | number): any;
  findOne(query: Object): any;
  findAll(): any;
  findMany(query: Object): any;
  createOne(data: Object): any;
}
