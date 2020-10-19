
export interface HeaderQueryData {
  viewer: {
    avatarUrl: string;
    name: string;
  };
}

export interface RepositoryListQueryData {
  search: {
    pageInfo: {
      hasPreviousPage: boolean;
      endCursor: string;
      hasNextPage: boolean;
      startCursor: string;
    }
    repositoryCount: number;
    edges: Array<{
      node: {
        url: string;
        updatedAt: string;
        description: string;
        homepageUrl: string;
        nameWithOwner: string;
        primaryLanguage: {
          id: string;
          color: string;
          name: string;
        }
        stargazerCount: number;
        openGraphImageUrl: string;
        repositoryTopics: {
          edges: Array<{
            node: {
              topic: {
                name: string;
              }
              url: string;
            }
          }>
        }
      }
    }>
  }
}
