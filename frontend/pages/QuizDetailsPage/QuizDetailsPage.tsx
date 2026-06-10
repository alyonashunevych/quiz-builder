/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import cn from 'classnames';

import type { Quiz } from '../../types/Quiz';
import { quizzesService } from '../../services/quizzesService';
import { catchError } from '../../utils/catchError';
import { useError } from '../../components/ErrorContext';
import { Loader } from '../../components/Loader';

import styles from './QuizDetailsPage.module.scss';

export const QuizDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setError } = useError();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        setLoading(true);

        const res = await quizzesService.getQuiz(Number(id));
        setQuiz(res.data);
      } catch (e) {
        catchError(e as any, setError);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, setError]);

  if (loading) return <Loader />;
  if (!quiz) return <p className="subtitle is-4">Quiz not found</p>;

  return (
    <div className={cn(styles.page)}>
      <button
        className={cn('button is-light', styles.backButton)}
        onClick={() => navigate('/quizzes')}
      >
        Back
      </button>

      <h1 className={cn('title is-2', styles.title)}>
        {quiz.title}
      </h1>

      <p className={cn('subtitle is-5', styles.subtitle)}>
        {quiz.questions.length} questions
      </p>

      <div className={cn('columns', styles.list)}>
        {quiz.questions.map((q, index) => (
          <div key={index} className={cn('box', styles.card, `quiz_color_${index % 5}`)}>
            <div className={styles.card_header}>
              <h2 className={cn('title is-5')}>
                {index + 1}. {q.question}
              </h2>

              <p className={cn('tag', styles.tag)}>
                {q.type}
              </p>
            </div>

            {q.type === 'BOOLEAN' && (
              <div className={styles.boolean}>
                <button className={cn('button is-success', styles.btn)}>
                  True
                </button>
                <button className={cn('button is-danger', styles.btn)}>
                  False
                </button>
              </div>
            )}

            {q.type === 'INPUT' && (
              <div className={styles.inputWrap}>
                <input
                  className={cn('input', styles.input)}
                  placeholder="Your answer..."
                />
              </div>
            )}

            {q.type === 'CHECKBOX' && (
              <div className={styles.checkboxList}>
                {q.answers?.map((a, i) => (
                  <label
                    key={i}
                    className={cn('checkbox', styles.checkboxItem)}
                  >
                    <input type="checkbox"/>
                    <span>{a}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
