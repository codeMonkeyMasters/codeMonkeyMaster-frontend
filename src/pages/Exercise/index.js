import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExerciseById } from "../../store/exercise/actions";
import { selectExercise } from "../../store/exercise/selectors";
import { selectCompletedExercises } from "../../store/user/selectors";
import { getCompletedExercises } from "../../store/user/actions";
import QuizCards from "../../components/QuizCards";
import QuizCode from "../../components/QuizCode";

export default function Exercise() {
  const param = useParams();
  console.log("param", param);
  const exerciseId = param.id;
  console.log("ex id test", exerciseId);
  const dispatch = useDispatch();
  const allCurrentExercises = useSelector(selectExercise);
  const completedExercises = useSelector(selectCompletedExercises);
  const [currentExercise, setCurrentExercise] = useState("");
  console.log("all ex", allCurrentExercises);

  useEffect(() => {
    completedExercises.forEach((item) => {
      const correctExercise = allCurrentExercises.find((x) => {
        if (item.quizQuestionId !== x.id) {
          return true;
        } else {
          return false;
        }
      });
      setCurrentExercise(correctExercise);
    });

    if (completedExercises.length === 0) {
      const correctExercise = allCurrentExercises.find(
        (item) => item.level === "level 1"
      );
      setCurrentExercise(correctExercise);
    }
  }, [completedExercises, allCurrentExercises]);

  useEffect(() => {
    dispatch(getCompletedExercises());
    dispatch(getExerciseById(exerciseId));
  }, [dispatch, exerciseId]);
  console.log("current exercise", currentExercise);

  const questionFormat = () => {
    if (currentExercise && currentExercise.level === "level 1") {
      return <QuizCards exercise={currentExercise} />;
    } else if (currentExercise && currentExercise.level === "level 2") {
      return <QuizCode exercise={currentExercise} />;
    } else {
      //return some loading indicator would be better
      console.log("test");
      return null;
    }
  };

  return <div>{questionFormat()}</div>;
}
