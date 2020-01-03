---
layout: post
title: "New Year's Resolution: Play to Win"
author: Ben Brelje
header_image: "https://drive.google.com/uc?id=1hqnG4PTSb3q8HNMEFUP2NeXD0-W9MkUS"
tags: [statistics, life, optimization, uncertainty, game theory]
categories: [optimization, code]
permalink: /blog/new-years-resolution-high-variance-strategies
---

As an optimization engineer and researcher, I am always thinking about how to optimize my life.
Lately, I have been thinking particularly about the value of ***high-variance strategies***.
I am a pretty risk-averse person, generally preferring a known, acceptable option to the prospect of an unknown but potentially great (or terrible) option.
One of my resolutions for 2020 is to be more thoughtful about situations that warrant taking bigger risks, and to be mindful about my biases which push me towards low-variance strategies even when they aren't the best choice.

<!--more-->
### Playing to Win
Over the Christmas break, I probably played 20 hours of various card and table games.
**Pinochle** (a trick-taking card game) is my family's favorite, probably because it involves just the right mix of skill and luck.
You will win consistently if you are good, but there's enough randomness that a truly beautiful hand can happen to anyone.
Another game I would throw into this category is Settlers of Catan.

I found that I was consistently placing around second place in Pinochle, but rarely winning, and I wondered why?
I think the answer was that I was playing it safe, pursuing a **low-variance strategy**.
At the beginning of each hand, each player has the opportunity to "bid" for the privilege of naming trump.
Calling trump generally means you have a better chance of scoring a lot of points in the hand.

However, if you bid aggressively and don't take enough tricks, you take a huge penalty which basically knocks you out of the running for the game (each game is four hands).
The game also involves social pressure.
If you overbid and lose, your partner also loses.

Since it is embarrassing to overbid and lose, I generally bid more safely than my opponents.
However, this means I miss out on a lot of upside potential, and rarely win huge hands.
I rarely get blown out, but I rarely win.

### A Bit of Theory
Winning strategies depend on the reward system.
Some games reward everyone who crosses a certain objective threshold (e.g. blackjack)
Other games only reward players based on their performance compared to other players (e.g. poker).
Generally, games that reward a single winner favor high-variance strategies, while games that reward in proportion to the outcome favor a low-variance approach.

Let's use probability to explore winning strategies for different kinds of games.
Throughout the following derivations, we will assume that mean and variance are totally decoupled (i.e., there is no built-in risk premium).

*n.b. - I am not a mathematician, statistician, or game theorist, so please feel free to correct me*

### Utility Functions and Loss Aversion
First, we have to understand the rules of the game and how rewards are allocated to performance.
We can do this by creating a **utility function** $$u(x)$$ which captures the **value** of each possible outcome to the player.

In a **winner-take-all** situation, $$u(X_0)=0$$ unless $$X_0 \geq \text{max}(X_1,..X_N)$$ where $$X_0$$ is your outcome and $$(X_1,..X_N)$$ are the other player's outcomes.
Therefore, for a rational actor, utility is maximized when the probability of winning first place, $$X_0 \geq \text{max}(X_1,..X_N)$$, is maximized.

Different situations might reward the top $$N$$ results, or reward the best combined score across a series of events (e.g. the FIS World Cup race series).
In these situations, $$u(X_0)$$ can be a complicated function.
Generally, a rational actor should maximize **expected utility**, that is:

$$\text{maximize}(\sum_{i=1}^n P_i u_i)$$

where $$i$$ is one of $$N$$ possible outcomes, $$P_i$$ is the probability of the $$i$$th possible outcome, and $$u_i$$ is the utility of the $$i$$th possible outcome.

However, human psychology can sometimes get in the way.
Phenomena such as loss aversion can generate negative utility for especially poor outcomes.
Malcolm Gladwell explored this on an [episode](http://revisionisthistory.com/episodes/27-malcolm-gladwell-s-12-rules-for-life) of the Revisionist History podcast where he highlighted the [whitepaper](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3132563) by Cliff Asness and Aaron Brown called *Pulling the Goalie*.
Coaches hate getting blown out in losses, so they take fewer risks than they probably should if they were trying to maximize the probability of winning the game.
Or maybe the coach's utility function, not getting fired, is maximized by avoiding blowout losses.
In any case, somewhere, there is a psychological hangup getting the way of the outcome fans and owners say they want.

### Strategies Against a Fixed Standard
Consider a scenario where you receive a fixed reward for meeting or exceeding a standard.
An example might be an exam with a fixed passing score.
The utility function will be $$u(X)=K$$ for $$X \geq t$$, where $$t$$ is some threshold value, and zero otherwise.
Therefore, maximizing utility is equivalent to maximizing $$P(X>t)$$.

For an agent with mean performance $$\mu$$ and variance $$\sigma^2$$,

$$P(X>t)=1-\Phi(\frac{t-\mu}{\sigma})$$

where $$\Phi$$ is the cumulative distribution function of a standardized distribution (such as the normal distribution) [[1](https://www.drmaciver.com/2014/11/another-take-on-high-variance-strategies/)].

What should a person do to maximize their chance of getting rewarded in this scenario?
Let's compute the gradient of $$P$$ and locally maximize.
Since $$\Phi$$ is monotonically increasing, maximizing $$P$$ is equivalent to maximizing $$g=\frac{\mu-t}{\sigma}$$.

$$\frac{\partial P}{\partial \mu} \propto \frac{1}{\sigma}$$

Since $$\sigma$$ is always positive, this expression is also always positive.
In other words, improving mean performance is always good.
What about the effect of variance?

$$\frac{\partial P}{\partial \sigma} \propto \frac{t-\mu}{\sigma^2}$$

This expression is positive only when $$t > \mu$$.
Put another way, **variability is bad when your average performance is already good enough to meet the standard**.
But variability helps the underdog.

If you could choose to only increase mean or variance, which should you pick?
This is equivalent to asking under what conditions the following holds:

$$\frac{\partial P}{\partial \sigma} > \frac{\partial P}{\partial \mu}$$

Working through the algebra, increasing variability is better when $$t > \mu + \sigma$$.
In other words, against a fixed standard, **if you are an underdog by more than a standard deviation, a high-variance strategy is utility-maximizing**.

### Strategies against a Single Opponent
Consider a game where two players compete head-to-head.
Rewards are only given to the player with the higher score.
An example might be a college football game.

Let your performance be a random variable $$X$$ and your opponent's be a random variable $$Y$$.
Let's assume that $$X$$ and $$Y$$ are independent, normally-distributed random variables with mean $$\mu_x$$, $$\mu_y$$, and standard deviation $$\sigma_x$$, $$\sigma_y$$.

Your utility function is $$u(X)=K$$ for $$X>Y$$ and zero otherwise, so maximizing expected utility is equivalent to maximizing $$P(X>Y)$$.
We can easily subtract $$Y$$ from $$X$$ and obtain:

$$P(X-Y>0) = 1 - \Phi\Big(\frac{\mu_y-\mu_x}{\sqrt{\sigma_x^2+\sigma_y^2}}\Big)$$

where $$\Phi$$ is the CDF of the normal distribution.

Obviously increasing your expected score $$\mu_x$$ is a winning strategy.
What about increasing $$\sigma_x$$?
Let's do a similar exercise as before:

$$\frac{\partial P}{\partial \sigma_x} \propto \frac{\sigma_x(\mu_y-\mu_x)}{(\sigma_x^2+\sigma_y^2)^{3/2}}$$

Again, the underdog benefits from a higher-variance strategy, while the favorite should strive to minimize variance.
When should the underdog *focus* on variance?

$$\frac{\partial P}{\partial \sigma} > \frac{\partial P}{\partial \mu}$$

This occurs when $$\mu_y > \mu_x + \frac{\sigma_x^2+\sigma_y^2}{\sigma_x}$$, which is similar to the expression we found against a fixed standard, but with a kind of weighted average of both variances.
As before, the high-variance strategy shines for heavy underdogs.


### Strategies against Many Opponents
Now, consider a scenario where there are many competitors but only one prize, awarded to the top scorer.
There are lots of important examples of this type of reward system: Nobel prizes, billion-dollar startups, and (most importantly) the game of Pinochle.

Let there be $$N$$ competitors not including yourself.
Their performances can be modeled as random distributions $$X_i$$ for $$i=1..N$$.
Let's assume for simplicity that your opponents share parameters $$\mu$$ and $$\sigma$$.
Your performance is a random variable $$X_0$$ with parameters $$\mu_0$$ and $$\sigma_0$$.

The utility function $$u(X_0, X_1, ... X_N)=K$$ if $$X_0 \geq \text{max}(X_1, X_2, ... X_N)$$ and zero otherwise.
Therefore, maximizing $$P(X_0 \geq \text{max}(X_1,...X_N))$$ is optimal strategy.

We might be tempted to multiply the expression we found above for $$P(X>Y)$$ a bunch of times.
This would be incorrect, because $$P(X_0>X_i)$$ is not independent of the other $$i$$s.
When $$X_0$$ is large, all the other probabilities have a better chance of being true.
We have to resort to a slightly more complicated approach using conditional probability.

First, let's find the conditional probability that $$X_0>\text{max}(X_{1..N})$$ assuming that we know the value of $$X_0$$.

$$P(X_0 \geq \text{max}(X_{1..N}) | X_0=\alpha) = \prod_{i=1}^N P(X_i \leq \alpha | X_0=\alpha) = [\Phi(\frac{\alpha-\mu}{\sigma})]^N$$

where $$\Phi$$ is the cumulative distribution of your standardized function (in this case, we can assume normal).
Now we need to generate the unconditional probability as follows:

$$P(X_0 \geq \text{max}(X_{1..N}) = \int_{-\infty}^{\infty} P(X_0 \geq \text{max}(X_{1..N}) | X_0=\alpha) P(X_0=\alpha) \, d\alpha$$

$$= \int_{-\infty}^{\infty} [\Phi(\frac{\alpha-\mu}{\sigma})]^N \phi(\frac{\alpha-\mu_0}{\sigma_0}) \, d\alpha$$

where $$\phi$$ is the probability density function of your own performance.
There's no closed form expression for this, but we can evaluate it numerically [[2](https://stats.stackexchange.com/questions/43685/which-is-largest-of-a-bunch-of-normally-distributed-random-variables)].

Let's accept the things we cannot change (namely, our opponents' skill and variability) and examine what we can change.
Now, we numerically evaluate the win probability at a variety of combinations of our skill and our variability and plot it as contours of win probability.

![](https://drive.google.com/uc?id=1X6gipi6l-smgOSBDOfGv1LB5oBAHywwO){: .img-responsive style="width: 76%" .center-block}

Across the board, win probability increases with more skill.
Similar to the single-opponent case, increasing variance improves the chances of a win for an underdog and hurts a heavy favorite.
*Except* this time, unlike the single-opponent case, the breakeven point isn't at opponent parity ($$\mu_0 = \mu$$) - it's a lot higher.

How skillful do you need to be in a multi-agent, winner-take-all situation to justify using a low-variance strategy?
The answer depends on the number of opponents $$N$$ and their variance $$\sigma$$.
A low-variance approach is favored when $$\frac{\partial P(\text{win})}{\partial \sigma_0} < 0$$.
Differentiating the integral expression above, and using Leibniz's integral rule for the definite integral with constant limits, we have:

$$\frac{\partial P(\text{win})}{\partial \sigma_0} = \int_{-\infty}^{\infty} [\Phi(\frac{\alpha-\mu}{\sigma})]^N \frac{\partial}{\partial \sigma_0} \phi(\frac{\alpha-\mu_0}{\sigma_0}) \, d\alpha$$

Let's plot a contour of the breakeven point where $$\frac{\partial P(\text{win})}{\partial \sigma_0} = 0$$ .
Above the line, you have so much skill that you can afford to play it safe, even against many opponents.
Below the line, you will need to take risk in order to have a chance of outperforming the crowd.

![](https://drive.google.com/uc?id=1A3EU3h-4TTVi5HM-Ckvg0A6n54C0epx4){: .img-responsive style="width: 76%" .center-block}

**With more than one opponent, unless you are several standard deviations better than average, you still should use a high-variance strategy.**
The number of opponents, their skill, and their variance, all require you to have even higher skill in order to justify taking the safe approach.
Because of the power in the integral expression I can't say for certain what happens for infinite players using numerical integration, but the curve sure looks logarithmic to me.

![](https://drive.google.com/uc?id=1yHyODrVzkFHSZGQVinAbLrxQ13A9VSzo){: .img-responsive style="width: 76%" .center-block}


### Reward Systems
We live in a society with reward systems, rules, and uncertainty.
For example, budding musicians and artists struggle while they dream of their big break.
In tech, founders are striving after a billion-dollar valuation.

I have been involved in two industries, both with their own reward systems.
In academia, many PhD students strive for a tenured professorship (hopefully at a good university).
Tenured professors are striving for endowed professorships, consulting gigs, or maybe even a Nobel!
In engineering, new college grads hone their skills in hopes of earning a promotion, maybe to management or as a chief engineer.

Most of these rewards depend in part on the skill of the individual, and in part on luck, but they all have different rules.
The Nobel committee rewards researchers for a single, impactful achievement.
On the other hand, professorships and lifetime achievement awards reward consistent good performance over time (e.g. publication count) - though clearly, winning a Nobel would go a long way toward a tenure packet.
I'm willing to go out on a limb and say that founding a billion-dollar "unicorn" startup is more than 50% luck - indeed, the founders of these companies often find that they are their own worst enemies in the long run (e.g. Travis Kalanick at Uber).

The strategies that guide how we live our lives depend on:
- The specific rewards we want, or penalties we want to avoid (our $$u(x)$$)
- The "rules of the game" (winner-take-all, fixed standard, etc.)
- Our assessment of our own ability
- Our assessment of the abilities of others

When setting up reward systems, we should choose a system that incentivizes the type of behavior that we want.
We need to ask: "what's the worst thing that can happen?"
If that outcome is unacceptable, then we should not use winner-take-all incentive structures.
It's probably OK to award Nobels on a winner-take-all basis because the worst thing that can happen is failed research.
It's probably not OK to reward surgeons on a winner-take-all basis using the number of surgeries they performed in a given year.

### Application to Design Optimization

In optimization, we usually neglect uncertainty altogether.
Let's imagine that we are optimizing an unmanned aircraft to win a 3-on-1 dogfight against a given opponent.
Naively, we might try to maximize the expected aircraft performance, $$\mu_0$$.
This is probably a good strategy if we expect the opponent aircraft to have much worse performance than ours on average.

However, if the opponent's mean performance is not that much worse than us, or if the opponent's performance is highly *variable* (e.g. performs superbly in narrow conditions), we might want to have a swarm of UAS with different properties so we can maximize $$\sigma_0$$ instead, *and* increase the number of chances we have to win.
This might maximize the probability of winning the entire fight on a winner-take-all basis.

Uncertainty comes from:
- Uncertainty in the modeling
- Uncertainty in real-world model inputs
- Dependence of the objective function on future conditions (e.g. conditions of the fight)

It's imperative that the optimization community develop more robust mathematics to handle optimization under uncertainty.

### My Resolution

In 2020, I will be on the lookout for situations where there are many competitors and the "worst thing that can happen" is not a big deal.
For example, I will try to pace my upcoming ski races in a more aggressive way.
Sometimes I will probably run out of steam and finish poorly, but I will also have a better chance at a great time.
I will also spend a higher portion of my research time on potentially-impactful topics where I have no assurance of success.

### Appendix
The code I used to make the plots and do the numerical integration can be found [here](https://gist.github.com/bbrelje/2451ea9ec921e7a0ef7e4210df6328a7):
<script src="https://gist.github.com/bbrelje/2451ea9ec921e7a0ef7e4210df6328a7.js"></script>

*Cover image by Wikimedia Commons user [mark6mauno](https://commons.wikimedia.org/wiki/File:Empty_net_goal_(3376907373).jpg), CC 2.0 license*