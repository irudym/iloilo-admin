/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */

/**
 * Prepare quiz object to be uploaded to API server
 * @param {string} title Quiz title
 * @param {string} description Quiz description text
 * @param {array} questionsData array with question's objects
 */
export const serializeQuiz = (title, description, questionsData) => {
  const questions = {
    data: questionsData.map((question) => ({
      type: 'question',
      id: question.id,
      attributes: {
        text: question.text,
      },
      relationships: {
        answers: {
          data: question.answers.map((answer) => ({
            type: 'answer',
            id: answer.id,
            attributes: {
              text: answer.text,
              correct: answer.correct,
            },
          })),
        },
      },
    })),
  };
  const resource = {
    data: {
      type: 'quiz',
      attributes: {
        title,
        description,
      },
      relationships: {
        questions,
      },
    },
  };
  return resource;
};

/**
 * Deserialize API server Quizzes response
 * @param {object} quiz Quiz object provided by API server
 */
export const deSerializeQuiz = (quiz) => {
  const answers = quiz.included.reduce((acc, data) => {
    if (data.type === 'answer') {
      return acc.concat({
        id: data.id,
        text: data.attributes.text,
        correct: data.attributes.correct,
      });
    }
    return acc;
  }, []);
  const questions = quiz.included.reduce((acc, data) => {
    if (data.type === 'question') {
      return acc.concat({
        id: data.id,
        text: data.attributes.text,
        answers: data.relationships.answers.data.map((answer) => (
          answers.find((value) => (value.id === answer.id))
        )),
      });
    }
    return acc;
  }, []);
  const response = {
    ...quiz.data.attributes,
    questions,
  };
  return response;
};


export const serializeQuestion = (text, answers, quizId) => {
  const question = {
    data: {
      type: 'question',
      attributes: {
        text,
      },
      relationships: {
        answers: {
          data: answers.map((answer) => ({
            type: 'answer',
            id: answer.id.match('new') ? null : answer.id,
            attributes: {
              text: answer.text,
              correct: answer.correct,
            },
          })),
        },
      },
    },
  };
  if (quizId) {
    question.data.relationships.quiz = {
      data: {
        id: quizId,
        type: 'quiz',
      },
    };
  }
  return question;
};

export const serializeGroup = ({ name, description, id }) => ({
  data: {
    id,
    type: 'group',
    attributes: {
      name,
      description,
    },
  },
});
