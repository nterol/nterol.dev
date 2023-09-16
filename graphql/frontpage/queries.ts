import { gql } from "@apollo/client";

export const frontPageQuery = gql`
  query frontPage($locale: SiteLocale) {
    allArticles(locale: $locale) {
      slug
      title
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
