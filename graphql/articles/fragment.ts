import { gql } from "@apollo/client";

export const ArticlePathsFragment = gql`
    fragment on allArticles {
        _allSlugLocales {
            value
            locale
        }
    }
`;
