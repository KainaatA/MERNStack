import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./components/sections/header/Header";
import AttemptExam from "./pages/AttemptExam/AttemptExam";
import CreateExam from "./pages/CreateExam/CreateExam.js";
import Dashboard from "./pages/Dashboard/Dashboard";
import AttemptManualExamNew from "./pages/Dashboard/partials/AttemptManualExamNew";
import Home from "./pages/home/Home.js";
import SignUp from "./pages/Signup/SignUp.js";
//import Record from './components/sections/ScreenRecorder.js'

function App() {
  const instrutorId = localStorage.getItem("instructorId");
  const studentId = localStorage.getItem("studentId");
  const adminId = localStorage.getItem("adminId");

  return (
    <>
      <Header />

      <Switch>
        {instrutorId || studentId || adminId ? (
          <div>
            <Route path="/" component={Home} exact />
            <Route path="/create-exam" component={CreateExam} exact />
            <Route path="/login" component={SignUp} exact />
            <Route path="/dashboard/:name" component={Dashboard} exact />
            <Route path="/attempt-exam" component={AttemptExam} exact />
            <Route
              path="/attempt-exam-manual"
              component={AttemptManualExamNew}
              exact
            />
          </div>
        ) : (
          <div>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={SignUp} exact />
          </div>
        )}
      </Switch>
    </>
  );
}

export default App;
