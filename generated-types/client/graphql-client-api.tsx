import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Book = {
   __typename?: 'Book',
  id: Scalars['ID'],
  title: Scalars['String'],
  author: Scalars['String'],
  likes: Scalars['Int'],
};

export type Mutation = {
   __typename?: 'Mutation',
  likeIt?: Maybe<Book>,
};


export type MutationLikeItArgs = {
  id: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  books: Array<Book>,
};


export type QueryBooksArgs = {
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>
};


