import React from 'react';
import Link from './Link';
// 取得したいので、useQueryを使う。
import { useQuery, gql } from '@apollo/client';
// 投げるGraphQLのクエリ作成
const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

  return (
    <div>
    {data && (
      <>
        {data.feed.links.map((link, index) => (
          <Link key={link.id} link={link} index={index} />
        ))}
      </>
    )}
  </div>
  );
};

export default LinkList;