import { gql } from '@apollo/client';

export const frontPageArticlesQ = gql`
  query frontPageArticle {
    allArticles {
      id
      title
      slug
    }
  }
`;

export const getArticlePaths = gql`
  query getArticlePaths {
    allArticles {
      _allSlugLocales {
        value
        locale
      }
    }
  }
`;

export const getArticlePathsByLocale = gql`
  query getArticlePathsByLocale($locale: SiteLocale!) {
    allArticles(locale: $locale) {
      slug
      title
    }
  }
`;

export const articleContent = gql`
  query articleContent($slug: String!, $locale: SiteLocale) {
    allArticles {
      _allSlugLocales {
        value
        locale
      }
    }
    article(locale: $locale, filter: { slug: { eq: $slug } }) {
      _createdAt
      _updatedAt
      title
      content
      description
    }
  }
`;
