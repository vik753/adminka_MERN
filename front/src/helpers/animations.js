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

export const changeBgBalls1 = (element1, element2) => {
  const t1 = gsap.timeline();
  const forward = () => {
    t1.to(element1, {
      duration: 1,
      left: "40%",
      top: "-30%",
      ease: "power3.out",
    });
    t1.to(
      element2,
      {
        duration: 1,
        right: "40%",
        bottom: "-30%",
        ease: "power3.out",
      },
      "<"
    );
  };
  const backward = () => {
    t1.to(element1, {
      duration: 1,
      left: "-20%",
      top: 0,
      ease: "power3.out",
    });
    t1.to(
      element2,
      {
        duration: 1,
        right: "-20%",
        bottom: 0,
        ease: "power3.out",
      },
      "<"
    );

  };

  return { forward, backward };
};

export const changeBgBallsStart = (leftEl, rightEl) => {
  const t2 = gsap.timeline();
    t2.from(leftEl, {
      duration: 3,
      left: "50%",
      top: "-50%",
      ease: "bounce.out",
    });
    t2.from(
      rightEl,
      {
        duration: 4,
        right: "50%",
        bottom: "-50%",
        ease: "bounce.out",
      },
      "<"
    );
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
