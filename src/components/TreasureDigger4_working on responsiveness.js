import React, { useState, useEffect, useRef } from 'react';
import gameboyLarge from '../images/gameboy-large.png';
import gameboySmall from '../images/gameboy-small.png';
import cdromLarge from '../images/cdrom-large.png';
import cdromSmall from '../images/cdrom-small.png';
import usbLarge from '../images/usb-large.png';
import usbSmall from '../images/usb-small.png';
import braceletLarge from '../images/bracelet-large.png';
import braceletSmall from '../images/bracelet-small.png';

// TreasureCard Component
const TreasureCard = ({ treasure, isFound }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getTreasureImage = (treasureName, isLarge = false) => {
    switch(treasureName) {
      case 'GameBoy':
        return isLarge ? gameboyLarge : gameboySmall;
      case 'CD-ROM':
        return isLarge ? cdromLarge : cdromSmall;
      case 'USB Drive':
        return isLarge ? usbLarge : usbSmall;
      case 'Friendship Bracelet':
        return isLarge ? braceletLarge : braceletSmall;
      default:
        return `/api/placeholder/${isLarge ? '300' : '64'}/64`;
    }
  };

  const getArchaeologicalDescription = (treasureName) => {
    switch(treasureName) {
      case 'GameBoy':
        return {
          period: '1989-2000 לספירה',
          description: 'מכשיר פנאי נייד מוקדם שנמצא בשכבה טכנולוגית מהתקופה הדיגיטלית המוקדמת. הממצא מעיד על התפתחות הבידור הנייד והמשחקים האלקטרוניים. סימני שימוש מעידים על פופולריות רבה בקרב בני הנוער של התקופה.'
        };
      case 'CD-ROM':
        return {
          period: '1995-2010 לספירה',
          description: 'אמצעי אחסון מידע עתיק המשקף את תחילת עידן המידע הדיגיטלי. השתקפויות הקשת בגוון מתכתי מעידות על טכנולוגיית לייזר מתקדמת לתקופתה. נמצא במצב השתמרות מצוין.'
        };
      case 'USB Drive':
        return {
          period: '2010-2020 לספירה',
          description: 'התקן אחסון נייד קטן המייצג את המעבר לניידות דיגיטלית מלאה. הצבעים האדום-שחור אופייניים למותג SanDisk מהתקופה. מהווה עדות לצורך הגובר בניוד מידע אישי.'
        };
      case 'Friendship Bracelet':
        return {
          period: '2020-2023 לספירה',
          description: 'צמיד ידידות עשוי חרוזים צבעוניים עם הכיתוב 17 וזוג לבבות. משקף מנהגים חברתיים ואופנה של צעירי התקופה. מצב השתמרות: מצוין, צבעים שמורים היטב.'
        };
      default:
        return { period: '', description: '' };
    }
  };

  const handleClick = () => {
    if (isFound) {
      setIsFocused(true);
    }
  };

  const handleClose = () => {
    setIsFlipped(false);
    setIsFocused(false);
  };

  return (
    <>
      <div
        className={`absolute transition-all duration-500 ease-in-out select-none z-(-10)
          ${isFound ? 'opacity-100 cursor-pointer pointer-events-auto' : 'opacity-0 pointer-events-none'}
          ${isFocused ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: treasure.x,
          top: treasure.y,
          width: treasure.width,
          height: treasure.height,
          transform: `perspective(1000px) rotateY(${isFlipped ? '180deg' : '0deg'})`,
          transformStyle: 'preserve-3d',
          userSelect: 'none'
        }}
        onClick={handleClick}
      >
        <div className="absolute w-full h-full bg-transparent rounded-lg border-2 border-transparent overflow-hidden"
             style={{ backfaceVisibility: 'hidden' }}>
          <img
            src={getTreasureImage(treasure.name)}
            alt={treasure.name}
            className="w-full h-full object-contain p-2 select-none transition-opacity duration-300"
            draggable="false"
          />
        </div>
      </div>

      {isFocused && (
        <div className="fixed inset-0 flex items-center justify-center z-50 select-none" dir="rtl">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <div className="relative w-96 h-96 transition-transform duration-1000"
               style={{
                 transform: `perspective(2000px) rotateY(${isFlipped ? '180deg' : '0deg'})`,
                 transformStyle: 'preserve-3d'
               }}>
            <div 
              className="absolute w-full h-full bg-amber-100 rounded-xl shadow-2xl border-4 border-amber-600 p-6 overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
              onClick={() => setIsFlipped(true)}
            >
              <img
                src={getTreasureImage(treasure.name, true)}
                alt={treasure.name}
                className="w-full h-full object-contain select-none"
                draggable="false"
              />
            </div>

            <div 
              className="absolute w-full h-full bg-amber-100 rounded-xl shadow-2xl border-4 border-amber-600 p-6 text-right"
              style={{ 
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
              onClick={() => setIsFlipped(false)}
            >
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900 mb-4">{treasure.name}</h2>
                  <p className="text-lg text-amber-800 mb-2">תקופה: {getArchaeologicalDescription(treasure.name).period}</p>
                  <p className="text-amber-700 leading-relaxed">{getArchaeologicalDescription(treasure.name).description}</p>
                </div>
                <button 
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                  onClick={handleClose}
                >
                  חזרה לאתר החפירות
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Main TreasureDigger Component
const TreasureDigger = () => {
  const [cubes, setCubes] = useState([]);
  const [bottomCubes, setBottomCubes] = useState([]);
  const [treasures, setTreasures] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef();
  const lastTimeRef = useRef(Date.now());
  
  const FRICTION = 0.95;
  const CUBE_SIZE = 'calc(100% / 12)'; // Dividing container into 20 columns
  const BOTTOM_CUBE_SIZE = 'calc(100% / 15)'; // More columns for bottom layer
  const TREASURE_SIZE = 'calc(100% / 6)'; // Treasures are twice the size of cubes

  useEffect(() => {
    initializeGame();
    startPhysicsLoop();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const initializeGame = () => {
    const initialCubes = [];
    const initialBottomCubes = []; // New array for bottom layer
    const initialTreasures = [];
    
    const treasureItems = [
      { name: 'GameBoy', year: '1989', description: 'An ancient handheld gaming device' },
      { name: 'CD-ROM', year: '1995', description: 'A primitive data storage disk' },
      { name: 'USB Drive', year: '2010', description: 'Early personal data carrier' },
      { name: 'Friendship Bracelet', year: '2020', description: 'Ancient social bond symbol' }
    ];

    const containerWidth = 100; // Using percentages now
    const containerHeight = 100;
    const padding = 10; // 10% padding from edges

    treasureItems.forEach((item, index) => {
      const paddingPercent = 15;
      const treasureSizePercent = 16;
      const x = paddingPercent + Math.random() * (100 - 2 * paddingPercent - treasureSizePercent);
      const y = paddingPercent + Math.random() * (100 - 2 * paddingPercent - treasureSizePercent);
      
      initialTreasures.push({
        ...item,
        id: `treasure-${index}`,
        x,
        y,
        width: TREASURE_SIZE,
        height: TREASURE_SIZE,
        found: false
      });
    });

    const ROWS = 12;
    const COLS = 12;
    
    for (let i = 0; i < ROWS * COLS; i++) {
      const row = Math.floor(i / COLS);
      const col = i % COLS;
      
      initialCubes.push({
        id: `cube-${i}`,
        x: `${(col * 100 / COLS)}%`,
        y: `${(row * 100 / ROWS)}%`,
        velocityX: 0,
        velocityY: 0,
        rotation: Math.random() * 30 - 15,
        revealed: false
      });
    }
      // Create bottom layer (smaller blue cubes)
      const BOTTOM_ROWS = 15; // More cubes since they're smaller
      const BOTTOM_COLS = 15;

      for (let i = 0; i < BOTTOM_ROWS * BOTTOM_COLS; i++) {
        const row = Math.floor(i / BOTTOM_COLS);
        const col = i % BOTTOM_COLS;
        
        initialBottomCubes.push({
          id: `bottom-cube-${i}`,
          x: `${(col * 100 / COLS)}%`,
          y: `${(row * 100 / ROWS)}%`,
          velocityX: 0,
          velocityY: 0,
          rotation: Math.random() * 30 - 15,
          revealed: false
        });
      }
    
    setCubes(initialCubes);
    setBottomCubes(initialBottomCubes);
    setTreasures(initialTreasures);
  };

  const updatePhysics = () => {
    const currentTime = Date.now();
    const deltaTime = (currentTime - lastTimeRef.current) / 1000;
    lastTimeRef.current = currentTime;

    // Update top layer physics
  setCubes(prevCubes => 
    prevCubes.map(cube => {
      const newX = cube.x + (cube.velocityX * deltaTime * 60);
      const newY = cube.y + (cube.velocityY * deltaTime * 60);
      const newVelocityX = cube.velocityX * FRICTION;
      const newVelocityY = cube.velocityY * FRICTION;
      const isMoving = Math.abs(newVelocityX) > 0.01 || Math.abs(newVelocityY) > 0.01;

      return {
        ...cube,
        x: newX,
        y: newY,
        velocityX: isMoving ? newVelocityX : 0,
        velocityY: isMoving ? newVelocityY : 0
      };
    })
  );

  // Update bottom layer physics
  setBottomCubes(prevBottomCubes => 
    prevBottomCubes.map(cube => {
      const newX = cube.x + (cube.velocityX * deltaTime * 60);
      const newY = cube.y + (cube.velocityY * deltaTime * 60);
      const newVelocityX = cube.velocityX * FRICTION;
      const newVelocityY = cube.velocityY * FRICTION;
      const isMoving = Math.abs(newVelocityX) > 0.01 || Math.abs(newVelocityY) > 0.01;

      return {
        ...cube,
        x: newX,
        y: newY,
        velocityX: isMoving ? newVelocityX : 0,
        velocityY: isMoving ? newVelocityY : 0
      };
    })
  );

    checkTreasureReveal();
    animationFrameRef.current = requestAnimationFrame(updatePhysics);
  };

  const startPhysicsLoop = () => {
    lastTimeRef.current = Date.now();
    animationFrameRef.current = requestAnimationFrame(updatePhysics);
  };

// Update checkTreasureReveal to consider both layers
const checkTreasureReveal = () => {
  setTreasures(prevTreasures =>
    prevTreasures.map(treasure => {
      const overlappingTopCubes = cubes.filter(cube => 
        cube.revealed && 
        cube.x >= treasure.x && 
        cube.x <= treasure.x + treasure.width &&
        cube.y >= treasure.y && 
        cube.y <= treasure.y + treasure.height
      ).length;

      const overlappingBottomCubes = bottomCubes.filter(cube => 
        cube.revealed && 
        cube.x >= treasure.x && 
        cube.x <= treasure.x + treasure.width &&
        cube.y >= treasure.y && 
        cube.y <= treasure.y + treasure.height
      ).length;

      return {
        ...treasure,
        found: overlappingTopCubes < 2 && overlappingBottomCubes < 2
      };
    })
  );
};

  const handleStartDrag = (clientX, clientY) => {
    setIsDragging(true);
    setStartPoint({ x: clientX, y: clientY });
  };

  const handleDrag = (clientX, clientY) => {
    if (!isDragging) return;
    
    const rect = document.querySelector('.game-container').getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    const deltaX = x - startPoint.x;
    const deltaY = y - startPoint.y;

    // Update top layer (cyan cubes)
    setCubes(prevCubes => 
      prevCubes.map(cube => {
        const cubeX = parseFloat(cube.x);
        const cubeY = parseFloat(cube.y);
        const distance = Math.sqrt(
          Math.pow(x - cube.x, 2) + 
          Math.pow(y - cube.y, 2)
        );
        
        if (distance < 20) {
          const influence = 1 - (distance / 20);
          const moveSpeed = 0.1;
          
          return {
            ...cube,
            x: `${cubeX + (deltaX * moveSpeed * influence)}%`,
            y: `${cubeY + (deltaY * moveSpeed * influence)}%`,
            velocityX: deltaX * moveSpeed * influence,
            velocityY: deltaY * moveSpeed * influence,
            revealed: true,
            rotation: cube.rotation + (deltaX * 0.1)
          };
        }
        return cube;
      })
    );

    // Update bottom layer (blue cubes)
    setBottomCubes(prevBottomCubes => 
      prevBottomCubes.map(cube => {
        const rect = document.querySelector('.game-container').getBoundingClientRect();
        const cubeXPercent = (cube.x / rect.width) * 100;
        const cubeYPercent = (cube.y / rect.height) * 100;
        const distance = Math.sqrt(
          Math.pow(x - cubeXPercent, 2) + 
          Math.pow(y - cubeYPercent, 2)
    );

        const influenceRadius = 15;
        
        if (distance < influenceRadius) {  // Changed from distancePercent to distance
          const influence = 1 - (distance / influenceRadius);
          const moveSpeed = 0.05;
          
          // Only apply physics if the cubes above are revealed
          const cubesAbove = cubes.filter(topCube => {
            const topCubeXPercent = (topCube.x / rect.width) * 100;
            const topCubeYPercent = (topCube.y / rect.height) * 100;
            const cubeOverlapThreshold = parseFloat(CUBE_SIZE);

            return Math.abs(topCubeXPercent - cubeXPercent) < cubeOverlapThreshold &&
                  Math.abs(topCubeYPercent - cubeYPercent) < cubeOverlapThreshold;
      });
          
          const shouldMove = cubesAbove.some(topCube => topCube.revealed);
          
          if (shouldMove) {
            return {
              ...cube,
              // Store positions as percentages
              x: `${cubeXPercent + (deltaX * moveSpeed * influence)}%`,
              y: `${cubeYPercent + (deltaY * moveSpeed * influence)}%`,
              velocityX: deltaX * moveSpeed * influence,
              velocityY: deltaY * moveSpeed * influence,
              revealed: true,
              rotation: cube.rotation + (deltaX * 0.05)
            };
          }
        }
        return cube;
      })
    );

    setStartPoint({ x, y });
  };

  const handleMouseDown = (e) => {
    handleStartDrag(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    handleDrag(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStartDrag(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleDrag(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Update the render order in return statement
  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-gradient-to-b from-yellow-50 to-amber-50">
      {/* Title */}
      <header className="text-center py-2"> {/* Reduced padding */}
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-stone-700" dir="rtl">
        חפשו את אוצרות העתיד
        </h1>
      </header>

     {/* Main game area */}
     <main className="flex-1 flex items-center justify-center p-2"> {/* Reduced padding */}
     <div className="flex flex-col items-center w-full max-w-sm"> 
        <div 
        className="game-container relative w-full aspect-square bg-stone-800 overflow-hidden touch-none cursor-move select-none rounded-xl border-4 border-stone-900 shadow-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
    >
      {/* Render order: treasures first (bottom), then blue squares, then cyan squares (top) */}
      {treasures.map(treasure => (
        <TreasureCard
          key={treasure.id}
          treasure={treasure}
          isFound={treasure.found}
        />
      ))}

      {bottomCubes.map(cube => (
        <div
          key={cube.id}
          className={`absolute transition-transform duration-200 ease-out 
            ${cube.revealed ? 'bg-stone-500' : 'bg-stone-600'}
            shadow-lg rounded-md`}
          style={{
            width: BOTTOM_CUBE_SIZE,
            height: BOTTOM_CUBE_SIZE,
            transform: `translate(${cube.x}px, ${cube.y}px) rotate(${cube.rotation}deg)`,
            touchAction: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          }}
        />
      ))}

      {cubes.map(cube => (
        <div
          key={cube.id}
          className={`absolute transition-transform duration-200 ease-out 
            ${cube.revealed ? 'bg-amber-200' : 'bg-amber-300'}
            shadow-lg rounded-md`}
          style={{
            width: CUBE_SIZE,
            height: CUBE_SIZE,
            transform: `translate(${cube.x}px, ${cube.y}px) rotate(${cube.rotation}deg)`,
            touchAction: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
          }}
        />
      ))}
      </div>
      {/* New Start Over button */}
      <button 
          onClick={initializeGame}
          className="mt-4 px-4 md:px-6 py-2 text-sm md:text-base bg-stone-500 text-white rounded-lg hover:bg-stone-600 transition-colors"
        >
          ניסיון נוסף
        </button>
      </div>
      </main>
      {/* Footer */}
      <footer className="text-center py-2 text-sm text-stone-600">
        Created by Ofir Gardy © 2025
      </footer>
    </div>
  );
};

export default TreasureDigger;