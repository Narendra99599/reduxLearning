import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

//action creators names for studbets
const studentsInit = "intilization";
const incrementMarks = "incrementMarks";
const incrementMarksForSubject = "incrementMarksForSubject";

//action creators names for hobbies
const hobbiesInit = "intilization";
const hobbieChange = "changeHobbie";

function studentsReducer(state = [], action) {
  switch (action.type) {
    case studentsInit:
      return action.payload;
    case incrementMarks:
      return state.map((student) => {
        if (student.id === action.payload.id) {
          return {
            ...student,
            marks: {
              maths: student.marks.maths + action.payload.marks,
              physics: student.marks.physics + action.payload.marks,
              chemistry: student.marks.chemistry + action.payload.marks,
            },
          };
        }
        return student;
      });

    case incrementMarksForSubject:
      return state.map((student) => {
        if (student.id === action.payload.id) {
          return {
            ...student,
            marks: {
              ...student.marks,
              [action.payload.subject]:
                student.marks[action.payload.subject] + action.payload.marks,
            },
          };
        }
        return student;
      });
    default:
      return state;
  }
}

const hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case hobbiesInit:
      return action.payload;
    case hobbieChange:
      state.map((hobby) => {
        if (hobby.id === action.payload.id) {
          return {
            ...hobby,
            id: action.payload.id,
            hobby: action.payload.hobby,
          };
        }
        return hobby;
      });
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    students: studentsReducer,
    hobbies: hobbiesReducer,
  }),
  applyMiddleware(thunk)
);

//action creators
const getStudents = async (dispatch, getState) => {
  const response = await fetch("http://localhost:3000/students");
  const data = await response.json();
  dispatch({
    type: studentsInit,
    payload: data,
  });
};

const getHobbies = async (dispatch, getState) => {
  const response = await fetch("http://localhost:3000/hobbies");
  const data = await response.json();
  dispatch({
    type: hobbiesInit,
    payload: data,
  });
};

const incrementByMarks = () => {
  return {
    type: incrementMarks,
    payload: {
      id: 1,
      marks: 10,
    },
  };
};

store.dispatch(getHobbies);

setTimeout(() => {
  console.log(store.getState());
  store.dispatch(incrementByMarks());
  console.log("*************************************");
  console.log(store.getState());
}, 3000);
