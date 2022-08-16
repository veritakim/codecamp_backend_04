import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductsSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: DataSource) {
    // Product 테이블에 ProductSubscriber를 구독자 목록에 추가시켜줘라.
    connection.subscribers.push(this);
  }

  // Product 테이블이 입력됐는지 기다려라
  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    // product 테이블에 등록했을 떄 등록된 것들이 event에 들어온다. event.entity.id / event.entity.price ...
    console.log(event);

    const bigQuery = new BigQuery({
      keyFilename: 'gcp-bigquery.json',
      projectId: 'united-blend-358105',
    });
    // db이름이 될것이다 ex) myproject04
    bigQuery
      .dataset('mybigquery04')
      // 테이블도 만들어줌
      .table('productlog')
      // 데이터 넣어줌 여러개의 데이터을 넣을 수있어 배열.
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
