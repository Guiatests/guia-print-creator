import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Quiz = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/");
      setSession(session);
    });

    fetchQuestions();
  }, [navigate]);

  const fetchQuestions = async () => {
    const { data, error } = await supabase.from("questions").select("*");
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch questions",
        variant: "destructive",
      });
      return;
    }
    setQuestions(data);
  };

  const handleAnswer = async () => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correct_answer;
    
    if (isCorrect) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done!",
        variant: "default",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${currentQ.correct_answer}`,
        variant: "destructive",
      });
    }

    if (currentQuestion + 1 >= questions.length) {
      setIsGameOver(true);
      // Save score to database
      if (session) {
        await supabase.from("user_scores").insert({
          user_id: session.user.id,
          score: score + (isCorrect ? 1 : 0),
          questions_answered: questions.length,
        });
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer("");
    setIsGameOver(false);
  };

  if (!questions.length) {
    return <div className="container mx-auto p-6">Loading questions...</div>;
  }

  if (isGameOver) {
    return (
      <div className="container mx-auto max-w-xl p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Game Over!</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xl mb-4">Your score: {score} out of {questions.length}</p>
            <div className="space-x-4">
              <Button onClick={restartQuiz}>Play Again</Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const answers = [...currentQ.wrong_answers, currentQ.correct_answer].sort(
    () => Math.random() - 0.5
  );

  return (
    <div className="container mx-auto max-w-xl p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-center">
            Question {currentQuestion + 1} of {questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-lg mb-4">{currentQ.question}</p>
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {answers.map((answer) => (
                <div key={answer} className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value={answer} id={answer} />
                  <Label htmlFor={answer}>{answer}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <Button
            onClick={handleAnswer}
            disabled={!selectedAnswer}
            className="w-full"
          >
            Submit Answer
          </Button>
          <div className="mt-4 text-center">
            <p>Current Score: {score}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Quiz;