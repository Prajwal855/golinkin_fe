import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  Link,
  Modal,
  Paper,
  Rating,
  Typography,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { PieChart } from "@mui/x-charts";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

// Dark theme configuration
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#04d9ff",
    },
  },
});

interface UserDetails {
  score: number;
  correct_answers: number;
  total_questions: number;
  incorrect_questions?: Array<{
    question_id: number;
    question: string;
    correct_answer: string;
    selected_option: string;
  }>;
}

const Result: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    score: 0,
    correct_answers: 0,
    total_questions: 0,
    incorrect_questions: [],
  });
  const [answersVisible, setAnswersVisible] = useState(true);
  const [rating, setRating] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleRatingChange = (newRating: number | null) => {
    setRating(newRating);
  };

  const fetchResults = async () => {
    const answerSubmit = localStorage.getItem("answers");
    if (answerSubmit) {
      try {
        const savedAccessToken = localStorage.getItem("AccessToken");
        const response = await axios.post(
          "http://localhost:3000/submitanswer",
          answerSubmit,
          {
            headers: {
              "Content-Type": "application/json",
              token: `${savedAccessToken}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setUserDetails(response.data);
      } catch (error) {
        toast.error("Unable to fetch results");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleExit = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("answers");
    navigate("/Home");
  };

  if (loading) {
    return <div><Loading /></div>;
  }

  const handleShowAnswers = () => {
    setShowAnswers(true);
    setOpenModal(true);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="dark-theme">
        <div className="App">
          <nav className="fixed-navbar">
            <Link href="/Home">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3772/3772209.png"
                className="nav--icon"
                alt="Learn Now Logo"
              />
            </Link>
            <h3 className="nav--logo_text">GoLinkIN</h3>
          </nav>
          <h1 style={{ color: 'white' }}>Your Results!</h1>
          <div>
            <Typography variant="h6" style={{ color: 'white' }}>Score: {userDetails.score}</Typography>
            <Typography variant="body1" style={{ color: 'white' }}>
              Correct Answers: {userDetails.correct_answers}
            </Typography>
            <Typography variant="body1" style={{ color: 'white' }}>
              Total Questions: {userDetails.total_questions}
            </Typography>
            <div style={{ marginLeft: '40%' }}>
              <PieChart
                colors={["green", "red"]}
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: userDetails.correct_answers,
                        label: "Correct",
                      },
                      {
                        id: 1,
                        value:
                          userDetails.total_questions -
                          userDetails.correct_answers,
                        label: "Wrong",
                      },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', marginLeft: '40%', marginRight: '40%' }}>
              <Button color='secondary' variant="contained" onClick={handleExit}>
                Exit Quiz
              </Button>
              <Button color='secondary' variant="contained" onClick={handleShowAnswers}>
                Show Answers
              </Button>
            </div>
            {showAnswers && answersVisible && (
              <>
                <Modal open={openModal} onClose={() => setOpenModal(false)}>
                  <Box sx={{ width: 900, height: 600, margin: 'auto', marginTop: '50px', overflowY: 'auto' }}>
                    <Paper sx={{ padding: 2 }}>
                      <Typography variant="h6" style={{ marginLeft: "40%", fontWeight: 600 }}>Incorrect Answers</Typography>
                      {userDetails.incorrect_questions && userDetails.incorrect_questions.map((incorrectQuestion) => (
                        <div key={incorrectQuestion.question_id}>
                          <Typography variant="body1">
                            Question: {incorrectQuestion.question}
                          </Typography>
                          <Typography variant="body1">
                            Answer Submitted: {incorrectQuestion.selected_option}
                          </Typography>
                          <Typography variant="body1">
                            Correct Answer: {incorrectQuestion.correct_answer}
                          </Typography>
                          <Typography variant="body1">
                            --------------------------------------------------------------
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </Box>
                </Modal>
              </>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '241px' }}>
          <InputLabel style={{ marginBottom: '10px' }}>Rate the Quiz:</InputLabel>
          <Rating
            name="quiz-rating"
            value={rating}
            onChange={(event, newRating) => handleRatingChange(newRating)}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Result;
