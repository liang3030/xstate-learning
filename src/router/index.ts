import BugWorkflow from '../pages/BugWorkflow';
import ProcessWorkflow from '../pages/ProcessWorkflow';

const routes = [
  {
    path: '/xstate-learning/example',
    Component: BugWorkflow,
  },
  {
    path: '/xstate-learning',
    Component: ProcessWorkflow
  },
]

export default routes