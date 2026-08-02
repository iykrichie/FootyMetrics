# 📊 Model Specification: Dixon-Coles & Monte Carlo Probability Engine

This document provides the mathematical model specification for **FootyMetrics PRO ML**.

---

## 🧮 Mathematical Model Overview

Football match scorelines are modeled using a **bivariate Poisson distribution** with the **Dixon-Coles adjustment** to account for low-scoring interdependence (0-0, 1-0, 0-1, 1-1 scores).

Given Home Team $H$ and Away Team $A$:

1. **Expected Home Goals ($\lambda$)**:
   $$\lambda = \alpha_H \times \beta_A \times \gamma$$
   - $\alpha_H$: Home Attack Strength (rolling 6-month xG baseline)
   - $\beta_A$: Away Defense Weakness (conceded goals/xGA multiplier)
   - $\gamma$: Home Pitch Advantage factor ($\approx 1.22$)

2. **Expected Away Goals ($\mu$)**:
   $$\mu = \alpha_A \times \beta_H$$
   - $\alpha_A$: Away Attack Strength
   - $\beta_H$: Home Defense Weakness

---

## 🎯 Dixon-Coles Low-Goal Adjustment ($\tau$)

Standard independent Poisson models under-predict low-scoring outcomes (0-0 and 1-1 draws) and over-predict 1-0 or 0-1 scores. Dixon & Coles (1997) introduced a correction factor $\tau_{\rho}(x, y)$:

$$P(X=x, Y=y) = \tau_{\rho}(x, y) \times \frac{\lambda^x e^{-\lambda}}{x!} \times \frac{\mu^y e^{-\mu}}{y!}$$

Where $\tau_{\rho}(x, y)$ is defined as:

$$\tau_{\rho}(x, y) = \begin{cases} 
1 - \lambda \mu \rho & \text{for } x=0, y=0 \\
1 + \lambda \rho & \text{for } x=0, y=1 \\
1 + \mu \rho & \text{for } x=1, y=0 \\
1 - \rho & \text{for } x=1, y=1 \\
1 & \text{otherwise}
\end{cases}$$

Parameter $\rho \approx -0.11$ is fitted via historical backtesting across European football telemetry.

---

## 🎲 Monte Carlo Simulation Engine (10,000 Iterations)

To compute robust outcome probabilities and handicap spreads:

1. For each fixture $(H, A)$, sample 10,000 score pairs $(x_i, y_i)$ from the Dixon-Coles joint distribution matrix up to score limit $N=8$.
2. Compute win, draw, and loss counts:
   - **Home Win Probability ($P_{1}$)**: $\frac{1}{M} \sum \mathbb{I}(x_i > y_i)$
   - **Draw Probability ($P_{X}$)**: $\frac{1}{M} \sum \mathbb{I}(x_i = y_i)$
   - **Away Win Probability ($P_{2}$)**: $\frac{1}{M} \sum \mathbb{I}(x_i < y_i)$
3. Derive derivative betting markets:
   - **Double Chance 1X**: $P_1 + P_X$
   - **Double Chance 2X**: $P_2 + P_X$
   - **Both Teams To Score (GG)**: $\frac{1}{M} \sum \mathbb{I}(x_i > 0 \land y_i > 0)$
   - **Over 2.5 Total Goals**: $\frac{1}{M} \sum \mathbb{I}(x_i + y_i > 2.5)$

---

## ⚖️ Feature Weights Matrix (Gradient Boosted Ensemble)

The model enriches the Poisson parameters using feature weights:

| Feature Name | Weight % | Impact Description |
|---|---|---|
| Rolling 6-Month xG Trend | 28% | Attack creation rate over last 15 matches |
| Opponent Conceded xGA Baseline | 22% | Defensive quality & shot box prevention |
| Injury & Absence Penalty Index | 18% | Missing key scorers/defenders penalty |
| Rest Days & Schedule Density | 14% | Days between fixtures & fatigue penalty |
| H2H Historical Index | 10% | Past 5 direct head-to-head match outcomes |
| Pitch & Weather Factor | 8% | Rain, pitch quality, and altitude impact |
