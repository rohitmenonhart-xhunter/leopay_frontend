import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CheckCircle, AlertCircle, Calendar, Award, Play, ArrowUp } from 'lucide-react';
import axios from 'axios';
import quizQuestionsData from '../data/quizQuestions.json';
import config from '../config';

// API URL
const API_URL = `${config.apiUrl}/auth`;

// YouTube IFrame API type declarations
declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        BUFFERING: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface PlayerEvent {
  target: any;
  data?: number;
}

interface LearningVideo {
  id: number;
  title: string;
  description: string;
  videoId: string;
  completed: boolean;
  duration: number; // Video duration in seconds
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

const PreDashboardAccess: React.FC = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const playerRef = useRef<any>(null);
  const watchTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const quizContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize videos watched from user data
  const initialVideosWatched = user?.videosWatched || [];
  const initialProgress = user?.trainingProgress || 0;
  
  const [currentVideo, setCurrentVideo] = useState<number>(initialProgress < 3 ? initialProgress + 1 : 3);
  const [quizPassed, setQuizPassed] = useState<boolean>(user?.quizPassed || false);
  const [meetingScheduled, setMeetingScheduled] = useState<boolean>(user?.meetingScheduled || false);
  const [dashboardAccess, setDashboardAccess] = useState<boolean>(user?.dashboardAccess || false);
  const [showQuiz, setShowQuiz] = useState<boolean>(initialProgress >= 3 && !quizPassed);
  const [quizAnswers, setQuizAnswers] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [videoWatchProgress, setVideoWatchProgress] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [playerReady, setPlayerReady] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  
  // Learning videos data
  const learningVideos: LearningVideo[] = [
    {
      id: 1,
      title: "10 Steps That'll Turn You Into A Sales Machine",
      description: "Learn the essential sales techniques to become an effective client hunter.",
      videoId: "amdXa3CfzHw", // Updated YouTube video ID
      completed: initialVideosWatched.includes(1),
      duration: 300 // Example duration in seconds (will be updated when video loads)
    },
    {
      id: 2,
      title: "Give Me 7 Minutes and Land 3 Web Design Clients [FAST]",
      description: "Quick strategies to find and convert potential clients for web design services.",
      videoId: "OrIxvWCdkEc", // Updated YouTube video ID
      completed: initialVideosWatched.includes(2),
      duration: 300 // Example duration in seconds (will be updated when video loads)
    },
    {
      id: 3,
      title: "How to sell websites to local businesses (FULL BLUEPRINT)",
      description: "Complete guide on selling web services to local businesses and closing deals.",
      videoId: "14Drjuj-TGw", // Updated YouTube video ID
      completed: initialVideosWatched.includes(3),
      duration: 300 // Example duration in seconds (will be updated when video loads)
    }
  ];
  
  const [videos, setVideos] = useState<LearningVideo[]>(learningVideos);

  // Load quiz questions from JSON file and select 5 random questions
  useEffect(() => {
    const allQuestions = quizQuestionsData.questions;
    
    // Use all questions instead of just 5 random ones
    setQuizQuestions(allQuestions);
  }, []);

  // Load YouTube API
  useEffect(() => {
    // Create YouTube API script
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        setPlayerReady(true);
      };
    } else {
      setPlayerReady(true);
    }
    
    return () => {
      // Clear any running timers when component unmounts
      if (watchTimerRef.current) {
        clearInterval(watchTimerRef.current);
      }
    };
  }, []);

  // Initialize YouTube player when API is ready
  useEffect(() => {
    if (playerReady && !showQuiz && !quizPassed && currentVideo <= 3 && canAccessVideo(currentVideo)) {
      const videoElement = document.getElementById('youtube-player');
      
      if (videoElement) {
        playerRef.current = new window.YT.Player('youtube-player', {
          videoId: videos[currentVideo - 1].videoId,
          height: '400',
          width: '100%',
          playerVars: {
            'autoplay': 0,
            'controls': 1,
            'rel': 0,
            'modestbranding': 1,
            'disablekb': 1,
            'fs': 0 // Disable fullscreen
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }
    }
    
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [playerReady, currentVideo, showQuiz, quizPassed]);

  // Player event handlers
  const onPlayerReady = (event: PlayerEvent) => {
    // Get actual video duration
    const duration = event.target.getDuration();
    const updatedVideos = [...videos];
    updatedVideos[currentVideo - 1].duration = duration;
    setVideos(updatedVideos);
  };

  const onPlayerStateChange = (event: PlayerEvent) => {
    // YT.PlayerState.PLAYING = 1
    if (event.data === 1) {
      setIsVideoPlaying(true);
      
      // Start tracking watch time
      if (watchTimerRef.current) {
        clearInterval(watchTimerRef.current);
      }
      
      watchTimerRef.current = setInterval(() => {
        if (playerRef.current) {
          const currentTime = playerRef.current.getCurrentTime();
          const duration = playerRef.current.getDuration();
          const progress = (currentTime / duration) * 100;
          setVideoWatchProgress(progress);
          
          // If video is 95% complete, mark it as watched
          if (progress >= 95 && !videos[currentVideo - 1].completed) {
            markVideoAsCompleted(currentVideo);
            
            // Clear the interval
            if (watchTimerRef.current) {
              clearInterval(watchTimerRef.current);
            }
          }
        }
      }, 1000);
    } else {
      setIsVideoPlaying(false);
      
      // YT.PlayerState.PAUSED = 2
      if (event.data === 2) {
        // Clear interval when video is paused
        if (watchTimerRef.current) {
          clearInterval(watchTimerRef.current);
        }
      }
      
      // YT.PlayerState.ENDED = 0
      if (event.data === 0) {
        // Video ended, mark as completed
        if (!videos[currentVideo - 1].completed) {
          markVideoAsCompleted(currentVideo);
        }
        
        // Clear the interval
        if (watchTimerRef.current) {
          clearInterval(watchTimerRef.current);
        }
      }
    }
    
    // Detect if user tries to seek
    if (event.data === 3) { // YT.PlayerState.BUFFERING = 3
      // Get current time
      const currentTime = event.target.getCurrentTime();
      
      // If user tries to skip ahead (allow small buffer for normal playback)
      if (currentTime > videoWatchProgress * videos[currentVideo - 1].duration / 100 + 5) {
        // Reset to the last watched position
        event.target.seekTo(videoWatchProgress * videos[currentVideo - 1].duration / 100, true);
      }
    }
  };

  // Update training progress in the API
  const updateTrainingProgress = async (progress: number, quizStatus = false, meetingStatus = false, dashboardStatus = false, videoId?: number) => {
    try {
      setLoading(true);
      
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };
      
      const body = {
        trainingProgress: progress,
        quizPassed: quizStatus,
        meetingScheduled: meetingStatus,
        dashboardAccess: dashboardStatus,
        videoId
      };
      
      const res = await axios.put(`${API_URL}/training`, body, config);
      
      // Update local state with response data
      if (res.data.user) {
        setCurrentVideo(res.data.user.trainingProgress < 3 ? res.data.user.trainingProgress + 1 : 3);
        setQuizPassed(res.data.user.quizPassed);
        setMeetingScheduled(res.data.user.meetingScheduled);
        setDashboardAccess(res.data.user.dashboardAccess);
        
        // Update videos based on watched videos from API
        const updatedVideos = videos.map(video => ({
          ...video,
          completed: res.data.user.videosWatched.includes(video.id)
        }));
        setVideos(updatedVideos);
      }
      
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update progress');
    } finally {
      setLoading(false);
    }
  };

  // Check if user can access the next video
  const canAccessVideo = (videoId: number) => {
    if (videoId === 1) return true;
    return videos.find(v => v.id === videoId - 1)?.completed || false;
  };

  // Mark a video as completed
  const markVideoAsCompleted = async (videoId: number) => {
    if (videos[videoId - 1].completed) return;
    
    // Update progress in API
    await updateTrainingProgress(videoId, false, false, false, videoId);
    
    // If all videos are completed, show quiz
    if (videoId === 3) {
      setShowQuiz(true);
    } else {
      // Automatically move to next video after a short delay
      setTimeout(() => {
        setCurrentVideo(videoId + 1);
      }, 1500);
    }
  };

  // Handle quiz answer selection
  const handleAnswerSelect = (questionId: string, answer: string) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer
    });
  };

  // Submit quiz
  const submitQuiz = async () => {
    let correctAnswers = 0;
    
    quizQuestions.forEach(question => {
      if (quizAnswers[question.id] === question.answer) {
        correctAnswers++;
      }
    });
    
    // Pass if 80% or more correct (16 out of 20)
    const passed = correctAnswers >= 16;
    
    if (passed) {
      // Update quiz status
      await updateTrainingProgress(3, true);
      setQuizPassed(true);
      setShowQuiz(false);
    } else {
      // Failed quiz - reset training progress
      setQuizAnswers({});
      await updateTrainingProgress(0, false, false, false);
      
      // Reset videos watched
      const updatedVideos = videos.map(video => ({
        ...video,
        completed: false
      }));
      setVideos(updatedVideos);
      
      // Set current video back to 1
      setCurrentVideo(1);
      setShowQuiz(false);
      
      // Show error message
      setError(`You didn't pass the quiz. You got ${correctAnswers} out of ${quizQuestions.length} correct. Please watch all videos again and try again.`);
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  // Schedule meeting
  const scheduleMeeting = async () => {
    // Update meeting scheduled status
    await updateTrainingProgress(3, true, true);
    setMeetingScheduled(true);
  };

  // Redirect to dashboard when access granted
  useEffect(() => {
    if (dashboardAccess) {
      navigate('/dashboard');
    }
  }, [dashboardAccess, navigate]);

  // Scroll to top function
  const scrollToTop = () => {
    if (quizContainerRef.current) {
      quizContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f8f0]">
      {/* Header */}
      <header className="bg-gradient-to-r from-white via-[#f0f9f0] to-white backdrop-blur-md border-b border-[#e8f0e8]/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0a5c36] to-[#1c8a4e] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] bg-clip-text text-transparent">HuntEarn</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right mr-2">
                <p className="text-[#0a5c36] font-medium">Welcome,</p>
                <p className="text-[#2a7d4f] font-bold">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span>{error}</span>
          </div>
        )}
        
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0a5c36] mb-2">Hunter Training Program</h1>
          <p className="text-[#2a7d4f] max-w-2xl mx-auto">
            Complete this training program to gain access to your dashboard. Watch all three videos sequentially and pass the quiz to become a successful hunter.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between mb-2">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className={`flex flex-col items-center ${canAccessVideo(video.id) ? 'text-[#0a5c36]' : 'text-gray-400'}`}
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    video.completed 
                      ? 'bg-[#0a5c36] text-white' 
                      : currentVideo === video.id && canAccessVideo(video.id)
                        ? 'border-2 border-[#0a5c36] text-[#0a5c36]' 
                        : 'border-2 border-gray-300 text-gray-400'
                  }`}
                >
                  {video.completed ? <CheckCircle size={18} /> : <Play size={18} />}
                </div>
                <span className="text-xs mt-1">Video {video.id}</span>
              </div>
            ))}
            <div 
              className={`flex flex-col items-center ${showQuiz || quizPassed ? 'text-[#0a5c36]' : 'text-gray-400'}`}
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  quizPassed 
                    ? 'bg-[#0a5c36] text-white' 
                    : showQuiz 
                      ? 'border-2 border-[#0a5c36] text-[#0a5c36]' 
                      : 'border-2 border-gray-300 text-gray-400'
                }`}
              >
                {quizPassed ? <CheckCircle size={18} /> : "Q"}
              </div>
              <span className="text-xs mt-1">Quiz</span>
            </div>
          </div>
          <div className="w-full h-2 bg-[#e8f0e8] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] rounded-full transition-all duration-500" 
              style={{ width: `${(Math.max(1, videos.filter(v => v.completed).length) / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Video Content */}
        {!showQuiz && !quizPassed && currentVideo <= 3 && (
          <div className="bg-white rounded-2xl p-8 shadow-md border border-[#e8f0e8]">
            {!canAccessVideo(currentVideo) ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-[#ffb347] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#0a5c36] mb-2">
                  Complete Previous Video First
                </h2>
                <p className="text-[#2a7d4f] mb-6 max-w-md mx-auto">
                  You need to complete Video {currentVideo - 1} before you can access this video.
                </p>
                <button
                  onClick={() => setCurrentVideo(currentVideo - 1)}
                  className="px-6 py-3 bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white rounded-xl hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-200 shadow-md"
                >
                  Go to Previous Video
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-[#0a5c36] mb-2">
                  Video {currentVideo}: {videos[currentVideo - 1].title}
                </h2>
                <p className="text-[#2a7d4f] mb-6">
                  {videos[currentVideo - 1].description}
                </p>
                
                <div className="aspect-w-16 aspect-h-9 mb-8">
                  <div className="w-full rounded-xl overflow-hidden shadow-lg bg-black">
                    {/* YouTube player will be initialized here */}
                    <div id="youtube-player"></div>
                  </div>
                </div>
                
                {/* Video Progress Indicator */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-[#2a7d4f] mb-1">
                    <span>Progress: {Math.round(videoWatchProgress)}%</span>
                    <span>{videos[currentVideo - 1].completed ? 'Completed' : 'Watch the full video to continue'}</span>
                  </div>
                  <div className="w-full h-2 bg-[#e8f0e8] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] rounded-full transition-all duration-500" 
                      style={{ width: `${videoWatchProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Video Navigation */}
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() => setCurrentVideo(Math.max(1, currentVideo - 1))}
                    disabled={currentVideo === 1 || loading}
                    className={`px-4 py-2 rounded-xl ${currentVideo === 1 || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#e8f0e8] text-[#0a5c36] hover:bg-[#d9f0d9]'} transition-colors`}
                  >
                    Previous Video
                  </button>
                  
                  <button
                    onClick={() => setCurrentVideo(Math.min(3, currentVideo + 1))}
                    disabled={currentVideo === 3 || !videos[currentVideo - 1].completed || loading}
                    className={`px-4 py-2 rounded-xl ${currentVideo === 3 || !videos[currentVideo - 1].completed || loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#e8f0e8] text-[#0a5c36] hover:bg-[#d9f0d9]'} transition-colors`}
                  >
                    Next Video
                  </button>
                </div>
                
                {/* Take Quiz Button */}
                {videos.every(v => v.completed) && !showQuiz && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="px-6 py-3 bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white rounded-xl hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-200 shadow-md"
                    >
                      Take Quiz
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Quiz Section */}
        {showQuiz && !quizPassed && (
          <div ref={quizContainerRef} className="bg-white rounded-2xl p-8 shadow-md border border-[#e8f0e8]">
            <h2 className="text-2xl font-bold text-[#0a5c36] mb-6">Final Assessment Quiz</h2>
            <p className="text-[#2a7d4f] mb-8">
              Answer at least 16 out of 20 questions correctly (80%) to pass the quiz and schedule your onboarding call. You can submit the quiz at any time, but if you don't pass, you'll need to watch all videos again.
            </p>
            
            <div className="mb-6 bg-[#f0f9f0] p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#0a5c36]">Total Questions: {quizQuestions.length}</span>
                <span className="font-medium text-[#0a5c36]">Answered: {Object.keys(quizAnswers).length}/{quizQuestions.length}</span>
              </div>
              <div className="w-full h-2 bg-white rounded-full mt-2 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] rounded-full transition-all duration-500" 
                  style={{ width: `${(Object.keys(quizAnswers).length / quizQuestions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="space-y-8">
              {quizQuestions.map((q, index) => (
                <div key={q.id} className="border-b border-[#e8f0e8] pb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium text-[#0a5c36]">
                      {index + 1}. {q.question}
                    </h3>
                    {quizAnswers[q.id] ? (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Answered
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full flex items-center">
                        Not Answered
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {q.options.map((option) => (
                      <label key={option} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name={q.id}
                          value={option}
                          checked={quizAnswers[q.id] === option}
                          onChange={() => handleAnswerSelect(q.id, option)}
                          className="w-4 h-4 text-[#0a5c36] border-[#e8f0e8] focus:ring-[#0a5c36]/50"
                        />
                        <span className="text-[#2a7d4f]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <button
                onClick={scrollToTop}
                className="px-4 py-2 bg-[#f0f9f0] text-[#0a5c36] rounded-xl hover:bg-[#d9f0d9] transition-colors flex items-center"
              >
                <ArrowUp className="w-4 h-4 mr-1" />
                Back to Top
              </button>
              
              <button
                onClick={submitQuiz}
                disabled={Object.keys(quizAnswers).length === 0 || loading}
                className={`px-6 py-3 rounded-xl shadow-md flex items-center ${
                  Object.keys(quizAnswers).length === 0 || loading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-200'
                }`}
              >
                {loading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                )}
                Submit Quiz
              </button>
            </div>
          </div>
        )}

        {/* Schedule Meeting Section */}
        {quizPassed && !meetingScheduled && (
          <div className="bg-white rounded-2xl p-8 shadow-md border border-[#e8f0e8] text-center">
            <div className="w-20 h-20 bg-[#0a5c36]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-[#0a5c36]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0a5c36] mb-2">Congratulations! You Passed the Quiz</h2>
            <p className="text-[#2a7d4f] max-w-md mx-auto mb-6">
              You've successfully completed the training program! Your information has been sent to our admin team who will schedule a 1-on-1 interview with you.
            </p>
            <button 
              onClick={scheduleMeeting}
              disabled={loading}
              className={`px-6 py-3 bg-gradient-to-r from-[#0a5c36] to-[#1c8a4e] text-white rounded-xl hover:from-[#084a2b] hover:to-[#1a7a46] transition-all duration-200 shadow-md flex items-center justify-center mx-auto ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              ) : (
                <Calendar className="w-5 h-5 inline mr-2" />
              )}
              Submit Training Completion
            </button>
          </div>
        )}

        {/* Waiting for Approval */}
        {meetingScheduled && !dashboardAccess && (
          <div className="bg-white rounded-2xl p-8 shadow-md border border-[#e8f0e8] text-center">
            <div className="w-20 h-20 bg-[#ffb347]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-[#ffb347]" />
            </div>
            <h2 className="text-2xl font-bold text-[#0a5c36] mb-2">Training Completed!</h2>
            <p className="text-[#2a7d4f] max-w-md mx-auto mb-6">
              Your training completion has been recorded. Our admin team will review your profile and schedule a 1-on-1 interview with you. After successfully completing the interview, you'll get full access to your hunter dashboard.
            </p>
            <div className="flex items-center justify-center space-x-2 text-[#0a5c36]">
              <div className="w-4 h-4 border-2 border-[#0a5c36] border-t-transparent rounded-full animate-spin"></div>
              <span>Waiting for admin to schedule interview...</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PreDashboardAccess; 