
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface VoiceControlProps {
  onSpeechResult: (text: string) => void;
  disabled?: boolean;
}

const VoiceControl = ({ onSpeechResult, disabled = false }: VoiceControlProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [isVoiceSupported, setIsVoiceSupported] = useState(true);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    // Check browser support for speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      // Clear any existing recognition instance
      if (recognition) {
        recognition.abort();
      }
      
      const SpeechRecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognitionClass();
      
      // Configure speech recognition
      recognitionInstance.continuous = true; // Changed to true to keep listening
      recognitionInstance.interimResults = true; // Get interim results
      recognitionInstance.lang = 'en-US';
      
      // Handle successful recognition results
      recognitionInstance.onresult = (event) => {
        const last = event.results.length - 1;
        const transcript = event.results[last][0].transcript;
        console.log('Speech recognition result:', transcript);
        
        // Only send final results to prevent duplicates
        if (event.results[last].isFinal) {
          console.log('Final speech result:', transcript);
          onSpeechResult(transcript);
          
          // Stop listening after getting a result
          recognitionInstance.stop();
          setIsListening(false);
        }
      };
      
      // Handle recognition errors
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        
        // Only show error toast for non-aborted errors or critical failures
        // "aborted" errors are common during normal usage and shouldn't display error messages
        if (event.error !== "aborted") {
          let errorMessage = "Please try again.";
          
          if (event.error === "not-allowed") {
            errorMessage = "Microphone access denied. Please check your browser permissions.";
            setIsVoiceSupported(false);
            toast({
              title: "Voice Recognition Error",
              description: errorMessage,
              variant: "destructive",
            });
          } else if (event.error === "network") {
            errorMessage = "Network error. Please check your connection.";
            toast({
              title: "Voice Recognition Error",
              description: errorMessage,
              variant: "destructive",
            });
          }
        }
        
        setIsListening(false);
      };
      
      // Handle recognition end
      recognitionInstance.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };
      
      setRecognition(recognitionInstance);
    } else {
      // If speech recognition is not supported
      setIsVoiceSupported(false);
      toast({
        title: "Feature Not Available",
        description: "Speech recognition is not supported in your browser.",
        variant: "destructive",
      });
    }
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      setSynthesis(window.speechSynthesis);
    }
    
    // Cleanup function
    return () => {
      // Stop recognition and synthesis when component unmounts
      if (recognition) {
        recognition.abort();
      }
      if (synthesis) {
        synthesis.cancel();
      }
    };
  }, []); // Removed onSpeechResult from dependency array to prevent recreating recognition instance

  const toggleListening = () => {
    if (!recognition || disabled || !isVoiceSupported) return;
    
    // If already listening, stop it
    if (isListening) {
      recognition.abort();
      setIsListening(false);
    } else {
      // Start listening with error handling
      try {
        recognition.abort(); // First abort any existing session
        setTimeout(() => { // Small delay to ensure abort completes
          try {
            setIsListening(true);
            recognition.start();
            console.log('Speech recognition started');
            toast({
              title: "Listening",
              description: "Speak now...",
              duration: 2000,
            });
          } catch (error) {
            console.error('Failed to start speech recognition:', error);
            setIsListening(false);
            toast({
              title: "Voice Recognition Error",
              description: "Failed to start voice recognition. Please try again later.",
              variant: "destructive",
            });
          }
        }, 100);
      } catch (error) {
        console.error('Error preparing speech recognition:', error);
        setIsListening(false);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (synthesis) {
      if (!isMuted) {
        // Muting - cancel any ongoing speech
        synthesis.cancel();
      }
    }
  };

  // If voice is not supported, show a disabled button with tooltip
  if (!isVoiceSupported) {
    return (
      <div className="flex space-x-2">
        <Button
          type="button"
          disabled={true}
          className="bg-gray-400 rounded-full w-10 h-10 p-0 flex items-center justify-center"
          title="Voice recognition not available"
        >
          <MicOff size={18} />
        </Button>
        
        <Button
          type="button"
          onClick={toggleMute}
          className={`${
            isMuted ? "bg-gray-400 hover:bg-gray-500" : "bg-finance-primary hover:bg-finance-accent"
          } rounded-full w-10 h-10 p-0 flex items-center justify-center`}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      <Button
        type="button"
        onClick={toggleListening}
        disabled={disabled}
        className={`${
          isListening ? "bg-red-500 hover:bg-red-600" : "bg-finance-primary hover:bg-finance-accent"
        } rounded-full w-10 h-10 p-0 flex items-center justify-center`}
        title={isListening ? "Stop listening" : "Start voice input"}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </Button>
      
      <Button
        type="button"
        onClick={toggleMute}
        className={`${
          isMuted ? "bg-gray-400 hover:bg-gray-500" : "bg-finance-primary hover:bg-finance-accent"
        } rounded-full w-10 h-10 p-0 flex items-center justify-center`}
        title={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </Button>
    </div>
  );
};

export default VoiceControl;