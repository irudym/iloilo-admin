/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { constructError } from './errors';

const axios = require('axios');

/**
 * Load all quizzes from server
 * @param {string} url API server URL
 * @param {string} token ID token which provided after login
 */
export const fetchQuizzes = async ({ url, token }) => {
  try {
    const response = await axios.get(`${url}/quizzes`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Load quiz data from API server
 * @param {string} url API server URL
 * @param {string} token ID token which provided after an user login
 * @param {string} id Quiz ID
 */
export const fetchQuiz = async ({ url, token, id }) => {
  try {
    const response = await axios.get(`${url}/quizzes/${id}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Create a quiz record
 * @param {string} url API server URL
 * @param {string} token ID token which provided after login
 * @param {object} quiz Quiz json object representation
 */
export const createQuiz = async ({ url, token, quiz }) => {
  try {
    const response = await axios.post(
      `${url}/quizzes`,
      quiz,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw constructError(error);
  }
};

/**
 * Update quiz resource at the provided server
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {quiz} Quiz object with all fields
 */
export const updateQuiz = async ({ url, token, quiz }) => {
  try {
    const response = await axios.put(
      `${url}/quizzes/${quiz.data.id}`,
      quiz,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Delete quiz's record
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {number} id Quiz id
 */
export const deleteQuiz = async ({ url, token, id }) => {
  try {
    const response = await axios.delete(`${url}/quizzes/${id}`,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Activate Quiz (before start it), creates a ActiveQuiz record, which will be used to collect
 * responses and track Quiz duration
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {number} id Quiz ID which should be started
 */
export const activateQuiz = async ({ url, token, id }) => {
  try {
    const response = await axios.post(`${url}/active_quizzes`,
      {
        data: {
          relationships: {
            quiz_id: id,
          },
        },
      },
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Start activated Quiz. Activation is necessary to allow students to connect to the quiz
 * and be ready, when the the quiz start
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {string} id Activated Quiz ID
 */
export const startQuiz = async ({ url, token, id }) => {
  try {
    const response = await axios.put(`${url}/active_quizzes/${id}`, {},
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};


/**
 * Get information about the particular active Quiz
 * @param {string} url  API server URL
 * @param {string} token Security token
 * @param {number} id Active Quiz ID
 */
export const fetchActiveQuiz = async ({ url, token, id }) => {
  try {
    const response = await axios.get(`${url}/active_quizzes/${id}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Get a list of active quizzes
 * @param {string} url API server URL
 * @param {string} token Security token
 */
export const fetchActiveQuizzes = async ({ url, token }) => {
  try {
    const response = await axios.get(`${url}/active_quizzes`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Update question resource  at the server
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {object} question Question object (serialized)
 */
export const updateQuestion = async ({ url, token, question }) => {
  try {
    const response = await axios.put(
      `${url}/questions/${question.data.id}`,
      question,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Create a question record at API server. Please pay attention that quiz ID
 * should be provided in relationship group. See API.md for more details
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {object} question Question object (serialized)
 */
export const createQuestion = async ({ url, token, question }) => {
  try {
    const response = await axios.post(
      `${url}/questions`,
      question,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Delete question's record
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {number} id Question id
 */
export const deleteQuestion = async ({ url, token, id }) => {
  try {
    const response = await axios.delete(`${url}/questions/${id}`,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};


/**
 * User signup (admin by default)
 * @param {string} url API server url
 * @param {object} user User description object
 */
export const signup = async ({ url, user }) => {
  try {
    const response = await axios.post(`${url}/signup/`, {
      data: {
        attributes: {
          ...user,
        },
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

export const login = async ({ url, credentials }) => {
  try {
    const response = await axios.post(`${url}/login`, credentials,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Load all groups from server
 * @param {string} url API server URL
 * @param {string} token ID token which provided after login
 */
export const fetchGroups = async ({ url, token }) => {
  try {
    const response = await axios.get(`${url}/groups`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Load a group record from server
 * @param {string} url API server URL
 * @param {string} token ID token which provided after login
 * @param {number} id ID of the record
 */
export const fetchGroup = async ({ url, token, id }) => {
  try {
    const response = await axios.get(`${url}/groups/${id}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

/**
 * Create a group record
 * @param {string} url API server URL
 * @param {string} token ID token which provided after login
 * @param {object} group Group json object representation
 */
export const createGroup = async ({ url, token, group }) => {
  try {
    const response = await axios.post(
      `${url}/groups`,
      group,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw constructError(error);
  }
};

/**
 * Update group resource  at the server
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {object} group Group object (serialized)
 */
export const updateGroup = async ({ url, token, group }) => {
  try {
    const response = await axios.put(
      `${url}/groups/${group.data.id}`,
      group,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};


/**
 * Delete group's record
 * @param {string} url API server URL
 * @param {string} token Security token
 * @param {number} id group id
 */
export const deleteGroup = async ({ url, token, id }) => {
  try {
    const response = await axios.delete(`${url}/groups/${id}`,
      {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};

export const fetchReport = async ({ url, token, id }) => {
  try {
    const response = await axios.get(`${url}/reports/${id}`, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw constructError(error);
  }
};
