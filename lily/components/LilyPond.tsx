'use client'

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const WaterTexture: React.FC = () => (
  <div 
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      backgroundSize: '80px 80px'
    }}
  />
);

const EnhancedWaterRipple: React.FC = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-4 border-teal-300 rounded-full opacity-0"
          animate={{
            scale: [1, 2],
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

interface LilyPadProps {
  x: string;
  y: string;
  size: number;
  rotation: number;
  mousePosition: { x: number; y: number };
}

const LilyPad: React.FC<LilyPadProps> = ({ x, y, size, rotation, mousePosition }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: (mousePosition.x - window.innerWidth / 2) / 50,
      y: (mousePosition.y - window.innerHeight / 2) / 50,
      transition: { type: 'spring', stiffness: 50, damping: 30 }
    });
  }, [mousePosition, controls]);

  return (
    <motion.div className="absolute" style={{ left: x, top: y }} animate={controls}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: `rotate(${rotation}deg)` }}>
        <defs>
          <radialGradient id="lilyPadGradient" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
            <stop offset="0%" stopColor="#3ead92" />
            <stop offset="60%" stopColor="#2d9f83" />
            <stop offset="100%" stopColor="#1e7a64" />
          </radialGradient>
          <filter id="lilyPadShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="0" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M100,10 C130,10 190,40 195,100 C200,160 160,190 100,190 C40,190 0,160 5,100 C10,40 70,10 100,10 Z"
          fill="url(#lilyPadGradient)"
          filter="url(#lilyPadShadow)"
        />
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d={`M100,100 L${100 + 95 * Math.cos(i * Math.PI / 6)},${100 + 95 * Math.sin(i * Math.PI / 6)}`}
            stroke="#2d9f83"
            strokeWidth="0.5"
            opacity="0.6"
          />
        ))}
        <circle cx="100" cy="100" r="10" fill="#2d9f83" opacity="0.6" />
        {[...Array(20)].map((_, i) => (
          <circle
            key={i}
            cx={100 + 80 * Math.cos(i * Math.PI / 10)}
            cy={100 + 80 * Math.sin(i * Math.PI / 10)}
            r="2"
            fill="#1e7a64"
            opacity="0.4"
          />
        ))}
      </svg>
    </motion.div>
  );
};

interface LilyProps {
  x: string;
  y: string;
  size: number;
  rotation: number;
  mousePosition: { x: number; y: number };
}

const Lily: React.FC<LilyProps> = ({ x, y, size, rotation, mousePosition }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: (mousePosition.x - window.innerWidth / 2) / 30,
      y: (mousePosition.y - window.innerHeight / 2) / 30,
      transition: { type: 'spring', stiffness: 100, damping: 30 }
    });
  }, [mousePosition, controls]);

  return (
    <motion.div className="absolute" style={{ left: x, top: y }} animate={controls}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ transform: `rotate(${rotation}deg)` }}>
        <defs>
          <radialGradient id="petalGradient" cx="50%" cy="50%" r="50%" fx="25%" fy="25%">
            <stop offset="0%" stopColor="#fff" />
            <stop offset="60%" stopColor="#fff0f5" />
            <stop offset="100%" stopColor="#ffc0cb" />
          </radialGradient>
          <filter id="lilyShadow">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[...Array(24)].map((_, i) => (
          <g key={i} filter="url(#lilyShadow)">
            <path
              d={`M100,100 C${100 + 20 * Math.cos(i * Math.PI / 12)},${100 + 20 * Math.sin(i * Math.PI / 12)} ${100 + 80 * Math.cos(i * Math.PI / 12)},${100 + 80 * Math.sin(i * Math.PI / 12)} ${100 + 90 * Math.cos((i + 0.5) * Math.PI / 12)},${100 + 90 * Math.sin((i + 0.5) * Math.PI / 12)} C${100 + 80 * Math.cos((i + 1) * Math.PI / 12)},${100 + 80 * Math.sin((i + 1) * Math.PI / 12)} ${100 + 20 * Math.cos((i + 1) * Math.PI / 12)},${100 + 20 * Math.sin((i + 1) * Math.PI / 12)} 100,100`}
              fill="url(#petalGradient)"
            />
          </g>
        ))}
        <circle cx="100" cy="100" r="22" fill="#ffff00" />
        {[...Array(36)].map((_, i) => (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + 20 * Math.cos(i * Math.PI / 18)}
            y2={100 + 20 * Math.sin(i * Math.PI / 18)}
            stroke="#ffd700"
            strokeWidth="1.5"
          />
        ))}
      </svg>
    </motion.div>
  );
};

interface DetailedDragonflyProps {
  x: string;
  y: string;
}

const DetailedDragonfly: React.FC<DetailedDragonflyProps> = ({ x, y }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: [0, 10, -10, 0],
      y: [0, -5, 5, 0],
      rotateY: [0, 0, 180, 180, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    });
  }, [controls]);

  return (
    <motion.div className="absolute" style={{ left: x, top: y }} animate={controls}>
      <svg width="80" height="80" viewBox="0 0 100 100">
        <g id="body" fill="#4A5568">
          <ellipse cx="50" cy="50" rx="30" ry="5" />
          <circle cx="50" cy="45" r="8" />
          <circle cx="50" cy="35" r="6" />
        </g>
        <g id="eyes" fill="#000">
          <circle cx="48" cy="32" r="2" />
          <circle cx="52" cy="32" r="2" />
        </g>
        <g id="wings" fill="#88CCEE" fillOpacity="0.6" stroke="#4A5568" strokeWidth="0.5">
          <path d="M50,45 Q70,25 90,45 Q70,65 50,45" />
          <path d="M50,45 Q30,25 10,45 Q30,65 50,45" />
          <path d="M50,55 Q70,75 90,55 Q70,35 50,55" />
          <path d="M50,55 Q30,75 10,55 Q30,35 50,55" />
        </g>
        <g id="legs" stroke="#4A5568" strokeWidth="1">
          <path d="M45,50 Q40,55 35,53" />
          <path d="M55,50 Q60,55 65,53" />
          <path d="M45,52 Q40,57 35,55" />
          <path d="M55,52 Q60,57 65,55" />
          <path d="M45,54 Q40,59 35,57" />
          <path d="M55,54 Q60,59 65,57" />
        </g>
      </svg>
    </motion.div>
  );
};

const Reed: React.FC<{ x: string; y: string; height: number }> = ({ x, y, height }) => {
  return (
    <svg className="absolute" style={{ left: x, top: y }} width="30" height={height} viewBox={`0 0 30 ${height}`}>
      <motion.path
        d={`M15,${height} C20,${height * 0.8} 25,${height * 0.6} 15,0`}
        stroke="#2F4F4F"
        strokeWidth="2"
        fill="none"
        animate={{
          d: [
            `M15,${height} C20,${height * 0.8} 25,${height * 0.6} 15,0`,
            `M15,${height} C10,${height * 0.8} 5,${height * 0.6} 15,0`,
            `M15,${height} C20,${height * 0.8} 25,${height * 0.6} 15,0`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </svg>
  );
};

const Butterfly: React.FC<{ x: string; y: string; size: number; color: string }> = ({ x, y, size, color }) => {
  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y }}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <g id="butterfly">
          <motion.path
            d="M50,30 Q60,10 70,30 T50,50 T30,30 T50,30"
            fill={color}
            animate={{
              d: [
                "M50,30 Q60,10 70,30 T50,50 T30,30 T50,30",
                "M50,30 Q60,20 70,30 T50,50 T30,30 T50,30",
                "M50,30 Q60,10 70,30 T50,50 T30,30 T50,30",
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.path
            d="M50,30 Q60,50 70,70 T50,50 T30,70 T50,30"
            fill={color}
            animate={{
              d: [
                "M50,30 Q60,50 70,70 T50,50 T30,70 T50,30",
                "M50,30 Q60,60 70,70 T50,50 T30,70 T50,30",
              ],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <circle cx="50" cy="30" r="3" fill="#000" />
          <path d="M50,30 L50,40" stroke="#000" strokeWidth="2" />
        </g>
      </svg>
    </motion.div>
  );
};

const PersonalMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="absolute top-4 left-4 bg-white bg-opacity-70 p-4 rounded-lg shadow-lg"
    >
      <p className="text-2xl font-semibold text-teal-800">{message}</p>
    </motion.div>
  );
};

interface LilyPondProps {
  personalMessage: string;
}

const LilyPond: React.FC<LilyPondProps> = ({ personalMessage }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-teal-800 to-teal-950">
      <WaterTexture />
      <EnhancedWaterRipple />
      <PersonalMessage message={personalMessage} />
      <LilyPad x="5%" y="15%" size={220} rotation={15} mousePosition={mousePosition} />
      <LilyPad x="30%" y="60%" size={180} rotation={-20} mousePosition={mousePosition} />
      <LilyPad x="60%" y="25%" size={200} rotation={45} mousePosition={mousePosition} />
      <LilyPad x="80%" y="70%" size={160} rotation={-10} mousePosition={mousePosition} />
      <Lily x="10%" y="20%" size={110} rotation={30} mousePosition={mousePosition} />
      <Lily x="35%" y="65%" size={100} rotation={-15} mousePosition={mousePosition} />
      <Lily x="65%" y="30%" size={120} rotation={60} mousePosition={mousePosition} />
      <Lily x="85%" y="75%" size={90} rotation={-5} mousePosition={mousePosition} />
      <Lily x="25%" y="40%" size={95} rotation={20} mousePosition={mousePosition} />
      <Lily x="50%" y="15%" size={105} rotation={-25} mousePosition={mousePosition} />
      <Lily x="75%" y="45%" size={115} rotation={40} mousePosition={mousePosition} />
      <Lily x="15%" y="70%" size={85} rotation={-10} mousePosition={mousePosition} />
      <Lily x="45%" y="85%" size={100} rotation={15} mousePosition={mousePosition} />
      <Lily x="90%" y="10%" size={90} rotation={-30} mousePosition={mousePosition} />
      <DetailedDragonfly x="30%" y="35%" />
      <DetailedDragonfly x="80%" y="60%" />
      <Butterfly x="20%" y="25%" size={40} color="#FFB3BA" />
      <Butterfly x="70%" y="40%" size={30} color="#BAFFC9" />
      <Butterfly x="40%" y="75%" size={35} color="#BAE1FF" />
      <Reed x="2%" y="10%" height={150} />
      <Reed x="5%" y="20%" height={180} />
      <Reed x="95%" y="15%" height={160} />
      <Reed x="98%" y="25%" height={140} />
      <Reed x="1%" y="70%" height={170} />
      <Reed x="97%" y="75%" height={190} />
    </div>
  );
};

export default LilyPond;

