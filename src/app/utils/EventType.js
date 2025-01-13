export const formatEventType = (eventType) => {
    switch (eventType) {
      case 'PushEvent':
        return 'Pushed new changes';
      case 'PullRequestEvent':
        return 'Opened a pull request';
      case 'ForkEvent':
        return 'Forked the repository';
      case 'IssuesEvent':
        return 'Created an issue';
      case 'CreateEvent':
        return 'Created a new branch';
      default:
        return 'Made an update';
    }
  };
  