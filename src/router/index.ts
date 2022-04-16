import BugWorkflow from '../pages/BugWorkflow';
import ProcessWorkflow from '../pages/ProcessWorkflow';

const routes = [
  {
    path: '/',
    Component: ProcessWorkflow
  },
  {
    path: '/example',
    Component: BugWorkflow
  }
]

export default routes