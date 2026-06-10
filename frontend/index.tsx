import { createRoot } from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { App } from './App';
import { QuizzesPage } from './pages/QuizzesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { QuizCreatePage } from './pages/QuizCreatePage';
import { QuizDetailsPage } from './pages/QuizDetailsPage/QuizDetailsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/quizzes" replace />} />

        <Route path="quizzes" element={<QuizzesPage />} />

        <Route path="create" element={<QuizCreatePage />} />

        <Route path="quizzes/:id" element={<QuizDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')!).render(<Root />);
