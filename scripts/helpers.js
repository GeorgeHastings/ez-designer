export const $ = id =>
  document.getElementById(id) || document.querySelector(id);

export const $html = template => {
  const fragment = new DOMParser().parseFromString(template, 'text/html');
  return fragment.body.childNodes[0];
};

export const $if = (condition, template) => {
  if(template) {
    return condition ? template : '';
  } else {
    return condition ? condition : ''
  }
}

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomArrayVal = array => {
  return array[getRandomInt(0, array.length - 1)];
}

export const getRandomRotationByInterval = theta => {
  if(theta === 0) {
    return 0;
  } else {
    return getRandomInt(0, 360/theta) * theta;
  }
}

export const rollDicePct = odds => {
  return getRandomInt(0, 100) <= odds;
}


// export gradient
// export opacity
