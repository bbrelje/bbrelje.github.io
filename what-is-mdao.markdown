---
layout: page
title: MDAO
subtitle: What is MDAO?
header_image: /assets/img/rosenbrock.jpg
---

MD(A)O stands for ***multidisciplinary design (analysis and) optimization***. Basically, MDAO involves using computer simulations and mathematics to model, analyze, and semi-automatically design, the best possible systems. "Systems" might include aircraft, spacecraft, buildings, or really any entity that can be modeled and where we care about performance.


**M (Multidisciplinary)** - This means that multiple analysis *disciplines* are involved in the simulation or design process. Examples of disciplines might include aerodynamics, structures, weights, stability & control, and cost / finance.

**D (Design)** - The ultimate goal of MDAO is to produce good designs. In a broad sense, the design of a product is the *input* to an analysis code, and the *outputs* are metrics which tell us how well the design performs and whether it is feasible.

**A (Analysis)** - Many people in the field will use "A" in MDAO to explicitly state that all MDAO codes perform some kind of analysis. When a simulation is used to analyze a design rather than perform numeric optimization, the term *MDA* can be used. My lab at Michigan prefers to simply use *MDO* since optimization implies that analysis is being performed.

**O (Optimization)** - Broadly used, the word *optimization* simply means the process of making something better. In the context of MDAO, optimization refers to a set of specialized mathematical techniques that are used to find the "best" (*optimal*) design possible that meets a set of requirements.  It is typical in MDAO (especially where geometry is a design variable) to use the techniques of constrained nonlinear optimization (or [nonlinear programming](https://en.wikipedia.org/wiki/Nonlinear_programming)).

The header image of my site is a 2D rendering of the 3D Rosenbrock Function (also known as the "banana function") which is a challenging test case for an optimizer because it has subtle valleys to find.

Some challenges in MDAO include:

* **Computational cost** - Aerodynamics and structural codes take a long time to run, even on supercomputers.
* **Fidelity** - How precise and accurate are the computer models? How well does the simulation capture all relevant effects?
* **Flexibility** - Some MDAO codes are only applicable to a narrow range of designs or conditions.
* **Globality** - Some optimization techniques only incrementally improve a starting design and miss the very best point somewhere else in the design space; no generally useful technique guarantees that the best global solution is found.
* **Ease of use** - Many MDAO codes have a very steep learning curve and are only useful to specialists.
Acceptance - The interdisciplinary nature of MDAO means that not all the relevant experts may agree on the results of an MDAO study.
* **Visualization** - MDAO design spaces are typically in many dimensions - more than 2 or 3. This makes conveying results difficult.