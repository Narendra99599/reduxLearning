import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";

// Action types for students
const studentsInit = "students/intilization";
const incrementMarks = "students/incrementMarks";
const incrementMarksForSubject = "students/incrementMarksForSubject";

// Action types for hobbies
const hobbiesInit = "hobbies/intilization";
const hobbieChange = "hobbies/changeHobbie";

// Reducer for students
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

// Reducer for hobbies
const hobbiesReducer = (state = [], action) => {
  switch (action.type) {
    case hobbiesInit:
      return action.payload;

    case hobbieChange:
      return state.map((hobbie) => {
        if (hobbie.id === action.payload.id) {
          return {
            ...hobbie,
            hobbie: action.payload.hobbie,
          };
        }
        return hobbie;
      });

    default:
      return state;
  }
};

// Combine reducers
const rootReducer = combineReducers({
  students: studentsReducer,
  hobbies: hobbiesReducer,
});

// Create Redux store with thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

// Async action to get students
const getStudents = async (dispatch) => {
  const response = await fetch("http://localhost:3000/students");
  const data = await response.json();
  dispatch({
    type: studentsInit,
    payload: data,
  });
};

// Async action to get hobbies
const getHobbies = async (dispatch) => {
  const response = await fetch("http://localhost:3000/hobbies");
  const data = await response.json();
  dispatch({
    type: hobbiesInit,
    payload: data,
  });
};

// Action creator to increment marks
const incrementByMarks = () => {
  return {
    type: incrementMarks,
    payload: {
      id: 1,
      marks: 10,
    },
  };
};

// Action creator to change a hobbie
const hobbieChangeActionCreator = (id, hobbie) => {
  return {
    type: hobbieChange,
    payload: {
      id,
      hobbie,
    },
  };
};

// Dispatch initial actions
store.dispatch(getHobbies);
store.dispatch(getStudents);

// Simulating delayed state update
setTimeout(() => {
  console.log("Initial State:");
  console.log(store.getState());

  // Dispatch actions
  store.dispatch(incrementByMarks());
  store.dispatch(hobbieChangeActionCreator(1, "sketch"));

  console.log("*************************************");

  // Log updated state
  console.log("Updated Students:");
  console.log(store.getState().students);

  console.log("Updated Hobbies:");
  console.log(store.getState().hobbies);
}, 3000);