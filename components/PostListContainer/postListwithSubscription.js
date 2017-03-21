import { gql } from 'react-apollo';
import { Component } from 'react';

const SUBSCRIPTION_QUERY = gql`
  subscription votesUpdates ( $postIds: [ID!] ) {
    Post(
      filter: {
        node:{
          id_in: $postIds
        }
        updatedFields_contains_some: ["votes"]
      }
    ) {
      node {
        id
        votes
      }
    }
  }
`;

const getSubscriptionVariables = props => ({
  postIds: props.data.allPosts.map(node => node.id),
});

export default PostList => (
  class PostListWithSubscription extends Component { // eslint-disable-line
    componentDidMount() {
      this.subscribe(this.props);
    }

    componentWillReceiveProps(newProps) {
      this.subscribe(newProps);
    }

    subscribe(props) {
      const variables = getSubscriptionVariables(props);
      if (this.subscription) {
        const oldVariables = getSubscriptionVariables(this.props);
        if (JSON.stringify(oldVariables) === JSON.stringify(variables)) {
          // no change on variables, no need subscription needed
          return;
        }
        // unsubscribe from current subscription
        this.subscription();
      }
      this.subscription = props.data.subscribeToMore({
        document: SUBSCRIPTION_QUERY,
        variables,
        updateQuery: (previousResult, { subscriptionData }) => {
          const newNode = subscriptionData.data.Post.node;
          const newResult = {
            ...previousResult,
            allPosts: previousResult.allPosts.map((node) => {
              if (node.id === newNode.id) {
                return {
                  ...node,
                  ...newNode,
                };
              }
              return node;
            }),
          };

          return newResult;
        },
        onError: err => console.error(err),
      });
    }

    render() {
      return <PostList {...this.props} />;
    }
  }
);
