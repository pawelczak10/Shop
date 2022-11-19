/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

const documents = {
    "mutation CreateProductRevies($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}": types.CreateProductReviesDocument,
    "query Product {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery getProductDetails($id: ID) {\n  product(where: {id: $id}) {\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery ProductId {\n  products {\n    id\n  }\n}": types.ProductDocument,
};

export function graphql(source: "mutation CreateProductRevies($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}"): (typeof documents)["mutation CreateProductRevies($review: ReviewCreateInput!) {\n  review: createReview(data: $review) {\n    id\n    stage\n  }\n}"];
export function graphql(source: "query Product {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery getProductDetails($id: ID) {\n  product(where: {id: $id}) {\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery ProductId {\n  products {\n    id\n  }\n}"): (typeof documents)["query Product {\n  products {\n    id\n    slug\n    name\n    price\n    images(first: 1) {\n      url\n    }\n  }\n}\n\nquery getProductDetails($id: ID) {\n  product(where: {id: $id}) {\n    name\n    price\n    description\n    images {\n      url\n    }\n  }\n}\n\nquery ProductId {\n  products {\n    id\n  }\n}"];

export function graphql(source: string): unknown;
export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;