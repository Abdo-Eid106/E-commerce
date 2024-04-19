import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({ path: '.development.env' });

export const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.host,
  port: parseInt(process.env.port),
  username: process.env.user,
  password: process.env.password,
  database: process.env.database,
  entities: ['dist/**/*.entity.js'],
  synchronize: true,
};

const dataSource = new DataSource(options);
export default dataSource;
