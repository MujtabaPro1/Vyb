import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft } from 'lucide-react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword } = useAuth();

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Forgot password request failed:', error);
      setError('Failed to process your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <Link to="/login" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to login
      </Link>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Forgot Password</h2>
        <p className="text-muted-foreground mt-2">
          Enter your email and we'll send you a link to reset your password
        </p>
      </div>
      
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-success/10 border border-success/30 text-success p-4 rounded-lg"
        >
          <h3 className="font-medium text-lg mb-2">Check your email</h3>
          <p>
            We've sent a password reset link to <strong>{email}</strong>.
            Please check your inbox and follow the instructions.
          </p>
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
              className="mr-2"
            >
              Try another email
            </Button>
            <Link to="/login">
              <Button>Return to login</Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={error}
              className="pl-10"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
          </div>
          
          <Button 
            type="submit" 
            className="w-full py-2" 
            isLoading={isLoading}
          >
            Send Reset Link
          </Button>
        </form>
      )}
    </motion.div>
  );
}