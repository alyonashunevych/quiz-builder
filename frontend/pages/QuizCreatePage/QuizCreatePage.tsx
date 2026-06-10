/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Field,
  Formik,
  Form,
  FieldArray,
  type FormikHelpers,
  type FormikErrors,
} from 'formik';
import cn from 'classnames';
import styles from './QuizCreatePage.module.scss';
import { catchError } from '../../utils/catchError';
import { useNavigate } from 'react-router-dom';
import { useError } from '../../components/ErrorContext';
import { quizzesService } from '../../services/quizzesService';
import type { QuestionType } from '../../types/Question';
import { validateQuizTitle } from '../../utils/validators';
import type { QuestionDTO } from '../../types/QuestionDTO';

const QUESTION_TYPES: QuestionType[] = ['BOOLEAN', 'INPUT', 'CHECKBOX'];

type FormValues = {
  title: string;
  questions: QuestionDTO[];
};

type FormErrors = FormikErrors<FormValues>;

export const QuizCreatePage = () => {
  const navigate = useNavigate();
  const { setError } = useError();

  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    const titleError = validateQuizTitle(values.title);
    if (titleError) errors.title = titleError;

    const questionsErrors: FormErrors['questions'] = [];

    values.questions.forEach((q, index) => {
      const qErrors: any = {};

      if (!q.question?.trim()) {
        qErrors.question = 'Question is required';
      }

      if (q.type === 'CHECKBOX') {
        if (!q.answers || q.answers.length < 2) {
          qErrors.answers = 'At least 2 answers required';
        } else {
          const answerErrors = q.answers.map((a) =>
            !a?.trim() ? 'Answer is required' : undefined,
          );

          if (answerErrors.some(Boolean)) {
            qErrors.answers = answerErrors;
          }
        }
      }

      questionsErrors[index] =
        Object.keys(qErrors).length ? qErrors : undefined;
    });

    if (questionsErrors.some(Boolean)) {
      errors.questions = questionsErrors as any;
    }

    return errors;
  };

  const handleSubmit = async (
    { title, questions }: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    formikHelpers.setSubmitting(true);

    quizzesService
      .createQuiz(title, questions)
      .then(() => navigate('/quizzes'))
      .catch((e) => catchError(e, setError))
      .finally(() => formikHelpers.setSubmitting(false));
  };

  return (
    <Formik<FormValues>
      initialValues={{
        title: '',
        questions: [
          {
            type: 'BOOLEAN',
            question: '',
            answers: [''],
          },
        ],
      }}
      validate={validate}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values, errors, touched, isValid }) => (
        <Form className={cn('box', styles.quiz)}>
          <h2 className="title is-3 is-light">Create Quiz</h2>

          {/* TITLE */}
          <div className="field">
            <label className="label is-light">Quiz title</label>

            <Field
              name="title is-light"
              placeholder="Enter quiz title"
              className={cn('input', {
                'is-danger': touched.title && errors.title,
              })}
            />

            {touched.title && errors.title && (
              <p className="help is-danger">{errors.title}</p>
            )}
          </div>

          {/* QUESTIONS */}
          <FieldArray name="questions">
            {({ push, remove }) => (
              <div className={styles.questions}>
                {values.questions.map((q, index) => {
                  const qError = errors.questions?.[index] as any;
                  const qTouched = touched.questions?.[index] as any;

                  return (
                    <div key={index} className={cn(styles.questionCard, `quiz_color_${index % 5}`)}>
                      <div className={styles.questionCard_header}>
                        <label className="label is-light">
                          Question {index + 1}
                        </label>

                        <button type="button" onClick={() => remove(index)} title="Delete question">
                          <i className="fa-solid fa-trash-can icon--delete" />
                        </button>
                      </div>

                      {/* QUESTION */}
                      <Field
                        name={`questions.${index}.question`}
                        placeholder="Question"
                        className={cn(styles.input,'input', {
                          'is-danger':
                            qTouched?.question && qError?.question,
                        })}
                      />

                      {qTouched?.question && qError?.question && (
                        <p className="help is-danger">
                          {qError.question}
                        </p>
                      )}

                      {/* TYPE */}
                      <Field
                        as="select"
                        name={`questions.${index}.type`}
                        className={cn(styles.select, 'select')}
                      >
                        {QUESTION_TYPES.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Field>

                      {/* ANSWERS */}
                      {q.type === 'CHECKBOX' && (
                        <FieldArray name={`questions.${index}.answers`}>
                          {({ push, remove }) => (
                            <div className={styles.answers}>
                              {q.answers?.map((_, aIndex) => {
                                const aError = qError?.answers?.[aIndex];
                                const aTouched =
                                  qTouched?.answers?.[aIndex];

                                return (
                                  <div
                                    key={aIndex}
                                    className={styles.answer}
                                  >
                                    <Field
                                      name={`questions.${index}.answers.${aIndex}`}
                                      placeholder="Answer"
                                      className={cn(styles.input, 'input', {
                                        'is-danger': aTouched && aError,
                                      })}
                                    />

                                    <button
                                      type="button"
                                      onClick={() => remove(aIndex)}
                                      title="Delete answer"
                                    >
                                      <i className="fa-solid fa-trash-can icon--delete" />
                                    </button>
                                  </div>
                                );
                              })}

                              <button
                                type="button"
                                onClick={() => push('')}
                                className={cn(styles.button, 'button')}
                              >
                                + Add answer
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  className="button"
                  onClick={() =>
                    push({
                      type: 'BOOLEAN',
                      question: '',
                      answers: [''],
                    })
                  }
                >
                  + Add question
                </button>
              </div>
            )}
          </FieldArray>

          {/* SUBMIT */}
          <button
            type="submit"
            className={cn('button is-success', {
              'is-loading': isSubmitting,
            })}
            disabled={isSubmitting || !isValid}
          >
            Create Quiz
          </button>
        </Form>
      )}
    </Formik>
  );
};
