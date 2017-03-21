import PostUpvoter from './PostUpvoter';
import ShowMore from '../ShowMore';
import Loading from '../Loading';


function PostList({ data, loadMorePosts }) { // eslint-disable-line react/prop-types
  const { allPosts, loading, _allPostsMeta } = data;

  if (!allPosts || !allPosts.length) {
    return <Loading />;
  }

  const areMorePosts = allPosts.length < _allPostsMeta.count;

  return (
    <section>
      <ul>
        {allPosts.map((post, index) => (
          <li key={post.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={post.url}>{post.title}</a>
              <PostUpvoter id={post.id} votes={post.votes} />
            </div>
          </li>
        ))}
      </ul>
      {areMorePosts ? <ShowMore {...{ loading, loadMore: loadMorePosts }} /> : ''}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: "";
          height: 0;
          width: 0;
        }
      `}</style>
    </section>
  );
}


export default PostList;
