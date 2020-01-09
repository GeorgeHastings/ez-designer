import {
  $,
  $if,
  $html,
  getRandomInt,
  getRandomArrayVal,
  getRandomRotationByInterval,
  rollDicePct
} from './helpers.js';

let canvasWidth = 500;
let canvasHeight = 500;
let rowSize = 5;
let density = 100;
let scale = 100;
let rotationAngle = 90;
let strokeWidth = 1;
let fillAsGradient = false;
let randomlyRotate = true;

const blobs = [
  "M85.799 24.614c8.41 12.401 12.501 26.359 9.815 39.01-2.686 12.627-12.2 23.949-24.651 30.45-12.451 6.477-27.84 8.134-40.014 2.51-12.175-5.647-21.137-18.55-24.928-33.21-3.815-14.686-2.46-31.103 6.05-43.53C20.606 7.395 36.321-1.09 50.504.115c14.208 1.18 26.885 12.074 35.295 24.5z",
  "M83.032 26.59c10.267 12.44 18.85 26.676 16.61 39.228C97.423 78.39 84.384 89.279 70.37 94.69c-13.993 5.411-28.984 5.345-40.914-.576-11.93-5.921-20.8-17.696-25.702-32.354-4.923-14.658-5.832-32.155 2.35-44.13C14.289 5.678 31.563-.709 46.177 1.398 60.79 3.527 72.765 14.17 83.032 26.589z",
  "M91.982 19.587c7.035 12.328 5.11 28.3.344 41.407-4.79 13.084-12.397 23.281-23.648 30.43-11.228 7.127-26.123 11.183-39.001 6.691-12.855-4.514-23.74-17.598-25.435-31.049-1.696-13.45 5.751-27.291 15.398-40.215C29.287 13.904 41.111 1.874 55.02.2c13.91-1.65 29.927 7.035 36.962 19.386z",
  "M84.286 20.455c7.267 11.897 8.243 25.995 5.606 39.968-2.637 13.973-8.886 27.8-20.202 34.59-11.315 6.81-27.717 6.56-39.739-.229C17.93 88.016 10.268 74.728 9.147 62.146c-1.12-12.603 4.277-24.5 12.167-36.542 7.89-12.042 18.292-24.23 30.25-25.496 11.96-1.246 25.476 8.45 32.722 20.347z",
  "M90.436 21.53c9.169 11.025 11.815 27.692 7.637 41.503C93.87 76.844 82.823 87.8 70.265 92.744c-12.535 4.945-26.601 3.9-39.298-1.601C18.27 85.64 6.942 75.707 2.347 62.29-2.25 48.874-.115 32.022 8.937 21.02c9.053-11.003 25.023-16.157 40.83-16.017 15.831.116 31.5 5.478 40.668 16.527z",
  "M95.455 20.296c6.96 11.057 4.912 26.956.606 40.923-4.33 13.944-10.941 25.932-21.486 31.775-10.545 5.866-25.024 5.586-39.55.489C20.523 88.36 5.997 78.422 1.528 64.57c-4.446-13.85 1.187-31.635 12.035-43.577C24.433 9.053 40.495 2.954 56.51 3c16.015.047 31.984 6.239 38.944 17.296z",
  "M85.177 26.704C95.99 40.455 102.797 57.17 98.884 70.31c-3.913 13.142-18.547 22.664-32.502 26.735-13.956 4.049-27.187 2.624-38.406-2.85C16.78 88.723 7.62 79.2 3.073 66.556c-4.546-12.665-4.5-28.453 3.212-41.481 7.736-13.05 23.116-23.32 38.202-23.07 15.087.226 29.879 10.97 40.69 24.699z",
  "M92.803 25.47c7.716 11.881 8.84 26.829 5.212 39.86-3.628 13.056-12.009 24.17-23.124 29.434-11.089 5.264-24.912 4.65-38.045-.485-13.107-5.136-25.525-14.82-32.04-29.716-6.49-14.922-7.104-35.056 2.503-47.397C16.891 4.851 36.667.354 53.71 2.526 70.753 4.697 85.087 13.564 92.804 25.47z",
  "M90.239 17.62c8.56 11.937 9.801 28.512 6.403 44.346-3.376 15.813-11.37 30.864-23.305 35.939-11.958 5.096-27.858.174-42.342-7.035C16.511 83.638 3.465 74.098 1.33 62.663c-2.157-11.456 6.6-24.808 16.51-37.049C27.75 13.374 38.813 2.222 52.296.305c13.482-1.917 29.36 5.358 37.942 17.316z",
  "M88.922 18.21c9.604 11.98 12.645 29.27 8.354 43.603C92.984 76.145 81.36 87.52 67.548 94.06c-13.833 6.542-29.832 8.229-42.04 2.27C13.28 90.354 4.822 76.75 1.53 62.064-1.76 47.355.114 31.543 8.55 19.836 16.968 8.128 31.967.482 47.55.024 63.13-.455 79.297 6.211 88.922 18.211z",
  "M85.43 14.429c9.866 10.962 13.628 28.243 9.995 43.74-3.632 15.498-14.637 29.19-29.017 36.283-14.401 7.114-32.177 7.63-43.59.129C11.426 87.079 6.396 71.56 4.655 57.224c-1.74-14.337-.193-27.513 6.835-37.808C18.52 9.098 31.007 1.66 45.258.243c14.25-1.397 30.285 3.224 40.172 14.186z",
  "M83.887 22.101c9.534 11.642 17.12 25.14 14.942 37.08-2.2 11.917-14.163 22.3-28.6 30.32C55.79 97.5 38.876 103.16 25.401 98.05 11.904 92.962 1.842 77.126.239 61.75-1.39 46.37 5.487 31.45 15.433 19.717 25.379 7.96 38.396-.587 50.633.032 62.873.65 74.354 10.436 83.888 22.1z",
  "M94.622 13.029c7.797 9.264 5.986 26.692 1.674 42.767C92.008 71.85 85.22 86.548 73.64 92.625c-11.558 6.054-27.908 3.508-42.928-3.188C15.692 82.741 2.024 71.894.212 59.58-1.598 47.266 8.469 33.507 19.086 23.6 29.703 13.67 40.893 7.617 55.18 5.14c14.263-2.476 31.669-1.376 39.442 7.889z",
  "M90.445 22.36c8.812 12.074 11.484 28.017 8.202 42.698-3.28 14.702-12.514 28.1-24.146 31.928-11.63 3.828-25.66-1.914-39.71-8.392-14.029-6.457-28.079-13.65-32.875-25.555-4.774-11.884-.273-28.5 9.57-40.805C21.33 9.93 36.516 1.917 51.596 2c15.06.085 30.036 8.288 38.849 20.36z",
  "M85.107 22.511c7.178 11.794 9.144 24.936 6.383 36.973-2.783 12.015-10.292 22.948-22.064 30.832-11.75 7.863-27.763 12.722-39.579 7.532-11.816-5.19-19.436-20.386-21.357-35.095-1.922-14.71 1.877-28.911 10.27-40.993C27.153 9.701 40.16-.26 52.86.005 65.54.248 77.93 10.695 85.107 22.511z",
  "M83.395 22.334c9.473 12.21 14.922 27.339 11.864 40.467-3.035 13.152-14.577 24.28-28.304 30.925-13.727 6.622-29.66 8.76-40.65 2.69C15.29 90.346 9.197 76.068 5.68 61.076c-3.518-14.99-4.484-30.694 2.805-42.398C15.773 6.975 31.293-.727 45.825.054c14.531.805 28.074 10.071 37.57 22.28z",
  "M88.583 22.363c9.056 12.22 13.195 27.474 10.703 42.337C96.794 79.564 87.65 94.037 75.69 98.024c-11.96 3.986-26.737-2.514-41.362-9.512C19.704 81.535 5.252 74.06 1.222 62.47c-4.03-11.592 2.362-27.3 12.502-39.759C23.864 10.252 37.752 1.022 51.662 1c13.932-.022 27.864 9.165 36.92 21.363z",
  "M86.07 10.705c9.588 9.997 11.724 27.97 7.907 44.533-3.817 16.564-13.633 31.696-27.902 39.217-14.291 7.544-33.059 7.475-44.556-.727-11.474-8.225-15.7-24.562-17.064-39.103-1.363-14.542.16-27.266 6.953-36.627C18.202 8.638 30.267 2.684 44.831.685c14.587-1.977 31.628.022 41.24 10.02z",
  "M88.072 21.714c8.73 12.654 10.884 28.905 6.395 41.606-4.513 12.677-15.67 21.804-28.572 28.496-12.902 6.668-27.528 10.902-38.662 6.168C16.077 93.272 8.413 79.57 4.966 64.776c-3.47-14.771-2.722-30.635 5.283-43.13C18.231 9.15 33.492.022 48.752 0c15.284-.023 30.59 9.059 39.32 21.714z",
  "M81.925 21.025c9.412 11.338 15.44 25.881 13.602 40.536-1.837 14.632-11.54 29.377-24.85 35.292-13.333 5.938-30.273 3.025-41.41-4.997-11.137-8.022-16.47-21.175-20.705-35.718-4.213-14.565-7.35-30.497-.784-41.186C14.32 4.264 30.566-1.158 45.087.208c14.542 1.344 27.405 9.479 36.838 20.817z",
  "M86.99 22.543c7.427 12.816 6.868 28.499 3.266 43.151C86.655 80.347 80.01 93.991 69.675 98.36c-10.336 4.347-24.34-.56-35.123-7.55-10.783-6.968-18.323-16.02-22.797-27.983-4.452-11.942-5.839-26.774.85-39.432C19.295 10.736 34.06.273 49.115.005c15.079-.247 30.47 9.7 37.875 22.538z",
  "M82.95 23.361c9.93 9.49 18.182 23.264 16.922 37.31-1.26 14.068-12.03 28.388-24.86 32.146-12.828 3.759-27.715-3.065-41.593-10.351-13.9-7.307-26.792-15.075-31.41-27.085-4.641-12.031-.988-28.303 8.356-37.647 9.364-9.343 24.398-11.758 37.73-10.372 13.312 1.365 24.923 6.53 34.854 16z",
  "M88.701 17.324c8.864 11.04 11.96 26.747 8.572 40.727-3.389 13.98-13.24 26.253-26.792 33.972-13.554 7.697-30.787 10.883-43.69 4.757C13.912 90.677 5.34 75.306 2.805 59.8c-2.535-15.482.965-31.1 9.94-42.162C21.72 6.575 36.15.068 50.69 0c14.54-.067 29.149 6.306 38.012 17.324z",
  "M87.977 19.551c8.547 11.841 10.635 27.687 7.32 42.326C91.96 76.517 83.24 89.951 70.84 96.044c-12.423 6.114-28.526 4.866-41.164-1.851C17.04 87.454 7.867 75.226 4.487 61.383c-3.402-13.844-.99-29.302 7.47-41.143C20.42 8.4 34.952.197 49.699.003 64.468-.17 79.451 7.689 87.977 19.55z",
  "M85.438 21.748c9.525 10.022 16.358 24.081 14.143 37.002-2.216 12.92-13.5 24.682-27.043 30.831-13.52 6.17-29.32 6.73-43.11.932C15.618 84.736 3.794 72.582.791 58.667-2.21 44.732 3.608 29.016 13.526 18.911 23.465 8.827 37.483 4.334 50.61 5.08c13.107.725 25.302 6.668 34.827 16.669z",
  "M88.487 21.932c7.495 12.106 8.21 26.906 5.032 40.8-3.18 13.916-10.232 26.927-21.474 32.99-11.242 6.063-26.653 5.179-39.39-1.032C19.899 88.48 9.814 76.943 5.878 63.048 1.94 49.132 4.15 32.88 12.95 20.48 21.75 8.08 37.098-.426 51.92.016c14.82.422 29.073 9.832 36.568 21.916z",
  "M88.876 19.09c9.626 10.65 13.61 27.219 9.541 40.722-4.068 13.503-16.144 23.96-29.774 30.072-13.63 6.113-28.795 7.902-41.424 2.556C14.568 87.094 4.45 74.614 1.193 60.493c-3.28-14.12.32-29.86 9.392-40.38C19.637 9.613 34.183 4.31 49.091 4.01 64 3.735 79.25 8.463 88.876 19.091z",
  "M86.355 21.244c8.641 11.48 13.122 25.606 11.223 40.073-1.877 14.446-10.135 29.233-22.64 35.293-12.503 6.081-29.275 3.457-43.38-3.713-14.104-7.17-25.562-18.863-29.232-32.924-3.67-14.04.47-30.45 10.071-42.143C22 6.158 37.085-.82 51.02.077 64.93.995 77.734 9.786 86.355 21.244z",
  "M88.378 15.827c10.098 10.482 14.04 28.06 10.14 43.314-3.92 15.254-15.701 28.165-29.997 34.578-14.296 6.392-31.106 6.264-42.909-.788-11.803-7.03-18.6-20.965-22.54-36.155-3.942-15.19-5.05-31.617 2.535-41.524C13.19 5.345 29.447 2 45.724 2c16.278 0 32.534 3.345 42.654 13.827z"
];

const wackyBlobs = [
  "M95.88616 5.42497c7.91441 5.19383 2.87516 26.12374-2.31867 41.79798-5.22475 15.70515-10.60407 26.21648-18.5494 27.79318-7.9144 1.60761-18.42573-5.68848-33.79082-.8038C25.8622 79.097 5.58151 96.16243 1.06783 94.55482c-4.5446-1.5767 6.64686-21.85738 10.54224-38.21176 3.89537-16.35439.52556-28.8134 5.03925-34.00723 4.5446-5.22475 17.00361-3.1534 33.69807-7.38884C67.01093 10.71155 87.94084.20022 95.88616 5.42497z",
  "M89.24272 9.13885c11.47788 10.71268 12.89895 32.24736 8.34424 49.26377-4.55472 17.0164-15.04877 29.4781-26.52665 35.05306-11.47787 5.57497-23.93957 4.29965-34.17856 2.07695-10.20255-2.2227-18.18241-5.42922-25.28776-11.00418C4.48864 78.91704-1.74221 70.93718.44405 65.14359 2.63032 59.35 13.2337 55.74266 20.33904 45.06642c7.10535-10.71268 10.71268-28.45784 23.28369-37.45796 12.60744-8.96367 34.14212-9.14586 45.62 1.53039z",
  "M70.57405 29.89273C80.88721 35.3046 95.5656 41.20147 99.11393 50.6467c3.54834 9.44522-4.03336 22.43877-14.321 30.07153-10.31315 7.60723-23.30671 9.82814-30.76078 4.31417C46.5781 79.49289 44.638 66.193 35.32041 58.56025c-9.31758-7.60723-26.01264-9.54733-32.31797-17.7417-6.2798-8.21989-2.14432-22.71958 7.17326-28.13143 9.31759-5.38633 23.81727-1.71035 34.0028 2.60381 10.21104 4.28864 16.10792 9.21547 26.39555 14.6018z",
  "M69.81387 22.68584c8.92482 5.75274 18.6292 13.84421 22.44645 25.75292 3.79035 11.9356 1.66668 27.63467-7.23125 36.96271-8.92482 9.30116-24.62389 12.2313-41.909 13.79045-17.25822 1.55916-36.0756 1.72045-37.95733-7.58071C3.281 82.28316 18.3349 63.46578 18.54996 44.86346 18.765 26.26114 4.1681 7.90076 6.04984 2.1749c1.88174-5.75274 20.24212 1.15593 33.49494 6.29039 13.2528 5.13445 21.34428 8.4947 30.2691 14.22056z",
  "M87.12858 13.5866c9.0033 4.44466 13.90381 17.51273 12.68818 29.36516-1.21563 11.85243-8.54742 22.52721-17.51272 31.34056-9.0033 8.77536-19.67808 15.72726-28.07355 13.48594-8.43346-2.24133-14.5876-13.6379-24.80653-22.45124-10.18093-8.81335-24.38865-14.9675-28.26349-25.07245C-2.75235 30.1876 3.66772 16.2458 13.84865 11.80114c10.21892-4.44466 24.16073.6838 37.68465 1.10167 13.52393.45586 26.592-3.76087 35.59528.6838z",
  "M74.3019 14.60823c7.99738 5.87178 19.94349 11.67196 24.01716 23.37971 4.09866 11.67195.37488 29.25149-7.62252 42.17657-7.99739 12.96087-20.26838 21.3031-31.33977 19.62033-11.07139-1.68276-20.96816-13.42632-33.38911-26.3514C13.5717 60.47256-1.37342 46.29436.1011 34.22857 1.57562 22.16278 19.44479 12.2094 31.86574 6.33762 44.28668.50164 51.23442-1.21693 56.73262.82387c5.5232 2.0766 9.57188 7.94839 17.56927 13.78436z",
  "M88.82419 23.8107c5.5731 5.70195 7.24825 15.173 4.83217 22.26019-2.4483 7.05496-8.98784 11.69385-14.56094 21.93805-5.5731 10.2442-10.21198 26.12593-19.32868 30.60374-9.1167 4.47781-22.7112-2.4483-32.69768-12.6925-9.98649-10.2442-16.36495-23.8387-19.8119-40.88016-3.44695-17.04145-3.9946-37.56206 5.9919-43.2318 9.98648-5.70197 30.5071 3.41472 45.48682 8.9234 15.01194 5.50867 24.483 7.37711 30.0883 13.07907z",
  "M94.59823 29.481c4.10018 14.27893 1.17557 25.43256-.43009 34.95185-1.63434 9.54796-1.94973 17.4616-6.04991 22.50796-4.10018 5.07505-12.0138 7.28284-22.50797 9.86337-10.46548 2.58053-23.5115 5.47646-37.27433.40141C14.5731 92.15922.09345 79.1132 3.50549 69.47922c3.41203-9.63398 24.71575-15.85593 38.47858-30.13486C55.7469 25.06542 61.96885 2.70082 70.65664.23498c8.68778-2.46584 19.84141 14.96707 23.94159 29.24601z",
  "M92.35859.71226c4.057 3.59186-5.7108 21.42195-10.23292 34.72992-4.54797 13.30796-3.8761 22.0938-7.9331 33.92885-4.03115 11.83505-12.817 26.77098-24.78124 29.94939-11.96425 3.20424-27.13275-5.3232-35.4793-17.15824s-9.897-27.00354-5.63327-37.90832C12.56247 33.34908 22.64036 26.70802 30.9869 23.142c8.34655-3.56602 14.98761-4.08283 27.23611-9.69027C70.47151 7.8443 88.3016-2.85376 92.35859.71226z",
  "M75.1103 14.40703c3.60011 10.37016-2.85293 23.97815-6.5889 33.85017-3.73597 9.87202-4.75487 16.00807-8.35499 26.71786-3.57748 10.73243-9.71353 26.01595-14.80803 24.9744-5.09451-1.04154-9.14747-18.40815-13.65328-29.11793-4.48317-10.73243-9.39654-14.7854-9.69088-19.1327-.29435-4.34732 4.03032-8.98898 8.53612-19.35913C35.03351 21.9469 39.67517 5.84826 48.8 1.3651c9.12483-4.48317 22.73282 2.64914 26.3103 13.04193z",
  "M92.18551 15.13116c5.95985 3.7573 3.60182 18.03502 4.8197 33.55654 1.21789 15.52151 6.0376 32.26091.07774 35.18901-5.95985 2.9281-22.69924-7.92919-38.63536-8.70656-15.96203-.80328-31.09486 8.47335-41.92623 5.51934C5.66406 77.76139-.86585 62.62856.0929 48.42857c.93284-14.19998 9.35437-27.46712 20.21166-31.22442 10.83137-3.7573 24.09851 1.99526 37.85799 1.4511 13.78538-.51825 28.0631-7.28138 34.02295-3.52409z",
  "M75.6395 34.17356c6.86793 8.67923 15.77358 13.55973 20.60376 23.24526 4.83018 9.68552 5.61005 24.22638-1.28302 29.00625-6.86792 4.77987-21.40878-.20126-36.30184.20126-14.91822.37736-30.2138 6.1132-41.58486 1.33333S-1.71889 67.88421.344 54.62636c2.03773-13.23268 13.55973-24.4528 24.90563-33.13203C36.6207 12.81509 47.8408 6.67673 55.86595 9.84654S68.77159 25.49432 75.6395 34.17356z",
  "M86.12381 14.75427c3.22231 4.2019-.54135 14.41018 2.19117 27.35099 2.73252 12.9408 11.96123 28.61414 8.73891 40.6527-3.2223 12.03855-18.89564 20.41657-30.26395 16.08578-11.34254-4.30501-18.40585-21.31882-30.08351-33.35738C25.02876 53.47358 8.6852 46.41026 3.70994 34.39749-1.2653 22.35893 5.07621 5.34512 16.77964 1.14322c11.67767-4.22767 28.69148 4.38235 42.30252 7.78511 13.61105 3.40276 23.81934 1.59827 27.04165 5.82594z",
  "M75.86616 16.78308c8.47219 4.7303 13.026 17.12089 17.9328 34.41828 4.90681 17.29739 10.20193 39.53689 1.72974 43.87889-8.47219 4.342-30.7117-9.1429-45.00851-17.05029-14.29683-7.90737-20.72157-10.20193-25.02827-14.57922-4.2714-4.342-6.46004-10.76675-12.56708-23.26323C6.7825 27.65573-3.24293 9.01691 1.02847 4.32191c4.3067-4.73031 22.94552 4.5185 38.47787 7.62496 15.49705 3.10647 27.88763.1412 36.35982 4.83621z",
  "M82.17801 22.31468c4.98725 6.14219 6.7984 14.30552 10.7882 26.45866 3.9898 12.15313 10.15824 28.29606 5.171 34.4645-4.98725 6.16843-21.13018 2.36238-38.16557 3.25483-17.06163.9187-34.98947 6.50967-46.2239.34123C2.48706 80.66547-2.05396 62.73763.85964 47.69714c2.9136-15.04049 13.25558-27.16737 24.51626-33.28331C36.61033 8.27164 48.7372 8.16665 58.89545 10.1353c10.13198 1.9949 18.29532 6.06344 23.28256 12.17938z",
  "M62.42904 25.60401c14.62759 4.93878 36.99365 11.8279 37.55988 19.28326.56623 7.45536-20.69883 15.44548-35.32642 22.52335C50.0349 74.4885 42.04478 80.6541 33.33113 81.34616c-8.71364.69205-18.1508-4.02652-24.59952-11.1044C2.2829 63.1639-1.1774 53.72675.364 45.86245 1.93686 38.0296 8.5114 31.70671 14.96014 26.7994c6.44872-4.93878 12.77161-8.49344 19.34617-8.77656 6.606-.31457 13.49513 2.6424 28.12273 7.58118z",
  "M63.40856 31.21289c4.16826 7.99571 8.3103 12.13775 13.13394 21.10344 4.82365 8.96568 10.30268 22.7288 6.16064 32.53337-4.16826 9.77837-17.93137 15.57198-31.30126 15.12632-13.34366-.41945-26.24166-7.07817-29.04672-16.85654-2.80505-9.80457 4.53528-22.70258 2.5429-37.59296C22.9319 30.63615 11.65926 13.7534 14.4381 5.75768c2.80505-7.99571 19.6878-7.10439 30.17398-.76025 10.5124 6.37036 14.65444 18.21974 18.79648 26.21546z",
  "M82.13787 7.24677c5.8464 6.85441 4.9536 19.49763 4.608 31.76645-.3456 12.29762-.1152 24.24964-5.9616 35.62566C74.93784 86.0149 62.98582 96.81492 48.4418 99.37812c-14.51522 2.592-31.62245-3.0528-35.51046-14.42882-3.888-11.37602 5.44321-28.48325 8.78402-42.27847 3.312-13.76642.6336-24.22084 4.5216-31.07525C30.12498 4.71237 40.5794 1.45796 52.12822.36356c11.52001-1.0944 24.16324.0288 30.00965 6.88321z"
]

let colors = [
  '#2E29AD',
  '#3F32D3',
  '#6D57FF',
  '#00AFBA',
  '#00C6D2',
  '#4BEDEB',
  '#D9ECEC',
  '#E9F4F4',
  '#F2FCFC',
  '#E8E2DA',
  '#F4F0E9',
  '#FAF8F5',
  '#EDBA53',
  '#FFD664',
  '#FFE88C',
  '#C9597C',
  '#DD728E',
  '#FF94A8',
  '#005C54',
  '#007567',
  '#00947E',
  '#002737',
  '#ffffff',
];

let draw = SVG('drawing').size(canvasWidth, canvasHeight);

const gradient = colors => {
  return draw.gradient('linear', stop => {
    for(let i = 0; i < colors.length; i++) {
      stop.at(i/(colors.length-1), colors[i]);
    }
  })
}

const generateFromPath = (path, size, x, y, stroke) => {
  const group = draw.group();
  group.size(size, size).move(x, y).scale(size/100, size/100);
  group.path(path)
  if(!stroke) {
    group.fill(getFill(colors));
  } else {
    group.stroke({
      color: getRandomArrayVal(colors),
      width: strokeWidth,
      linecap: 'round'
    })
    .fill('none')
  }
  group.transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
  return group;
}

const getFill = colors => {
  return fillAsGradient ? gradient(colors) : getRandomArrayVal(colors)
}

const triangle = (size, x, y) => {
  return draw.polyline([[0,0], [0, size], [size, size], [0,0]])
  .move(x, y)
  .fill(getFill(colors))
  .transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const square = (size, x, y) => {
  return draw.rect(size, size)
  .move(x, y)
  .fill(getFill(colors))
  .transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const octagon = (size, x, y) => {
  const a = size * .8536;
  const b = size * .1464;
  return draw.polyline([[size/2, 0], [a, b], [size, size/2], [a, a], [size/2, size], [b, a], [0, size/2], [b, b]])
  .move(x, y)
  .fill(getFill(colors))
  .transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const circle = (size, x, y) => {
  return draw.circle(size).move(x, y).fill(getFill(colors));
}

const dots = (size, x, y) => {
  const group = draw.group();
  const color = getFill(colors);
  const r = size/40;
  for(let i = 0; i < 16; i++) {
    let xa = x + (i % 4) * size / 4 + (4*r);
    let ya = y + Math.floor(i/4) * size / 4 + (4*r);
    draw.circle(r*2).move(xa, ya).fill(color);
  }
  return group;
}

const elbow = (size, x, y) => {
  const group = draw.group();
  group.move(x, y);
  group.polyline([[0,0], [0, size], [size, size]])
  .stroke({
    color: getRandomArrayVal(colors),
    width: strokeWidth,
    linecap: 'round'
  })
  .fill('none')
  group.polyline([[size*.25, 0], [size*.25, size*.75], [size, size*.75]])
  .stroke({
    color: getRandomArrayVal(colors),
    width: strokeWidth,
    linecap: 'round'
  })
  .fill('none')
  group.polyline([[size * .5, 0], [size*.5, size*.5], [size, size*.5]])
  .stroke({
    color: getRandomArrayVal(colors),
    width: strokeWidth,
    linecap: 'round'
  })
  .fill('none')
  group.transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const quarterCircle = (size, x, y) => {
  generateFromPath("M100 0C44.772 0 0 44.772 0 100h100V0z", size, x, y)
}

const tulip = (size, x, y) => {
  generateFromPath("M50 50c0-27.614 22.386-50 50-50v50c0 27.614-22.386 50-50 50V50zM0 50V0c27.614 0 50 22.386 50 50v50C22.386 100 0 77.614 0 50z", size, x, y)
}

const wonkyCircle = (size, x, y, path, fill) => {
  const group = draw.group();
  group.size(size, size).move(x, y).scale(size/100, size/100);
  group.path(path || getRandomArrayVal(blobs))
  if(!fill) {
    group.fill(getFill(colors));
  } else {
    group.stroke({
      color: getRandomArrayVal(colors),
      width: strokeWidth,
      linecap: 'round'
    })
    .fill('none')
    console.log('strokin')
  }
  group.transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
  return group;
  // return generateFromPath(getRandomArrayVal(blobs), size, x, y)
}

const rainbow = (size, x, y) => {
  generateFromPath("M100 50c-27.614 0-50 22.386-50 50H0C0 44.772 44.772 0 100 0v50z", size, x, y)
}

const growth = (size, x, y) => {
  generateFromPath("M50 0h50L50 100H0z", size, x, y)
}

const leaf = (size, x, y) => {
  generateFromPath("M0 100C0 44.772 44.772 0 100 0c0 55.228-44.772 100-100 100z", size, x, y)
}

const star = (size, x, y) => {
  generateFromPath("M75 50l25 50-50-25-50 25 25-50L0 0l50 25 50-25-25 50z", size, x, y)
}

const rainbowLines = (size, x, y) => {
  generateFromPath("M50 0c0 27.61424 22.38576 50 50 50M25 0c0 41.42136 33.57864 75 75 75M0 0c0 55.22848 44.77152 100 100 100", size, x, y, true);
}

const jawn = (size, x, y) => {
  const group = draw.group();
  group.size(size, size).move(x, y).scale(size/100, size/100);
  group.path("M50 0h50v100H0z").fill(getFill(colors));
  group.path("M100 100V0L50 100z").fill(getFill(colors));
  group.transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const waves = (size, x, y) => {
  const group = draw.group();
  group.size(size, size).move(x, y).scale(size/100, size/100);
  group.path("M0 17.06c16.933-10.08 33.6-10.08 50 0s33.067 10.08 50 0M0 50.06c16.933-10.08 33.6-10.08 50 0s33.067 10.08 50 0M0 83.06c16.933-10.08 33.6-10.08 50 0s33.067 10.08 50 0")
  .stroke({
    color: getRandomArrayVal(colors),
    width: strokeWidth,
    linecap: 'round'
  })
  .fill('none')
  .transform({
    rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle,
  });
}

const pacman = (size, x, y) => {
  const group = draw.group().move(x, y).fill(getFill(colors));
  group.circle(size);
  group.rect(size, size/2);
  group.transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const tear = (size, x, y) => {
  const group = draw.group().move(x, y).fill(getFill(colors));
  group.circle(size);
  group.rect(size/2, size/2);
  group.transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const line = (size, x, y) => {
  return draw.line(0, 0, size, size).move(x, y)
  .stroke({
    color: getRandomArrayVal(colors),
    width: strokeWidth,
    linecap: 'round'
  })
  .transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}

const tine = (size, x, y) => {
  return draw.polyline([[0, size/2], [0, size], [size/2, size], [size, 0]])
  .move(x, y)
  .fill(getFill(colors))
  .transform({rotation: randomlyRotate ? getRandomRotationByInterval(rotationAngle) : rotationAngle});
}


const getActiveShapes = () => {
  const shapes = [];
  const keys = {
    "shapeSquare": square,
    "shapeCircle": circle,
    "shapeWonkyCircle": wonkyCircle,
    "shapeLine": line,
    "shapeTriangle": triangle,
    "shapePacman": pacman,
    "shapeOctogon": octagon,
    "shapeElbow": elbow,
    "shapeWaves": waves,
    "shapeQuarterCircle": quarterCircle,
    "shapeRainbow": rainbow,
    "shapeGrowth": growth,
    "shapeTine": tine,
    "shapeLeaf": leaf,
    "shapeStar": star,
    "shapeRainbowLines": rainbowLines,
    "shapeTulip": tulip,
    "shapeDots": dots
  }

  Object.keys(keys).forEach(key => {
    if ($(key).checked) {
      shapes.push(keys[key]);
    }
  });

  return shapes;
}

const processes = {
  amethyst: () => {
    density = 50;
    drawShapes(2);
    drawShapes(4);
    density = 25;
    drawShapes(8);
  },
  topaz: () => {
    const path = getRandomArrayVal([...blobs, ...wackyBlobs]);
    const stroke = strokeWidth;
    rotationAngle = 0;
    for(let i = 0; i < 10; i++) {
      const size = Math.round(canvasWidth * (1 - i/10));
      const x = canvasWidth/2 - canvasWidth * (1 - i/10)/2;
      const y = canvasHeight/2 - canvasHeight * (1 - i/10)/2;
      strokeWidth = stroke * (125/size);
      wonkyCircle(size, x, y, path, true);
    }
  },
  ruby: () => {
    // density = 50;
    let initialScale = scale;
    drawShapes(rowSize);
    scale = initialScale * .5;
    drawShapes(rowSize);
  },
  sapphire: () => {
    // density = 50;
    let initialScale = scale;
    drawShapes(rowSize);
    scale = initialScale * .75;
    drawShapes(rowSize);
    scale = initialScale * .5;
    drawShapes(rowSize);
    scale = initialScale * .25;
    drawShapes(rowSize);
  },
  lapis: () => {
    randomlyRotate = false;
    rotationAngle = getRandomInt(0, 360);
    const rotationAmount = getRandomInt(1, rowSize*2)/10;
    drawShapes(rowSize, null, () => {
      rotationAngle += rotationAmount;
    });
  },
  emerald: () => {
    let initialScale = scale;
    rotationAngle = 1;
    density = 75;
    drawShapes(2);
    scale = initialScale * .75;
    density = 50;
    drawShapes(3);
    scale = initialScale * .50;
    density = 25;
    drawShapes(4);
    scale = initialScale * .25;
    drawShapes(5);
  },
  opal: () => {
    colors = ['#002737', '#3F32D3'];
    scale = 2;
    processes.emerald();
    scale = 0.5;
    colors = ['#00C6D2'];
    processes.lapis();
  },
  aquamarine: () => {
    drawShapes(rowSize, [square]);
    drawShapes(rowSize);

  },
  diamond: () => {
    scale = 0.5;
    rowSize = 35;
    const pickedColors = colors;
    const group = draw.group();
    const lines = draw.group();
    const path = getRandomArrayVal([...blobs, ...wackyBlobs]);
    colors = ['#fff'];
    const mask = wonkyCircle(canvasWidth, 0, 0, path, false);
    colors = pickedColors;
    randomlyRotate = false;
    rotationAngle = getRandomInt(0, 360);
    drawShapes(rowSize, [line], shape => {
      rotationAngle += 5.2;
      lines.add(shape);
    });
    group.add(lines);
    group.maskWith(mask);
  }
}

const drawShapes = (rowSize, shapes, callback) => {
  let size = canvasWidth/rowSize;
  const amt = (canvasWidth / size) * (canvasHeight / size);
  let newsize = size * scale;
  // let offset = scale;

  for(let i = 0; i < amt; i++) {
    let x = (i * size) % canvasWidth;
    let y = Math.floor((i * size) / canvasWidth) * size;

    x = x + size/2 - newsize/2;
    y = y + size/2 - newsize/2;

    if(rollDicePct(density)) {
      const s = shapes || getActiveShapes();
      const shape = getRandomArrayVal(s)(newsize, x, y);
      if(callback) {
        callback(shape);
      }
    }
  }
}

// const drawSpecific = (rowSize) => {
//   const size = canvasWidth/rowSize;
//   const amt = (canvasWidth / size) * (canvasHeight / size);
//
//   for(let i = 0; i < amt; i++) {
//     const x = (i * size) % canvasWidth;
//     const y = Math.floor((i * size) / canvasWidth) * size;
//
//     if(rollDicePct(density)) {
//       getRandomArrayVal(getActiveShapes())(size, x, y);
//     }
//   }
// }

const renderColorOptions = () => {

  colors.forEach((color, index) => {
    $('.colors').appendChild($html(`
      <div class="color-option">
        <input class="color" type="checkbox" id=${'color-' + index} name=${'color-' + index} data-color="${color}">
        <label style="background-color: ${color}">
          <img src="assets/check.svg">
        </label>
      </div>
    `))
  });
}

const generate = () => {
  colors = [...document.querySelectorAll('input.color:checked')].map(color => color.getAttribute('data-color'));
  canvasWidth = $('canvasWidthInput').value;
  canvasHeight = $('canvasHeightInput').value;
  rowSize = +$('elementSizeInput').value;
  rotationAngle = +$('rotationAngleInput').value;
  density = +$('densityInput').value;
  strokeWidth = +$('strokeWidthInput').value;
  fillAsGradient = $('fillAsGradient').checked;
  scale = $('scaleInput').value/100;

  const serialized = new URLSearchParams(new FormData(document.querySelector("#controls-form"))).toString();

  if (window.location.href.split("?")[1] !== serialized) {
    const gemName = "Gem " + Math.floor(Math.random() * 10000);
    document.querySelector('title').innerText = gemName;
    window.history.pushState({}, gemName, "?" + serialized);
  }

  $('copy').innerText = 'Copy to clipboard';

  draw.size(canvasWidth, canvasHeight)

  if($('autoClearCanvas').checked) {
    draw.clear();
  }

  if($('selectProcess').value !== 'none') {
    processes[$('selectProcess').value]();
  } else {
    drawShapes(rowSize);
  }
  randomlyRotate = true;
}

const loadFromQueryParams = () => {
  const searchParams = (new URL(document.location)).searchParams;

  if (searchParams.toString().length == 0) {
    $("#color-0").checked = true;
    $("#color-1").checked = true;
    $("#color-2").checked = true;
    $("#color-3").checked = true;
    $("#shapeTriangle").checked = true;
  }

  searchParams.forEach((value, key) => {
    if (value === "on") {
      $("#" + key).checked = true;
    } else {
      $("#" + key).value = value;
    }
  });
}

const bindStaticEvents = () => {
  $('generate').onclick = generate;
  $('clearCanvas').onclick = () => {
    draw.clear();
  }
  $('copy').onclick = () => {
    $('textarea').value = $('drawing').firstChild.outerHTML;
    $('textarea').select();
    document.execCommand('copy');
    $('copy').innerText = `Copied!`;
  }

  $('download').onclick = () => {
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth * 2;
    canvas.height = canvasHeight * 2;
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    const image = new Image();

    var svg = document.getElementById("SvgjsSvg1001");
    var serializer = new XMLSerializer();
    var svg_blob = new Blob([serializer.serializeToString(svg)],
                            {'type': "image/svg+xml"});
    var url = URL.createObjectURL(svg_blob);

    image.onload = function() {
      ctx.drawImage(image, 0, 0, image.width*2, image.height*2);
      var png = canvas.toDataURL("image/png");
      const element = document.createElement('a');
      element.setAttribute('href', png);
      element.setAttribute('download', 'gem');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      document.body.removeChild(canvas);
    };

    image.src = url
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderColorOptions();
  bindStaticEvents();
  loadFromQueryParams();
  generate();
})
