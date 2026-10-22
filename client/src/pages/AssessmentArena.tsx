import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { Assessment, AssessmentQuestion } from '../../../shared/types';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Check
} from 'lucide-react';

export const AssessmentArena: React.FC = () => {
  const { profile, refreshProfileData } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [submittedResult, setSubmittedResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.getAssessments().then(data => {
      setAssessments(data.assessments || []);
      setLoading(false);
    });
  }, []);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    if (!activeAssessment || !profile) return;
    try {
      const res = await api.submitAssessment(activeAssessment.id, profile.id, userAnswers);
      setSubmittedResult(res);
      await refreshProfileData();

      if (res.passed) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch (err) {
      console.error('Failed to submit assessment:', err);
    }
  };

  const handleResetTest = () => {
    setUserAnswers({});
    setSubmittedResult(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Skills Assessment
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Measure verified capabilities, identify exact topic deficits, and automatically adapt your learning roadmap.
        </p>
      </div>

      {/* Assessment Selector Grid (when not currently taking a test) */}
      {!activeAssessment ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map(test => {
            const pastScore = profile?.assessmentScores[test.id];
            const hasTaken = pastScore !== undefined;

            return (
              <div
                key={test.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-5 space-y-3 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-blue-50 dark:bg-blue-600/20 px-2 py-0.5 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider border border-blue-200 dark:border-blue-500/30">
                      {test.type}
                    </span>
                    {hasTaken && (
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        pastScore >= test.passingScore ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60' : 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60'
                      }`}>
                        Score: {pastScore}%
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {test.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {test.questions.length} scenario-based evaluation questions.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Passing Threshold: <strong className="text-slate-800 dark:text-slate-200">{test.passingScore}%</strong>
                  </span>
                  <button
                    onClick={() => {
                      setActiveAssessment(test);
                      handleResetTest();
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 px-3.5 py-1.5 text-xs font-bold text-white transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <span>{hasTaken ? 'Retake Test' : 'Start Test'}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : submittedResult ? (
        /* Test Results View */
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">Evaluation Report</span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{activeAssessment.title}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400">Final Score</div>
                  <div className={`text-2xl font-black font-mono ${submittedResult.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {submittedResult.scorePercentage}%
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase border ${
                  submittedResult.passed ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/80' : 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/80'
                }`}>
                  {submittedResult.passed ? 'Benchmark Passed' : 'Revision Recommended'}
                </div>
              </div>
            </div>

            {/* Live Recalculation Notification Banner */}
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 p-3.5 flex items-start gap-3 text-xs text-emerald-800 dark:text-emerald-200">
              <Sparkles className="h-4 w-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong>Dynamic Profile & Roadmap Recalibrated:</strong> Your skill mastery score has been updated in your profile, and the adaptive roadmap milestones have been tailored accordingly.
              </div>
            </div>

            {/* Questions Breakdown */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Detailed Answer Review</h3>
              {submittedResult.questionResults.map((qr: any, idx: number) => (
                <div
                  key={qr.questionId}
                  className={`rounded-xl border p-4 text-xs space-y-2 ${
                    qr.isCorrect ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20' : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-slate-900 dark:text-slate-200">
                      {idx + 1}. {qr.question}
                    </span>
                    {qr.isCorrect ? (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
                        <CheckCircle2 className="h-4 w-4" /> Correct
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-bold shrink-0">
                        <XCircle className="h-4 w-4" /> Incorrect
                      </span>
                    )}
                  </div>
                  <div className="p-2.5 rounded-lg bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed">
                    <strong className="text-slate-500 dark:text-slate-400 block mb-0.5 font-semibold">Concept Explanation:</strong>
                    {qr.explanation}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button
                onClick={handleResetTest}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={() => {
                  setActiveAssessment(null);
                  navigate('/roadmap');
                }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 py-2.5 text-xs font-bold text-white transition-colors shadow-md shadow-blue-600/20 cursor-pointer"
              >
                <span>Continue to Adapted Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Active Test Taking View */
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {activeAssessment.type} Evaluation
                </span>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{activeAssessment.title}</h2>
              </div>
              <button
                onClick={() => setActiveAssessment(null)}
                className="rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                Exit Assessment
              </button>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {activeAssessment.questions.map((q, qIndex) => (
                <div key={q.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 p-4 space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-400 text-xs font-mono font-bold">
                      {qIndex + 1}
                    </span>
                    <div className="font-semibold text-slate-900 dark:text-slate-100 text-xs sm:text-sm">
                      {q.question}
                    </div>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 pl-7">
                    {q.options.map((opt, optIndex) => {
                      const isSelected = userAnswers[q.id] === optIndex;
                      return (
                        <button
                          key={optIndex}
                          type="button"
                          onClick={() => handleSelectOption(q.id, optIndex)}
                          className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-600/20 text-blue-900 dark:text-white font-semibold'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80'
                          }`}
                        >
                          <span>{opt}</span>
                          <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-blue-500 bg-blue-600' : 'border-slate-300 dark:border-slate-700'
                          }`}>
                            {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white"></div>}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Answered: {Object.keys(userAnswers).length} of {activeAssessment.questions.length} questions
              </div>
              <button
                onClick={handleSubmit}
                disabled={Object.keys(userAnswers).length === 0}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Submit & Calculate Roadmap</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
