"use client"

import React, { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Heart, Rocket, GraduationCap, Briefcase } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"

export default function ThankYouPage() {
  const [confettiKey, setConfettiKey] = useState(0)

  const triggerConfetti = useCallback(() => {
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }))
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }))
    }, 250)

    // Reset confetti key after animation
    setTimeout(() => {
      setConfettiKey(prevKey => prevKey + 1)
    }, duration)
  }, [])

  const handleCelebrateClick = () => {
    triggerConfetti()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-500 to-green-500 flex flex-col items-center justify-center p-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          100 Days of Web Development
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          A Journey of Growth and Achievement
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <ThankYouCard
          icon={<Heart className="w-8 h-8 text-red-500" />}
          title="Gratitude"
          content="A huge thank you to all my teachers of Apna collage, especially Shradha Khapra Ma'am, for their invaluable guidance and support."
        />
        <ThankYouCard
          icon={<GraduationCap className="w-8 h-8 text-blue-500" />}
          title="Learning Platform"
          content="Thank you Apna Collage , a platform where anyone can learn web development from scratch to advanced levels."
        />
        <ThankYouCard
          icon={<Rocket className="w-8 h-8 text-yellow-500" />}
          title="Consistency & Focus"
          content="This challenge taught me the importance of consistency, continuous learning, and maintaining focus."
        />
        <ThankYouCard
          icon={<Briefcase className="w-8 h-8 text-green-500" />}
          title="Career Success"
          content="I'm thrilled to have secured a paid internship during this challenge, marking the beginning of my professional journey."
        />
      </motion.div>

      <motion.div
        className="mt-12"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="secondary" 
          size="lg" 
          onClick={handleCelebrateClick}
          className="font-bold text-lg shadow-lg"
        >
          Celebrate! <Sparkles className="ml-2 h-5 w-5" />
        </Button>
      </motion.div>

      <motion.p
        className="mt-8 text-lg opacity-75"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        Thank you to everyone who supported me on this incredible journey. Here's to achieving even greater things in the future!
      </motion.p>

      <AnimatePresence>
        {confettiKey > 0 && (
          <motion.div
            key={confettiKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function ThankYouCard({ icon, title, content }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            {icon}
            <span className="ml-3">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{content}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
