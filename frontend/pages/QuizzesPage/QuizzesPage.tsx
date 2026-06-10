/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './QuizzesPage.module.scss';
import cn from 'classnames';

import { quizzesService } from '../../services/quizzesService';
import type { Quiz } from '../../types/Quiz';
import { catchError } from '../../utils/catchError';
import { useError } from '../../components/ErrorContext';
import { Loader } from '../../components/Loader';

export const QuizzesPage = () => {
  const navigate = useNavigate();
  const { setError } = useError();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id: number) => {
    try {
      await quizzesService.deleteQuiz(id);

      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } catch (e) {
      catchError(e as any, setError);
    }
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);

        const res = await quizzesService.getAllQuizzes();

        setQuizzes(res.data);
      } catch (e: unknown) {
        catchError(e as any, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [setError]);

  return (
    <div className={styles.quizzes_page}>
      <div className={styles.quizzes_header}>
        <p className="title is-2" style={{ margin: 0 }}>
          Quizzes
        </p>

        <div
          className={styles.add_button}
          onClick={() => navigate('/create')}
          title="Create a quiz"
        >
          <i className="icon fa-solid fa-circle-plus fa-2xl" />
        </div>
      </div>

      <div className={styles.quizzes}>
        {loading && <Loader />}

        {!loading && quizzes.length === 0 && (
          <p className="subtitle is-4" style={{ marginTop: "20px" }}>No quizzes yet</p>
        )}

        {quizzes?.map((quiz, index) => (
          <div
            key={quiz.id}
            className={cn(styles.quiz_card, `quiz_color_${index % 5}`)}
            onClick={() => navigate(`/quizzes/${quiz.id}`)}
          >
            <div className={styles.quiz_card_text}>
              <h3 className="title is-3">{quiz.title}</h3>
              <p>{quiz.questions.length} questions</p>
            </div>

            <i className="fa-solid fa-trash-can fa-2xl" onClick={(e) => {
              e.stopPropagation();
              handleDelete(quiz.id);
            }} />
          </div>
        ))}
      </div>
    </div>
  );
};
