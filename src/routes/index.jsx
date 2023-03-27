// AppRoutes is a RouterProvider that uses the router to render the different
// components in the app. It also handles the error page.

import { createBrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'shared/error-boundary';
import Dashboard from 'views/dashboard';
import IssueDetailView from 'views/issue-detail';
import IssueListView from 'views/issues';
import PullRequestDetailView from 'views/pull-request-details';
import PullRequestListView from 'views/pull-requests';
import ErrorPage from './error-page';

import { routes } from './paths';

const routesConfig = [
  {
    path: routes.dashboard,
    Component: Dashboard,
    errorElement: <ErrorPage />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: routes.pullRequests,
    Component: PullRequestListView,
    errorElement: <ErrorPage />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: routes.pullRequestDetail,
    Component: PullRequestDetailView,
    errorElement: <ErrorPage />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: routes.issues,
    Component: IssueListView,
    errorElement: <ErrorPage />,
    ErrorBoundary: ErrorBoundary,
  },
  {
    path: routes.issueDetail,
    Component: IssueDetailView,
    errorElement: <ErrorPage />,
    ErrorBoundary: ErrorBoundary,
  },
];

export const router = createBrowserRouter(routesConfig);
