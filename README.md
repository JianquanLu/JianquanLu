<p align="center">
  <img src="./assets/readme/hero.svg" width="100%" alt="Jianquan Lu builds reliable positioning and navigation systems from GNSS and multi-sensor observations">
</p>

<p align="center">
  <a href="mailto:xantheday663@gmail.com"><img src="https://img.shields.io/badge/EMAIL-xantheday663%40gmail.com-EF6A5B?style=flat-square&labelColor=111820" alt="Email Jianquan Lu"></a>
  <a href="https://github.com/JianquanLu?tab=repositories"><img src="https://img.shields.io/badge/WORK-PUBLIC_REPOSITORIES-65D7D1?style=flat-square&labelColor=111820" alt="Browse public repositories"></a>
  <img src="https://img.shields.io/badge/BASE-WUHAN%2C_CHINA-F5C96A?style=flat-square&labelColor=111820" alt="Based in Wuhan, China">
</p>

I am **Jianquan Lu**, a researcher and software engineer at **Wuhan University**. I work on precise positioning and navigation systems that combine GNSS, LiDAR, IMU, and camera observations, with a focus on robust state estimation and reproducible engineering.

## Open-source contributions

<p align="center">
  <img src="./assets/readme/community.svg" width="100%" alt="Jianquan Lu's upstream contributions to GREAT-PVT and improvements built on the yuni-tab fork">
</p>

### GREAT-PVT · upstream pull requests

I am contributing fixes back to [`GREAT-WHU/GREAT-PVT`](https://github.com/GREAT-WHU/GREAT-PVT), the precision positioning and navigation software maintained by the GREAT Group at Wuhan University.

- [`#7 Restore default GNSS band and frequency mappings`](https://github.com/GREAT-WHU/GREAT-PVT/pull/7) removes an unreachable-default failure, restores per-constellation defaults, and fixes QZSS switch fall-through. Verified with MSVC Release builds and one-epoch PPP runs.
- [`#8 Handle missing satellite objects and extend BDS satellite identifiers`](https://github.com/GREAT-WHU/GREAT-PVT/pull/8) adds current BDS PRNs through C63 and prevents missing satellite objects from causing a null-pointer crash. Verified against nine previously failing observation datasets.

Both pull requests are currently **open for upstream review**.

### YuNi Tab · useful changes on a fork

My [`JianquanLu/yuni-tab`](https://github.com/JianquanLu/yuni-tab) fork is currently **1 commit ahead** of [`ziyangcheng001-hue/yuni-tab`](https://github.com/ziyangcheng001-hue/yuni-tab). The fork:

- switches search and suggestions from Bing to Google;
- replaces the fragile wallpaper upload trigger with a native file-label interaction;
- adds explicit fallback and error handling when IndexedDB or wallpaper import fails.

## Research coordinates

```text
POSITIONING    GNSS / PPP / precise navigation
FUSION         LiDAR + IMU + camera observations
ESTIMATION     robust state estimation and calibration
ENGINEERING    C++ / Python / MATLAB / reproducible validation
```

## Public work

| Repository | Role | Current focus |
| --- | --- | --- |
| [`GREAT-PVT`](https://github.com/JianquanLu/GREAT-PVT) | Fork + upstream contributor | GNSS defaults, BDS coverage, runtime robustness |
| [`yuni-tab`](https://github.com/JianquanLu/yuni-tab) | Fork + independent improvements | Browser UX, Google suggestions, wallpaper reliability |
| [`JianquanLu`](https://github.com/JianquanLu/JianquanLu) | Profile source | This visual profile and contribution record |

## Working stack

<p>
  <img src="https://img.shields.io/badge/C%2B%2B-111820?style=flat-square&logo=cplusplus&logoColor=65D7D1" alt="C++">
  <img src="https://img.shields.io/badge/Python-111820?style=flat-square&logo=python&logoColor=F5C96A" alt="Python">
  <img src="https://img.shields.io/badge/MATLAB-111820?style=flat-square&logo=mathworks&logoColor=EF6A5B" alt="MATLAB">
  <img src="https://img.shields.io/badge/JavaScript-111820?style=flat-square&logo=javascript&logoColor=F5C96A" alt="JavaScript">
  <img src="https://img.shields.io/badge/Git-111820?style=flat-square&logo=git&logoColor=EF6A5B" alt="Git">
  <img src="https://img.shields.io/badge/Windows_%2F_Linux-111820?style=flat-square&logo=linux&logoColor=65D7D1" alt="Windows and Linux">
</p>

<p align="center">
  <sub>Positioning research, careful validation, and practical open-source work.</sub>
</p>
