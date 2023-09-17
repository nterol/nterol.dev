import { gql } from "@apollo/client";

export const frontPageQuery = gql`
  query frontPage($locale: SiteLocale) {
    allArticles(locale: $locale) {
      slug
      title
      description
      _createdAt
      _updatedAt
    }
    allQuizzs(locale: $locale) {
      id
      content
    }
    about(locale: $locale) {
      description
    }
  }
`;
