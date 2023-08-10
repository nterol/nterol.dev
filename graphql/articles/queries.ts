import { gql } from "@apollo/client";

export const frontPageArticlesQ = gql`
  query frontPageArticle {
    allArticles {
      id
      title
      slug
    }
  }
`;

export const articleContent = gql`
  query articleContent($slug: String!) {
    article(filter: { slug: { eq: $slug } }) {
      _createdAt
      _updatedAt
      title
      content
      notes {
        contenu
        reference
        noteNb
      }
    }
  }
`;
