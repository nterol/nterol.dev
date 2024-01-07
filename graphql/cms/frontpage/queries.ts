import { gql } from '@apollo/client';

export const frontPageQuery = gql`
  query frontPage($locale: SiteLocale, $skip: IntType) {
    allArticles(locale: $locale, skip: $skip, first: 5) {
      slug
      title
      description
      _createdAt
      _updatedAt
    }
    allQuizzs(locale: $locale, skip: $skip, first: 5) {
      id
      content
    }
    allBreves(locale: $locale, skip: $skip, first: 5) {
      id
      content
    }
    about(locale: $locale) {
      description
    }
  }
`;
