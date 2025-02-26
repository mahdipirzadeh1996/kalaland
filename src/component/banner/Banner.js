import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import styles from './banner.module.scss'
import imageOne from '../../../public/assets/images/banners/image-one.png'
import imageTwo from '../../../public/assets/images/banners/image-two.png'
import imageThree from '../../../public/assets/images/banners/image-three.png'
import imageFour from '../../../public/assets/images/banners/image-one.png'
import imageFive from '../../../public/assets/images/banners/image-two.png'
import imageSix from '../../../public/assets/images/banners/image-three.png'
import imageSeven from '../../../public/assets/images/banners/image-one.png'
import imageEight from '../../../public/assets/images/banners/image-two.png'
import imageNine from '../../../public/assets/images/banners/image-three.png'
import imageTen from '../../../public/assets/images/banners/image-one.png'
import previousDisabled from '../../../public/assets/images/banners/previous-disabled.svg'
import previousEnabled from '../../../public/assets/images/banners/previous-enabled.svg'
import nextDisabled from '../../../public/assets/images/banners/next-disabled.svg'
import nextEnabled from '../../../public/assets/images/banners/next-enabled.svg'

const images = [
  imageOne,
  imageTwo,
  imageThree,
  imageFour,
  imageFive,
  imageSix,
  imageSeven,
  imageEight,
  imageNine,
]

const chunk1 = images.slice(0, 3)
const chunk2 = images.slice(3, 6)
const chunk3 = images.slice(6, 9)

const Banner = () => {
  // image index state
  const [activeIndex, setActiveIndex] = useState(0)
  const [tempIndex, setTempIndex] = useState(0)
  let temp = chunk1

  // transition direction state
  const [transitionDirection, setTransitionDirection] = useState('next')

  // function to handle next button click
  //   const handleNext = () => {
  //     setTransitionDirection('next')
  //     setActiveIndex((prevIndex) => (prevIndex === 2 ? prevIndex : prevIndex + 1))
  //   }

  // function to handle previous button click
  //   const handlePrevious = () => {
  //     setTransitionDirection('previous')
  //     setActiveIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1))
  //   }

  const handleNext = () => {
    setTransitionDirection('next')
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    )
    setTempIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1))
  }

  useEffect(() => {
    if (activeIndex <= images.length - 1) {
      switch (activeIndex + 1 / 3) {
        case 1:
          temp = chunk1
          break
        case 2:
          temp = chunk2
          break
        case 3:
          temp = chunk3
          break
        default:
          temp = chunk1
      }
    }
  }, [activeIndex])

  const handlePrevious = () => {
    setTransitionDirection('previous')
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    )
    setTempIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1))
  }

  // array for titles and descriptions
  const texts = [
    {
      title: 'Immersive gaming experience',
      description:
        'adipisicing elit. Iure doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'On demand support when you need it',
      description:
        'doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'Accessible and inclusive to all',
      description:
        'Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'Immersive gaming experience',
      description:
        'adipisicing elit. Iure doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'On demand support when you need it',
      description:
        'doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'Accessible and inclusive to all',
      description:
        'Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'Immersive gaming experience',
      description:
        'adipisicing elit. Iure doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'On demand support when you need it',
      description:
        'doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'Accessible and inclusive to all',
      description:
        'Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
    {
      title: 'Immersive gaming experience',
      description:
        'adipisicing elit. Iure doloremque aut ratione eos! Laudantium ipsum velit, modi quae repudiandae, in quidem iste cupiditate sequi expedita placeat quam rerum, optio facilis. Officia iure quo illo eligendi. Perspiciatis voluptatibus itaque natus maiores alias vitae, reprehenderit distinctio cupiditate libero fugiat aut architecto ratione?',
    },
  ]

  // defining text animation
  const textVariants = {
    hidden: {
      opacity: 0,
      x: transitionDirection === 'next' ? 100 : -100,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  }

  // defining stagger text effect
  const textContainerVariant = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 },
    },
  }

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(handleNext, 4000) // Change slide every 4 seconds
    return () => clearInterval(interval) // Cleanup interval on unmount
  }, [])

  //   useEffect(() => {
  //     const interval = setInterval(handleNext, 4000) // Change slide every 4 seconds
  //     return () => clearInterval(interval) // Cleanup interval on unmount
  //   }, [activeIndex]) // Add activeIndex to the dependency array to reset the interval when the index changes

  const getImageIndex = (offset) => {
    let index = activeIndex + offset
    if (index < 0) index = images.length - 1
    if (index >= images.length) index = 0
    return index
  }

  return (
    // <div className={styles.banner}>
    //   <motion.div
    //     className={styles.contentContainer}
    //     key={activeIndex}
    //     variants={textContainerVariant}
    //     initial="hidden"
    //     animate="visible"
    //   >
    //     <div className={styles.titleContainer}>
    //       <motion.h1 variants={textVariants}>
    //         {texts[activeIndex].title}
    //       </motion.h1>
    //     </div>
    //     <div className={styles.descriptionContainer}>
    //       <motion.p variants={textVariants}>
    //         {texts[activeIndex].description}
    //       </motion.p>
    //     </div>
    //     <div className={styles.buttonContainer}>
    //       <button>learn more</button>
    //     </div>
    //   </motion.div>
    //   <div className={styles.imagesContainer}>
    //     <motion.div
    //       className={styles.firstContainer}
    //       animate={{
    //         opacity: activeIndex === 0 ? 1 : activeIndex === 1 ? 0 : 0,
    //         x: activeIndex === 0 ? '0' : activeIndex === 1 ? '96px' : '96px',
    //         scale: activeIndex === 0 ? 1 : activeIndex === 1 ? 1.2 : 1.2,
    //       }}
    //       transition={{
    //         duration: 0.5, // Animation duration in seconds
    //         delay: 0, // Delay before the animation starts in seconds
    //         ease: 'easeInOut', // Easing function for the animation
    //       }}
    //     >
    //       <Image
    //         className={styles.first}
    //         alt="first image"
    //         src={imageOne}
    //       ></Image>
    //     </motion.div>
    //     <motion.div
    //       className={styles.secondContainer}
    //       animate={{
    //         opacity: activeIndex === 0 ? 0.66 : activeIndex === 1 ? 1 : 0,
    //         x: activeIndex === 0 ? '-96px' : activeIndex === 1 ? '0' : '96px',
    //         scale: activeIndex === 0 ? 0.8 : activeIndex === 1 ? 1 : 1.2,
    //       }}
    //       transition={{
    //         duration: 0.5,
    //         delay: 0,
    //         ease: 'easeInOut',
    //       }}
    //     >
    //       <Image
    //         className={styles.second}
    //         alt="second image"
    //         src={imageTwo}
    //       ></Image>
    //     </motion.div>
    //     <motion.div
    //       className={styles.thirdContainer}
    //       animate={{
    //         opacity: activeIndex === 0 ? 0.33 : activeIndex === 1 ? 0.66 : 1,
    //         x: activeIndex === 0 ? '-192px' : activeIndex === 1 ? '-96px' : '0',
    //         scale: activeIndex === 0 ? 0.6 : activeIndex === 1 ? 0.8 : 1,
    //       }}
    //       transition={{
    //         duration: 0.5, // Animation duration in seconds
    //         delay: 0, // Delay before the animation starts in seconds
    //         ease: 'easeInOut', // Easing function for the animation
    //       }}
    //     >
    //       <Image
    //         className={styles.third}
    //         alt="third image"
    //         src={imageThree}
    //       ></Image>
    //     </motion.div>
    //     <div className={styles.controls}>
    //       <button
    //         className={
    //           activeIndex !== 0
    //             ? `${styles.previousContainer}`
    //             : `${styles.disabled}`
    //         }
    //         onClick={handlePrevious}
    //       >
    //         <Image
    //           src={activeIndex !== 0 ? previousEnabled : previousDisabled}
    //           alt="previous icon"
    //           className={styles.previous}
    //         ></Image>
    //       </button>
    //       <button
    //         className={
    //           activeIndex !== 2
    //             ? `${styles.nextContainer}`
    //             : `${styles.disabled}`
    //         }
    //         onClick={handleNext}
    //       >
    //         <Image
    //           src={activeIndex !== 2 ? nextEnabled : nextDisabled}
    //           alt="next icon"
    //           className={styles.next}
    //         ></Image>
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className={styles.banner}>
      <motion.div
        className={styles.contentContainer}
        key={activeIndex}
        variants={textContainerVariant}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.titleContainer}>
          <motion.h1 variants={textVariants}>
            {texts[activeIndex % texts.length].title}
          </motion.h1>
        </div>
        <div className={styles.descriptionContainer}>
          <motion.p variants={textVariants}>
            {texts[activeIndex % texts.length].description}
          </motion.p>
        </div>
        <div className={styles.buttonContainer}>
          <button>learn more</button>
        </div>
      </motion.div>

      <div className={styles.imagesContainer}>
        {/* <motion.div
          className={styles.firstContainer}
          animate={{
            opacity: tempIndex === 0 ? 1 : tempIndex === 1 ? 0 : 0,
            x:
              tempIndex === 0
                ? '0'
                : tempIndex === 1
                ? '96px'
                : '96px',
            scale:
              tempIndex === 0 ? 1 : tempIndex === 1 ? 1.2 : 1.2,
          }}
          transition={{
            duration: 0.5, // Animation duration in seconds
            delay: 0, // Delay before the animation starts in seconds
            ease: 'easeInOut', // Easing function for the animation
          }}
        >
          <Image
            className={styles.first}
            alt="first image"
            src={temp[0]}
          ></Image>
        </motion.div>
        <motion.div
          className={styles.secondContainer}
          animate={{
            opacity: tempIndex === 0 ? 0.66 : tempIndex === 1 ? 1 : 0,
            x: tempIndex === 0 ? '-96px' : tempIndex === 1 ? '0' : '96px',
            scale: tempIndex === 0 ? 0.8 : tempIndex === 1 ? 1 : 1.2,
          }}
          transition={{
            duration: 0.5,
            delay: 0,
            ease: 'easeInOut',
          }}
        >
          <Image
            className={styles.second}
            alt="second image"
            src={temp[1]}
          ></Image>
        </motion.div>
        <motion.div
          className={styles.thirdContainer}
          animate={{
            opacity: tempIndex === 0 ? 0.33 : tempIndex === 1 ? 0.66 : 1,
            x: tempIndex === 0 ? '-192px' : tempIndex === 1 ? '-96px' : '0',
            scale: tempIndex === 0 ? 0.6 : tempIndex === 1 ? 0.8 : 1,
          }}
          transition={{
            duration: 0.5, // Animation duration in seconds
            delay: 0, // Delay before the animation starts in seconds
            ease: 'easeInOut', // Easing function for the animation
          }}
        >
          <Image
            className={styles.third}
            alt="third image"
            src={temp[2]}
          ></Image>
        </motion.div> */}

        {images.map((image, index) => (
          <motion.div
            key={index}
            className={styles.firstContainer}
            style={{
              zIndex: index === activeIndex ? 2 : index % 3 === 1 ? 1 : 0,
            }}
            animate={{
              opacity:
                activeIndex === index
                  ? 1
                  : index === activeIndex + 1
                  ? 0.8
                  : index === activeIndex + 2
                  ? 0.33
                  : 0,
              x:
                activeIndex === index
                  ? '0'
                  : index === activeIndex + 1
                  ? '-96px'
                  : index === activeIndex + 2
                  ? '-192px'
                  : '0',
              scale:
                activeIndex === index
                  ? 1
                  : index === activeIndex + 1
                  ? 0.8
                  : index === activeIndex + 2
                  ? 0.6
                  : 0,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeInOut',
            }}
          >
            <Image
              className={styles.first}
              src={image}
              alt={`banner-${index}`}
            />
          </motion.div>
        ))}

        <div className={styles.controls}>
          <button
            className={
              activeIndex !== 0
                ? `${styles.previousContainer}`
                : `${styles.disabled}`
            }
            onClick={handlePrevious}
          >
            <Image
              src={activeIndex !== 0 ? previousEnabled : previousDisabled}
              alt="previous icon"
              className={styles.previous}
            ></Image>
          </button>
          <button
            className={
              activeIndex !== images.length - 1
                ? `${styles.nextContainer}`
                : `${styles.disabled}`
            }
            onClick={handleNext}
          >
            <Image
              src={
                activeIndex !== images.length - 1 ? nextEnabled : nextDisabled
              }
              alt="next icon"
              className={styles.next}
            ></Image>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
