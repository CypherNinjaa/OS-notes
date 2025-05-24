"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuizComponentProps {
  title: string
  description: string
  questions: QuizQuestion[]
}

export default function QuizComponent({ title, description, questions }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index)
  }

  const handleNext = () => {
    // Check if answer is correct and update score
    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    // Reset for next question
    setShowResult(false)
    setSelectedOption(null)

    // Move to next question or end quiz
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handleCheck = () => {
    setShowResult(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setSelectedOption(null)
    setShowResult(false)
    setScore(0)
    setQuizCompleted(false)
  }

  const question = questions[currentQuestion]

  return (
    <Card className="w-full my-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {!quizCompleted ? (
          <>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <h3 className="text-lg font-medium mt-2">{question.question}</h3>
            </div>

            <RadioGroup value={selectedOption?.toString()} className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                    disabled={showResult}
                    onClick={() => handleOptionSelect(index)}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className={`flex-1 ${
                      showResult && index === question.correctAnswer
                        ? "text-green-600 dark:text-green-400 font-medium"
                        : showResult && index === selectedOption && index !== question.correctAnswer
                          ? "text-red-600 dark:text-red-400 line-through"
                          : ""
                    }`}
                  >
                    {option}
                    {showResult && index === question.correctAnswer && (
                      <CheckCircle className="inline ml-2 h-4 w-4 text-green-600 dark:text-green-400" />
                    )}
                    {showResult && index === selectedOption && index !== question.correctAnswer && (
                      <XCircle className="inline ml-2 h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showResult && (
              <div className="mt-4 p-3 bg-muted rounded-md">
                <p className="font-medium">Explanation:</p>
                <p className="text-sm mt-1">{question.explanation}</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-lg mb-4">
              Your score: {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
            {score === questions.length ? (
              <p className="text-green-600 dark:text-green-400 font-medium">Perfect score! Excellent work!</p>
            ) : score >= questions.length * 0.7 ? (
              <p className="text-green-600 dark:text-green-400">Good job! You've mastered most of the content.</p>
            ) : (
              <p className="text-amber-600 dark:text-amber-400">Keep studying! You'll improve with practice.</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!quizCompleted ? (
          <>
            <Button
              variant="outline"
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
            >
              Previous
            </Button>
            <div>
              {!showResult ? (
                <Button disabled={selectedOption === null} onClick={handleCheck}>
                  Check Answer
                </Button>
              ) : (
                <Button onClick={handleNext}>
                  {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                </Button>
              )}
            </div>
          </>
        ) : (
          <Button className="mx-auto" onClick={resetQuiz}>
            Restart Quiz
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
