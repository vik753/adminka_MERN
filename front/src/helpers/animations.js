import { gsap } from "gsap";

/*-------------------------------
 * Auth Page
 * -------------------------------*/
export const hideElements = (elementsArr) => {
  gsap.to([...elementsArr], {
    duration: 0.5,
    opacity: 0,
    y: -100,
    ease: "power3.out",
  });
};

export const changePositionHide = (elementsArr) => {
  gsap.to([...elementsArr], {
    duration: 0.5,
    y: -25,
    ease: "power3.out",
  });
};

export const showElements = (elementsArr) => {
  gsap.to([...elementsArr], {
    duration: 0.5,
    opacity: 1,
    y: 0,
    ease: "power3.out",
  });
};

export const changePositionShow = (elementsArr) => {
  gsap.to([...elementsArr], {
    duration: 0.5,
    y: 0,
    ease: "power3.out",
  });
};

/*-------------------------------
 * Messenger
 * -------------------------------*/
export const showMessageAnimation = (el) => {
  gsap.fromTo(
    el,
    {
      x: -500,
    },
    {
      duration: 0.6,
      x: 0,
      ease: "back.out",
    }
  );
};
