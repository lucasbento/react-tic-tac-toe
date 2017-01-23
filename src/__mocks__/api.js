export function checkIt(value) {
  return new Promise((resolve, reject) => {
    if (value && value[0] === '@') {
      resolve();
      return;
    }

    reject(new Error('Value should start with `@`'));
  });
}

export function submitIt(data) {
  // This will be a helper variable to test successful and failed request
  const { shouldResolve } = data;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(data);
      return;
    }

    reject(new Error('BANG! Try again later'));
  });
}
